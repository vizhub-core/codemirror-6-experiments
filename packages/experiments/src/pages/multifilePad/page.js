import { h, Component } from 'preact';
import { RenderingTestSentinel } from '../../renderingTestSentinel';

export class Page extends Component {
  render(props) {
    const { shareDBDoc } = props;
    return (
      <div>
        <RenderingTestSentinel />
        <pre>{JSON.stringify(shareDBDoc.data)}</pre>
      </div>
    );
  }
}
