import { EditorSelection } from '@datavis-tech/codemirror-6-prerelease';

export const indentationKeymap = mode => {
  function crudeInsertNewlineAndIndent({ state, dispatch }) {
    const indentation = mode.indentation(state, state.selection.primary.from);
    if (indentation > -1)
      dispatch(
        state.transaction
          .replaceSelection('\n' + ' '.repeat(indentation))
          .scrollIntoView()
      );
    return true;
  }

  function crudeIndentLine({ state, dispatch }) {
    let cursor = state.selection.primary.head; // FIXME doesn't indent multiple lines
    let line = state.doc.lineAt(cursor),
      text = line.slice(0, 100);
    let space = /^ */.exec(text)[0].length; // FIXME doesn't handle tabs
    let indentation = mode.indentation(state, line.start);
    if (indentation == -1) indentation = space;
    let tr = state.transaction
      .replace(line.start, line.start + space, ' '.repeat(indentation))
      .scrollIntoView();
    if (cursor <= line.start + space)
      tr = tr.setSelection(EditorSelection.single(line.start + indentation));
    dispatch(tr);
    return true;
  }
  return {
    Enter: crudeInsertNewlineAndIndent,
    'Shift-Tab': crudeIndentLine
  };
};
