import { h, Component } from 'preact';
import { createView } from '../../demoView';

// TODO handle deleting files - update path for all views.

const views = {};
const getOrCreateView = (files, fileName) => {
  const selectedFile = files
    .find(file => file.name === fileName);

  if (!views[selectedFile.name]) {
    views[selectedFile.name] = createView({
      doc: selectedFile.text
    });
  }
  return views[selectedFile.name];
};

// Technique from https://github.com/developit/preact/wiki/External-DOM-Mutations
export class Editor extends Component {

  setSelectedFileName(props) {
    const {
      files,
      selectedFileName
    } = props;

    const { previouslySelectedFileName } = this;

    if (previouslySelectedFileName === selectedFileName) {
      return;
    }

    if (previouslySelectedFileName) {
      const oldView = getOrCreateView(files, previouslySelectedFileName);
      oldView.dom.remove();
    }

    const newView = getOrCreateView(files, selectedFileName);
    this.base.appendChild(newView.dom);

    newView.dispatch(newView.state.transaction.scrollIntoView());

    this.previouslySelectedFileName = selectedFileName;
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
