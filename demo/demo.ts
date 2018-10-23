import {
  EditorState,
  EditorSelection
  EditorView,
  keymap,
  history, redo, redoSelection, undo, undoSelection,
  gutter,
  baseKeymap,
  legacyMode,
  matchBrackets,
  javascript,
  specialChars,
  multipleSelections
} from './codemirror';

let mode = legacyMode(javascript({indentUnit: 2}, {}))

// FIXME these should move to commands and access the indentation
// feature through some kind of generic mechanism that allows plugins
// to advertise that they can do indentation
function crudeInsertNewlineAndIndent({state, dispatch}: EditorView): boolean {
  let indentation = (mode as any).indentation(state, state.selection.primary.from)
  if (indentation > -1)
    dispatch(state.transaction.replaceSelection("\n" + " ".repeat(indentation)).scrollIntoView())
  return true
}
function crudeIndentLine({state, dispatch}: EditorView): boolean {
  let cursor = state.selection.primary.head // FIXME doesn't indent multiple lines
  let line = state.doc.lineAt(cursor), text = line.slice(0, 100)
  let space = /^ */.exec(text)[0].length // FIXME doesn't handle tabs
  let indentation = (mode as any).indentation(state, line.start)
  if (indentation == -1) indentation = space
  let tr = state.transaction.replace(line.start, line.start + space, " ".repeat(indentation)).scrollIntoView()
  if (cursor <= line.start + space)
    tr = tr.setSelection(EditorSelection.single(line.start + indentation))
  dispatch(tr)
  return true
}

let isMac = /Mac/.test(navigator.platform)
let state = EditorState.create({doc: `"use strict";
const {readFile} = require("fs");

readFile("package.json", "utf8", (err, data) => {
  console.log(data);
});`, plugins: [
  gutter(),
  history(),
  specialChars({}),
  multipleSelections(),
  mode,
  matchBrackets({decorationsPlugin: mode}),
  keymap({
    "Mod-z": undo,
    "Mod-Shift-z": redo,
    "Mod-u": view => undoSelection(view) || true,
    [isMac ? "Mod-Shift-u" : "Alt-u"]: redoSelection,
    "Ctrl-y": isMac ? undefined : redo,
    "Enter": crudeInsertNewlineAndIndent,
    "Shift-Tab": crudeIndentLine
  }),
  keymap(baseKeymap),
]})

let view = (window as any).view = new EditorView(state)
document.querySelector("#editor").appendChild(view.dom)
