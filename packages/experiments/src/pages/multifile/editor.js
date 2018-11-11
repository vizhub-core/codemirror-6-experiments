import { h, Component } from 'preact';

export class Editor extends Component {
  constructor() {
    super();
  }
  render() {
    const {
      selectedFileName
    } = this.props;

    return (
      <div>
        Editor
      </div>
    );
  }
}
