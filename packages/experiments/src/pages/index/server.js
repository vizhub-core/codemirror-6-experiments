import { Router } from 'express';
import { h, render } from 'preact';
import { html } from './html';
import { createDom } from '../../server/dom';
import { setServerRenderedData } from '../html';
import { Page } from './page';

const route = 'index';
const dom = createDom(html);
const document = dom.window.document;
const preactRoot = document.getElementById('preact-root');

export const server = connection => {
  const router = Router();
  router.get('/', (req, res) => {
    setServerRenderedData(dom, { route });
    render(<Page />, preactRoot);
    res.send(dom.serialize());
  });
  return router;
};
