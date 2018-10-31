import * as express  from 'express';
import { Application, Router, Request, Response } from 'express';
import * as jsdom from 'jsdom';
import { createView } from './demoView';

const { JSDOM } = jsdom;
const html = '<!DOCTYPE html><div id="editor"></div>'

const document = new JSDOM(html).window.document;
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
  const html = document.body.outerHTML;
  res.send(html);
});

const app: Application = express();
const port: number = 3000;
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
