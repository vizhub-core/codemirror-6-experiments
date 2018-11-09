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

import { historyKeymap } from '../../client/historyKeymap';
import { indentationKeymap } from '../../client/indentationKeymap';

export const createView = options => {
  const { text } = options;

  const mode = legacyMode(javascript({ indentUnit: 2 }, {}))

  const plugins = [
    mode,
    gutter(),
    history(),
    matchBrackets({decorationsPlugin: mode}),
    keymap(historyKeymap()),
    keymap(indentationKeymap(mode)),
    keymap(baseKeymap)
  ];

  const state = EditorState.create({ doc: text, plugins })

  return new EditorView(state);
};
