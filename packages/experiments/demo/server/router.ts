import { Router, Request, Response } from 'express';
import { createView } from '../demoView';
import { dom } from './dom';
import { hydrateEditor } from '../hydrateEditor';
export const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  const view = createView({});
  hydrateEditor(view);
  res.send(dom.serialize());
});
