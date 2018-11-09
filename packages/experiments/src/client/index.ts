// This file defines the JS bundle that gets served for all pages.
import './process';

import { client as padClient } from '../pages/pad/client';
import { client as multifileClient } from '../pages/multifile/client';

import '../css/noncritical.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';

// TODO handle route parameters
//import * as pathToRegexp from 'path-to-regexp';
if (window.location.href.endsWith('multifile')) {
  multifileClient();
} else if (window.location.href.endsWith('pad')) {
  padClient();
}
