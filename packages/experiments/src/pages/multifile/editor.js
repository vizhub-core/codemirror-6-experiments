import { h, Component } from 'preact';
import { createView } from './demoView';

const getFile = (files, fileName) => files.find(file => file.name === fileName);

const views = {};
const getOrCreateView = selectedFile => {
  if (!views[selectedFile.name]) {
    const text = selectedFile.text;
    views[selectedFile.name] = createView({ text });
  }
  return views[selectedFile.name];
};

const viewForFileName = (files, fileName) =>
  getOrCreateView(getFile(files, fileName));

// Technique from https://github.com/developit/preact/wiki/External-DOM-Mutations
export class Editor extends Component {
  constructor() {
    super();
  }

  setSelectedFileName({ files, selectedFileName: newSelectedFileName }) {
    const { selectedFileName } = this;

    if (selectedFileName) {
      const oldView = viewForFileName(files, selectedFileName);
      oldView.dom.remove();
    }

    const newView = viewForFileName(files, newSelectedFileName);
    this.base.appendChild(newView.dom);

    newView.dispatch(newView.state.transaction.scrollIntoView());

    this.selectedFileName = newSelectedFileName;
  }

  componentWillReceiveProps(nextProps) {
    this.setSelectedFileName(nextProps);
  }

  componentDidMount() {
    this.setSelectedFileName(this.props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div />;
  }
}
