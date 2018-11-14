import { h, Component } from 'preact';
import { DropdownMenu } from './dropdownMenu';
import { Editor } from './editor';
import { exampleFiles } from '../../exampleFiles';

export class Page extends Component {
  constructor() {
    super();
    this.state.selectedFileName = 'index.js';
    this.state.files = exampleFiles;
    this.setSelectedFileName = selectedFileName => {
      this.setState({ selectedFileName });
    };
    //this.getOrCreateView = getOrCreateView.bind(this);
  }
  render() {
    const {
      setSelectedFileName,
      state: { selectedFileName, files }
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
          <Editor selectedFileName={selectedFileName} files={files} />
        </div>
      </div>
    );
  }
}
