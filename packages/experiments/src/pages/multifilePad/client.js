import { h, render } from 'preact';
import { Page } from './page';

export const client = () => {
  const root = document.getElementById('root');
  render(<Page />, root, root.firstElementChild);
};
