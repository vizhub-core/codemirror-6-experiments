import {
  history,
  EditorState,
  EditorView,
  keymap,
  gutter,
  baseKeymap,
  legacyMode,
  matchBrackets,
  javascript,
  specialChars,
  multipleSelections
} from 'codemirror-6';

import { historyKeymap } from './historyKeymap';
import { indentationKeymap } from './indentationKeymap';
import { otPlugin } from 'codemirror-ot';

export const createView = options => {
  const {
    path = [],
    emitOps = () => {}
  } = options;

  // TODO init doc from ShareDB data.
  // const doc = `"use strict";
  // const {readFile} = require("fs");

  // readFile("package.json", "utf8", (err, data) => {
  //   console.log(data);
  // });`

  const mode = legacyMode(javascript({ indentUnit: 2 }, {}))
  const state = EditorState.create({ doc: '', plugins: [
    gutter(),
    history(),
    specialChars({}),
    multipleSelections(),
    mode,
    matchBrackets({decorationsPlugin: mode}),
    keymap(historyKeymap()),
    keymap(indentationKeymap(mode)),
    keymap(baseKeymap),
    otPlugin(path, emitOps)
  ]})

  const view = new EditorView(state);
  return view;
};
