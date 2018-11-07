import * as fs from 'fs';

const criticalCSS = fs.readFileSync(__dirname + '/../css/critical.css', 'utf8');

export const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>CM6 demo</title>
      <style>${criticalCSS}</style>
      <script id="server-rendered-data"></script>
    </head>
    <body>
      <div id="editor"></div>
      <script src="./build/bundle.js"></script>
    </body>
  </html>
`;
