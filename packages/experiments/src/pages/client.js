// This file defines the JS bundle that gets served for all pages.
import '../client/process';

import { client as index } from './index/client';
import { client as pad } from './pad/client';
import { client as multifile } from './multifile/client';

import '../css/noncritical.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';

// TODO import * as routes from ./pages/client
const routes = {
  index,
  pad,
  multifile
};

const initPage = data => {
  if (data && data.route) {
    routes[data.route](data.params);
  }
};
initPage(window.serverRenderedData);
