export const getOrCreateDoc = connection => new Promise((resolve, reject) => {
  const doc = connection.get('examples', 'textarea');
  doc.fetch(err => {
    if (err) {
      reject(err);
    }
    if (doc.type === null) {
      doc.create('Test content', () => {
        resolve(doc);
      });
    } else {
      resolve(doc);
    }
  });
});
