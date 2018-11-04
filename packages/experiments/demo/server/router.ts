import { Router, Request, Response } from 'express';
import { createView } from '../demoView';
import { dom } from './dom';
export const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  const view = createView({});
  document.querySelector("#editor").appendChild(view.dom);

  res.send(dom.serialize());
});
