import { htmlRoot } from '../html';

export const html = htmlRoot({
  title: 'VizHub 2.0 Alpha',

  // TODO use React instead of this
  body: `
    <div id="preact-root"></div>
    <div><a href="/pad/demo">pad</a></div>
    <div><a href="/multifile">multifile</a></div>
  `
});
