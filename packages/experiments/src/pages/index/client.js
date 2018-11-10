import { h, render } from 'preact';

export const client = () => {
  // TODO render isomorphic
  render((
    <div id="foo">
      <span>Hello, world!</span>
      <button onClick={ e => alert("hi!") }>Click Me</button>
    </div>
  ), document.getElementById('preact-root'));
};
