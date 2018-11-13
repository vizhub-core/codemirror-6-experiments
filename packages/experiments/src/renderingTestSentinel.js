// A utility that enables automated tests to check
// whether the DOM was rendered on the server or client.

import { h } from 'preact';
export const RenderingTestSentinel = () =>
  <div
    className={`test-${process.browser ? 'client' : 'server' }-render`}
  />
