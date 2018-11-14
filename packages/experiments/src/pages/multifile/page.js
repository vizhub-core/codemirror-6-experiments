import { h, Component } from 'preact';
import { DropdownMenu } from './dropdownMenu';
import { Editor } from './editor';
import { exampleFiles } from '../../exampleFiles';
import { createView } from '../../demoView';

const getOrCreateView = function (files, fileName) {
  if (!this.views[fileName]) {
    this.views[fileName] = createView({
      doc: files.find(file => file.name === fileName).text
    });
  }
  return this.views[fileName];
};

export class Page extends Component {
  constructor() {
    super();
    this.state.selectedFileName = 'index.js';
    this.state.files = exampleFiles;
    this.setSelectedFileName = selectedFileName => {
      this.setState({ selectedFileName });
    };

    this.views = {};
    this.getOrCreateView = getOrCreateView.bind(this);
  }
  render() {
    const {
      setSelectedFileName,
      state: { selectedFileName, files },
      getOrCreateView
    } = this;

    return (
      <div style="display: flex; flex-direction: column; height: 100%">
        <div>
          <DropdownMenu
            options={files.map(file => file.name)}
            onOptionClicked={setSelectedFileName}
            selectedOption={selectedFileName}
          />
        </div>
        <div style="flex-grow: 1; overflow: auto">
          <Editor
            selectedFileName={selectedFileName}
            files={files}
            getOrCreateView={getOrCreateView}
          />
        </div>
      </div>
    );
  }
}
