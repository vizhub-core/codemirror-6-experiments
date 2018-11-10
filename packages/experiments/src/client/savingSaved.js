import { errorLog } from './errorLog';

export const savingSaved = ({ shareDBDoc, onSaving, onSaved }) => {
  let saving = false;
  shareDBDoc.on('before op', (op, originatedLocally) => {
    if (originatedLocally) {
      // Handle the case where an op is submitted while already saving.
      // This tends to happen during the first few seconds after page load.
      if (!saving) {
        saving = true;
        onSaving();
        shareDBDoc.whenNothingPending(
          errorLog(() => {
            saving = false;
            onSaved();
          })
        );
      }
    }
  });
};
