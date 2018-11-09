import '../server/codemirrorGlobalShim';
import { Router } from 'express';
import { server as pad } from './pad/server';
import { server as index } from './index/server';
import { server as multifile} from './multifile/server';

export const pagesServer = connection => {
  const router = Router();
  router.use('/', index(connection));
  router.use('/pad', pad(connection));
  router.use('/multifile', multifile(connection));
  return router;
};
