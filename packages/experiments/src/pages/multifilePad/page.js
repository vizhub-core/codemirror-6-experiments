import { h, Component } from 'preact';
import { RenderingTestSentinel } from '../../renderingTestSentinel';
import { shareDBConnection } from '../../client/shareDBConnection';

export class Page extends Component {
  render(props, state) {
    const { shareDBDoc } = props;
    return (
      <div>
        <RenderingTestSentinel />
        <pre>{JSON.stringify(shareDBDoc.data)}</pre>
      </div>
    );
  }
}
