import { Plugin, EditorView, EditorState, Transaction } from './codemirror';

export const experimentPlugin = new Plugin({
  // Goal #1: Listen for all transactions,
  // so they can be converted to OT operations.
  view: (view: EditorView) => ({
    updateState(view: EditorView, prev: EditorState, trs: Transaction[]) {
      console.log(trs);
    }
  })
  //
  // Goal #2: Inject programmatically created transactions,
  // from remote OT operations.
});
