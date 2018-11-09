import { Router } from 'express';
import { server as padServer } from './pad/server';
import { server as indexServer } from './index/server';
import { server as multifileServer} from './multifile/server';

export const pagesRouter = connection => {
  const router = Router();
  router.use('/', indexServer(connection));
  router.use('/pad', padServer(connection));
  router.use('/multifile', multifileServer(connection));
  return router;
};
