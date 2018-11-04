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
import { otPlugin } from 'codemirror-ot';

import { historyKeymap } from './historyKeymap';
import { indentationKeymap } from './indentationKeymap';
import { isBrowser } from './isBrowser';

export const createView = options => {
  const {
    path = [],
    emitOps = () => {},
    text = ''
  } = options;

  // TODO init doc from ShareDB data.
  // const doc = `"use strict";
  // const {readFile} = require("fs");

  // readFile("package.json", "utf8", (err, data) => {
  //   console.log(data);
  // });`

  const mode = legacyMode(javascript({ indentUnit: 2 }, {}))

  let plugins = [
    gutter(),
    mode,
    specialChars({}),
  ];

  if (isBrowser) {
    plugins = plugins.concat([
      history(),
      multipleSelections(),
      matchBrackets({decorationsPlugin: mode}),
      keymap(historyKeymap()),
      keymap(indentationKeymap(mode)),
      keymap(baseKeymap),
      otPlugin(path, emitOps)
    ]);
  }

  const state = EditorState.create({
    doc: text,
    plugins: [
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
    ]
  })

  const view = new EditorView(state);
  return view;
};
