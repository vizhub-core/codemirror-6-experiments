import { h, Component } from 'preact';

// TODO handle deleting files - update path for all views.

// Technique from https://github.com/developit/preact/wiki/External-DOM-Mutations
export class Editor extends Component {
  constructor() {
    super();
  }

  setSelectedFileName(props) {
    const { files, selectedFileName, getOrCreateView } = props;
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
