import { h } from 'preact';

export const Page = () => (
  <div>
    <div className={`test-${process.browser ? 'client' : 'server' }-render`}/>
  </div>
);
