import { h } from 'preact';
import { DropdownMenu } from './dropdownMenu';
import { files } from './exampleFiles';

const setSelectedFileName = newSelectedFileName => {
  console.log({ newSelectedFileName });
  //if (selectedFileName) {
  //  const oldView = viewForFileName(selectedFileName);
  //  oldView.dom.remove();
  //}
  //const newView = viewForFileName(newSelectedFileName);
  //editorDiv.appendChild(newView.dom);
  //newView.dispatch(newView.state.transaction.scrollIntoView());
  //selectedFileName = newSelectedFileName;
};

export const Page = () => (
  <div style="display: flex; flex-direction: column; height: 100%">
    <div>
      <DropdownMenu
        options={ files.map(file => file.name) }
        onOptionClicked={ setSelectedFileName }
        //selectedOption={ selectedFileName }
      />
    </div>
    <div id="editor" style="flex-grow: 1"></div>
  </div>
);
