import {
  redo,
  redoSelection,
  undo,
  undoSelection
} from '@datavis-tech/codemirror-6-prerelease';


export const historyKeymap = () => {
  const isMac = /Mac/.test(navigator.platform);
  const keymap = {
    'Mod-z': undo,
    'Mod-Shift-z': redo,
    'Mod-u': view => undoSelection(view) || true,
    'Ctrl-y': isMac ? undefined : redo
  };
  keymap[isMac ? 'Mod-Shift-u' : 'Alt-u'] = redoSelection;
  return keymap;
};
