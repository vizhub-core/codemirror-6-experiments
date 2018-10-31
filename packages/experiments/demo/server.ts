import * as express  from 'express';
import { Application, Router, Request, Response } from 'express';
import * as jsdom from 'jsdom';
import { createView } from './demoView';

const { JSDOM } = jsdom;
const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>CM6 demo</title>
      <link rel="stylesheet" href="../node_modules/codemirror-6/codemirror.next/view/style/editorview.css">
      <link rel="stylesheet" href="../node_modules/codemirror-theme-ubuntu/codemirror-ubuntu-theme.css">
      <link rel="stylesheet" href="./styles.css">
    </head>
    <body>
      <div style="" id="editor"></div>
    </body>
  </html>
`;
console.log('new');

const dom = new JSDOM(html);
const document = dom.window.document;
//const documentAny: any = documentJSDOM;
//const document: HTMLElement = documentAny;
document.getSelection = () => ({}) as Selection;
const globalAny:any = global;
globalAny.document = document;
globalAny.navigator = {};
globalAny.window = {
  addEventListener: () => {}
};
globalAny.MutationObserver = () => ({
  observe: () => {},
  takeRecords: () => {},
  disconnect: () => {}
});
globalAny.requestAnimationFrame = () => {};
const view = createView();
document.querySelector("#editor").appendChild(view.dom)

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  const html = dom.serialize();
  res.send(html);
});

const app: Application = express();
const port: number = 3000;
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
