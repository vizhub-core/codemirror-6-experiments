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
} from 'codemirror-6-prerelease';
import { otPlugin } from 'codemirror-ot';

import { historyKeymap } from '../../client/historyKeymap';
import { indentationKeymap } from '../../client/indentationKeymap';
import { isBrowser } from '../../isomorphic/isBrowser';

export const createView = options => {
  const {
    path = [],
    emitOps = () => {},
    text = ''
  } = options;

  const mode = legacyMode(javascript({ indentUnit: 2 }, {}))

  let plugins = [
    mode
  ];

  if (isBrowser) {
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

  const state = EditorState.create({ doc: text, plugins })

  return new EditorView(state);
};
