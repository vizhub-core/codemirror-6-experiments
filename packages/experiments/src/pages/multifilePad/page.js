import { h, Component } from 'preact';
import { RenderingTestSentinel } from '../../renderingTestSentinel';
import { shareDBConnection } from '../../client/shareDBConnection';

export class Page extends Component {
  render(props, state) {
    const { serverRenderedData } = props;
    const { shareDBSnapshot} = serverRenderedData;
    console.log(shareDBSnapshot);
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
