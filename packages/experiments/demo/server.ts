import * as express  from 'express';
import { Application, Router, Request, Response } from 'express';
import * as jsdom from 'jsdom';

const { JSDOM } = jsdom;
const html = '<!DOCTYPE html><p>Hello JSDOM</p>'

const document = new JSDOM(html).window.document;
//global.document = new JSDOM(html).window.document;

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
