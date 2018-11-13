import { Router } from 'express';
import { h, render } from 'preact';
import { html } from './html';
import { createDom } from '../../server/dom';
import { setServerRenderedData } from '../html';
import { getOrCreateMultifileDoc } from './getOrCreateMultifileDoc';
import { createShareDBSnapshot } from '../../server/createShareDBSnapshot';
import { Page } from './page';

const route = 'multifilePad';
const dom = createDom(html);
const document = dom.window.document;
const root = document.getElementById('root');

export const server = connection => {
  const router = Router();
  router.get('/:id', (req, res) => {
    const { params, query } = req;

    getOrCreateMultifileDoc(connection, params.id).then(shareDBDoc => {
      const shareDBSnapshot = createShareDBSnapshot(shareDBDoc);

      const serverRenderedData = {
        route,
        params,
        query,
        shareDBSnapshot
      };

      setServerRenderedData(dom, serverRenderedData);

      const Root = () => <Page serverRenderedData={serverRenderedData}/>;
      render(<Root/>, root, root.firstElementChild);

      res.send(dom.serialize());
      shareDBDoc.destroy();
    });
  });
  return router;
};
