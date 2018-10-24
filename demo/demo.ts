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

import { indentationKeymap } from './indentationKeymap';

const historyKeymap = {
  "Mod-z": undo,
  "Mod-Shift-z": redo,
  "Mod-u": view => undoSelection(view) || true,
  [isMac ? "Mod-Shift-u" : "Alt-u"]: redoSelection,
  "Ctrl-y": isMac ? undefined : redo
};

let mode = legacyMode(javascript({indentUnit: 2}, {}))
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
  keymap(historyKeymap),
  keymap(indentationKeymap(mode)),
  keymap(baseKeymap)
]})

let view = (window as any).view = new EditorView(state)
document.querySelector("#editor").appendChild(view.dom)
