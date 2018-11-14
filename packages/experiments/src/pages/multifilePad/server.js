import { Router } from 'express';
import { h, render } from 'preact';
import { html } from './html';
import { createDom } from '../../server/dom';
import { setServerRenderedData } from '../html';
import { defaultData } from './defaultData';
import { createShareDBSnapshot } from '../../server/createShareDBSnapshot';
import { fetchOrCreateShareDBDoc } from '../../server/fetchOrCreateShareDBDoc';
import { Page } from './page';

const route = 'multifilePad';
const dom = createDom(html);
const document = dom.window.document;
const root = document.getElementById('root');

export const server = connection => {
  const router = Router();
  router.get('/:id', (req, res) => {
    const collection = 'multifile';
    const { params, query } = req;
    const { id } = params;

    fetchOrCreateShareDBDoc({ connection, collection, id, defaultData }).then(
      shareDBDoc => {
        render(<Page shareDBDoc={shareDBDoc} query={query} />, root, root.firstElementChild);
        const shareDBSnapshot = createShareDBSnapshot(shareDBDoc);
        setServerRenderedData(dom, {
          route,
          params,
          query,
          shareDBSnapshot,
          collection
        });
        res.send(dom.serialize());
        shareDBDoc.destroy();
      }
    );
  });
  return router;
};
