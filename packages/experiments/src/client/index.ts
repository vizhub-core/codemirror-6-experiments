// This file defines the JS bundle that gets served for all pages.
import './process';
import { indexClient } from '../pages/index/client';

import '../css/noncritical.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';

// TODO only run this if route is '/'.
indexClient();
