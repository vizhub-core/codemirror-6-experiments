import { h, Component } from 'preact';
import { RenderingTestSentinel } from '../../renderingTestSentinel';
import { CodeMirrorShareDBBinding } from '../../client/codeMirrorShareDBBinding';
import { DropdownMenu } from '../../dropdownMenu';
import { Editor } from '../../editor';
import { createView } from '../../demoView';

export const defaultSelectedFileName = 'index.html';

// Decouple shareDBDoc shape from page code.
const presentShareDBDoc = shareDBDoc => ({
  files: shareDBDoc.data.files
});

const getFileIndex = (files, fileName) =>
  files
    .map((file, i) => ({ file, i }))
    .find(({file}) => file.name === fileName)
    .i;
//
//const getOrCreateView = shareDBDoc => function(files, fileName) {
//  if (!this.views[fileName]) {
//    //this.views[fileName] = CodeMirrorShareDBBinding({
//    //  shareDBDoc,
//    //  createView
//    //});
//  }
//  return this.views[fileName];
//};

const getOrCreateView = function(files, fileName) {
  if (!this.views[fileName]) {
    const fileIndex = getFileIndex(files, fileName);
    console.log({fileIndex});
    this.views[fileName] = createView({
      doc: files.find(file => file.name === fileName).text
    });
  }
  return this.views[fileName];
};

export class Page extends Component {
  constructor(props) {
    super();
    const { query } = props;
    this.state.selectedFileName = query.file || defaultSelectedFileName;
    this.setSelectedFileName = selectedFileName => {
      this.setState({ selectedFileName });
    };

    this.views = {};
    this.getOrCreateView = getOrCreateView.bind(this);
  }
  render(props, state) {
    const { shareDBDoc } = props;
    const { files } = presentShareDBDoc(shareDBDoc);
    const { setSelectedFileName, getOrCreateView } = this;
    const { selectedFileName } = state;

    return (
      <div style="display: flex; flex-direction: column; height: 100%">
        <RenderingTestSentinel />
        <div className="test-dropdown-menu">
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
