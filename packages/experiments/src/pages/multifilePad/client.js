import { h, render } from 'preact';
import { Page } from './page';
import { shareDBConnection } from '../../client/shareDBConnection';
import { errorLog } from '../../client/errorLog';

export const client = () => {
  const {
    params,
    shareDBSnapshot,
    collection,
    query
  } = window.serverRenderedData;

  const shareDBDoc = shareDBConnection().get(collection, params.id);

  shareDBDoc.ingestSnapshot(
    shareDBSnapshot,
    errorLog(() => {
      const root = document.getElementById('root');
      render(<Page shareDBDoc={shareDBDoc} />, root, root.firstElementChild);
      shareDBDoc.subscribe(errorLog);
    })
  );
};
