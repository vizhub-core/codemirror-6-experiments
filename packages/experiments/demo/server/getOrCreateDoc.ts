const defaultText = `"use strict";
const {readFile} = require("fs");
readFile("package.json", "utf8", (err, data) => {
  console.log(data);
});`

export const getOrCreateDoc = connection => new Promise((resolve, reject) => {
  const doc = connection.get('examples', 'textarea');
  doc.fetch(err => {
    if (err) {
      reject(err);
    }
    if (doc.type === null) {
      doc.create(defaultText, () => {
        resolve(doc);
      });
    } else {
      resolve(doc);
    }
  });
});
