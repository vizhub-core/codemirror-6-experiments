// This file defines the JS bundle that gets served for all pages.
import './process';
import { client as indexClient } from '../pages/index/client';
import { client as multifileClient } from '../pages/multifile/client';

import '../css/noncritical.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';

if (window.location.href.endsWith('multifile')) {
  multifileClient();
} else {
  indexClient();
}
