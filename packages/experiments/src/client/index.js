// This file defines the JS bundle that gets served for all pages.
import '../client/process';
import '../css/noncritical.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';
import * as pages from '../pages/client';

const initPage = ({ route, params }) => {
  pages[route](params);
};

initPage(window.serverRenderedData);
