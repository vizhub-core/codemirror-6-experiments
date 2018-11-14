import { h, Component } from 'preact';
import { RenderingTestSentinel } from '../../renderingTestSentinel';
import { DropdownMenu } from '../../dropdownMenu';

export const defaultSelectedFileName = 'index.html';

// Decouple shareDBDoc shape from page code.
const presentShareDBDoc = shareDBDoc => ({
  files: shareDBDoc.data.files
});

export class Page extends Component {
  constructor(props) {
    super();

    const { query } = props;

    this.state.selectedFileName = query.file || defaultSelectedFileName;

    this.setSelectedFileName = selectedFileName => {
      this.setState({ selectedFileName });
    };

    //this.views = {};
    //this.getOrCreateView = getOrCreateView.bind(this);
  }
  render(props, state) {
    const { shareDBDoc } = props;
    const { files } = presentShareDBDoc(shareDBDoc);
    const { setSelectedFileName } = this;
    const { selectedFileName } = state;

    return (
      <div>
        <RenderingTestSentinel />
        <div className="test-dropdown-menu">
          <DropdownMenu
            options={files.map(file => file.name)}
            onOptionClicked={setSelectedFileName}
            selectedOption={selectedFileName}
          />
        </div>
        <pre>{JSON.stringify(shareDBDoc.data)}</pre>
      </div>
    );
  }
}
