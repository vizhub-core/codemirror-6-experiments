import { h, render } from 'preact';
import { Page } from './page';

export const client = () => {
  const root = document.getElementById('root');
  const Root = () => (
    <Page serverRenderedData={window.serverRenderedData}/>
  );
  render(<Root />, root, root.firstElementChild);
};
