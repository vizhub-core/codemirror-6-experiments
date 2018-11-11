import { h, Component } from 'preact';

const getFile = (files, fileName) => files.find(file => file.name === fileName);

export class Editor extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      props: {
        selectedFileName,
        files
      }
    } = this;

    return (
      <pre>
        { getFile(files, selectedFileName).text }
      </pre>
    );
  }
}
