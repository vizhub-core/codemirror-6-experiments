// This file defines the JS bundle that gets served for all pages.
import './process';
import * as pathToRegexp from 'path-to-regexp';

import { client as pad } from '../pages/pad/client';
import { client as multifile } from '../pages/multifile/client';

import '../css/noncritical.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';

const initPage = data => {
  if (data && data.route) {
    const routes = { pad, multifile };
    routes[data.route](data.params);
  }
};
initPage(window.serverRenderedData);
