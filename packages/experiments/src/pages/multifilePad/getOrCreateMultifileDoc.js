import { defaultData } from './defaultData';

export const getOrCreateMultifileDoc = (connection, id) =>
  new Promise((resolve, reject) => {
    const shareDBDoc = connection.get('multifile', id);
    shareDBDoc.fetch(err => {
      if (err) {
        reject(err);
      }
      if (shareDBDoc.type === null) {
        shareDBDoc.create(defaultData, () => {
          resolve(shareDBDoc);
        });
      } else {
        resolve(shareDBDoc);
      }
    });
  });
