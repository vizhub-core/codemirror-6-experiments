import { Router } from 'express';
import { indexServer } from './index/server';
import { multifileServer} from './multifile/server';

export const pagesRouter = connection => {
  const router = Router();
  router.use('/', indexServer(connection));
  router.use('/multifile', multifileServer(connection));
  return router;
};
