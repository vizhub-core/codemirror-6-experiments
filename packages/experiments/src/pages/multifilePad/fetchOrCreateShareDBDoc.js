export const fetchOrCreateShareDBDoc = options => {
  const {
    connection,
    collection,
    id,
    defaultData
  } = options;

  return new Promise((resolve, reject) => {
    const shareDBDoc = connection.get(collection, id);
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
};
