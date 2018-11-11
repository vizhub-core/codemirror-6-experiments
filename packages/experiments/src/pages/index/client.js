import { h, render } from 'preact';
import { Page } from './page';

const preactRoot = document.getElementById('preact-root');

export const client = () => {
  render(<Page />, preactRoot, preactRoot.firstElementChild);
};
