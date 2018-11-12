
// Example from https://www.npmjs.com/package/rollup-plugin-hypothetical
export const defaultData = {
  files: {
    './dir/a.js': `
      import foo from './b.js';
      foo();
    `,
    './dir/b.js': `
      import message from 'external';
      export default function foo() {
        console.log(message);
      }
    `,
    'external/': `
      export default "Hello, World!";
    `
  }
};

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
