import criticalCSS from '../css/critical.css';

export const htmlRoot = ({ title, body }) => `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${title}</title>
      <style>${criticalCSS}</style>
      <script id="server-rendered-data"></script>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/bulma@0.7.2/css/bulma.min.css">
    </head>
    <body>
      ${body}
      <script src="/build/bundle.js"></script>
    </body>
  </html>
`;

export const setServerRenderedData = (dom, serverRenderedData) => {
  const json = JSON.stringify(serverRenderedData);
  const script = dom.window.document.querySelector('#server-rendered-data');
  script.textContent = `window.serverRenderedData = ${json};`;
};
