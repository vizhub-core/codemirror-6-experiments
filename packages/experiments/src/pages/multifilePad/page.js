import { h, Component } from 'preact';
import { RenderingTestSentinel } from '../../renderingTestSentinel';

export class Page extends Component {
  render(props, state) {
    const { serverRenderedData } = props;
    return (
      <div>
        <RenderingTestSentinel />
        <pre>
          { JSON.stringify(serverRenderedData) }
        </pre>
      </div>
    );
  }
}
