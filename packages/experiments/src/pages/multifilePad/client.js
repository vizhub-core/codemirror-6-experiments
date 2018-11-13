import { h, render } from 'preact';
import { Page } from './page';
import { shareDBConnection } from '../../client/shareDBConnection';
import { errorLog } from '../../client/errorLog';

export const client = () => {
  const { params, shareDBSnapshot } = window.serverRenderedData;
  const shareDBDoc = shareDBConnection().get('multifile', params.id);
  shareDBDoc.ingestSnapshot( shareDBSnapshot, errorLog(() => {
    const root = document.getElementById('root');
    const Root = () => <Page shareDBDoc={shareDBDoc} />;
    render(<Root />, root, root.firstElementChild);
    shareDBDoc.subscribe(errorLog);
  }));
};
