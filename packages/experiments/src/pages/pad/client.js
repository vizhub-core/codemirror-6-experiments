import { createView } from './demoView';
import { hydrateEditor } from './hydrateEditor';
import { CodeMirrorShareDBBinding } from '../../client/codeMirrorShareDBBinding';
import { errorLog } from '../../client/errorLog';
import { shareDBConnection } from '../../client/shareDBConnection';
import { savingSaved } from '../../client/savingSaved';

const { snapshot } = window.serverRenderedData;

export const client = params => {
  const shareDBDoc = shareDBConnection().get('examples', params.id);

  shareDBDoc.ingestSnapshot(
    snapshot,
    errorLog(() => {
      hydrateEditor(CodeMirrorShareDBBinding({ shareDBDoc, createView }));
      shareDBDoc.subscribe(errorLog);
    })
  );

  // TODO expose this in UI
  savingSaved({
    shareDBDoc,
    onSaving: () => {
      console.log('saving...');
    },
    onSaved: () => {
      console.log('saved.');
    }
  });
};
