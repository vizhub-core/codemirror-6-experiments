import {
  redo,
  redoSelection,
  undo,
  undoSelection
} from 'codemirror-6-prerelease';

export const historyKeymap = () => {
  let isMac = /Mac/.test(navigator.platform);
  return {
    "Mod-z": undo,
    "Mod-Shift-z": redo,
    "Mod-u": view => undoSelection(view) || true,
    [isMac ? "Mod-Shift-u" : "Alt-u"]: redoSelection,
    "Ctrl-y": isMac ? undefined : redo
  };
};
