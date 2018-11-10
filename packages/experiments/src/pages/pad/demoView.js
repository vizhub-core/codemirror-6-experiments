import {
  history,
  EditorState,
  EditorView,
  keymap,
  gutter,
  baseKeymap,
  legacyMode,
  matchBrackets,
  javascript
} from '@datavis-tech/codemirror-6-prerelease';
import { otPlugin } from 'codemirror-ot';

import { historyKeymap } from '../../client/historyKeymap';
import { indentationKeymap } from '../../client/indentationKeymap';

export const createView = options => {
  const {
    doc,
    path = [],
    emitOps = () => {},
  } = options;

  const mode = legacyMode(javascript({ indentUnit: 2 }, {}))

  let plugins = [
    mode
  ];

  if (process.browser) {
    plugins = plugins.concat([
      gutter(),
      history(),
      matchBrackets({decorationsPlugin: mode}),
      keymap(historyKeymap()),
      keymap(indentationKeymap(mode)),
      keymap(baseKeymap),
      otPlugin(path, emitOps)
    ]);
  }

  const state = EditorState.create({ doc, plugins })

  return new EditorView(state);
};
