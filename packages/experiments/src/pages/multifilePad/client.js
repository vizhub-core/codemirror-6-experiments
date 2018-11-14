import { h, render } from 'preact';
import { Page } from './page';
import { shareDBConnection } from '../../client/shareDBConnection';
import { errorLog } from '../../client/errorLog';

export const client = () => {
  const { params, query, shareDBSnapshot, collection } = window.serverRenderedData;
  const shareDBDoc = shareDBConnection().get(collection, params.id);
  shareDBDoc.ingestSnapshot(
    shareDBSnapshot,
    errorLog(() => {
      const root = document.getElementById('root');
      render(<Page shareDBDoc={shareDBDoc} query={query} />, root, root.firstElementChild);
      shareDBDoc.subscribe(errorLog);
    })
  );
};
