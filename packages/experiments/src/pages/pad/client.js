import { opsToTransaction } from 'codemirror-ot';
import { createView } from './demoView';
import { hydrateEditor } from './hydrateEditor';
import { CodeMirrorShareDBBinding } from '../../client/codeMirrorShareDBBinding';
import { errorLog } from '../../client/errorLog';
import { shareDBConnection } from '../../client/shareDBConnection';

export const client = params => {
  const shareDBDoc = shareDBConnection.get('examples', params.id);

  shareDBDoc.ingestSnapshot(window.serverRenderedData.snapshot, errorLog(() => {
    hydrateEditor(CodeMirrorShareDBBinding({ shareDBDoc, createView }));
    shareDBDoc.subscribe(errorLog);
  }));

  // TODO expose this in UI
  const onSaving = () => { console.log('saving...'); };
  const onSaved = () => { console.log('saved.'); };
  shareDBDoc.on('before op', (op, originatedLocally) => {
    if (originatedLocally) {
      onSaving();
      shareDBDoc.whenNothingPending(errorLog(onSaved));
    }
  });
};
