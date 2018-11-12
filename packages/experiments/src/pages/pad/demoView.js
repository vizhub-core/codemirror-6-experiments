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
  const { doc, otPlugin } = options;

  const mode = legacyMode(javascript({ indentUnit: 2 }, {}));

  let plugins = [mode];

  if (process.browser) {
    plugins = plugins.concat([
      gutter(),
      history(),
      matchBrackets({ decorationsPlugin: mode }),
      keymap(historyKeymap()),
      keymap(indentationKeymap(mode)),
      keymap(baseKeymap),
      otPlugin
    ]);
  }

  const state = EditorState.create({ doc, plugins });

  return new EditorView(state);
};
