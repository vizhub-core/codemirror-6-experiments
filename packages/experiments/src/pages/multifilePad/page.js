import { h } from 'preact';
import { RenderingTestSentinel } from '../../renderingTestSentinel';

export const Page = ({ serverRenderedData }) => (
  <div>
    <RenderingTestSentinel />
    <pre>
      { JSON.stringify(serverRenderedData) }
    </pre>
  </div>
);
