// This file defines the JS bundle that gets served for all pages.
import '../client/process';

import { client as pad } from './pad/client';
import { client as multifile } from './multifile/client';

import '../css/noncritical.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';

const initPage = data => {
  if (data && data.route) {
    const routes = { pad, multifile };
    routes[data.route](data.params);
  }
};
initPage(window.serverRenderedData);
