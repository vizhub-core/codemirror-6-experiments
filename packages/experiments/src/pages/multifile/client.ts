import { select } from 'd3-selection';
import { createView } from './demoView';
import { dropdownMenu } from './dropdownMenu';

const files = [
  {
    name: 'index.html',
    text: '<body><h1>Hello!</h1><script src="index.js"></body>'
  },
  {
    name: 'index.js',
    text: "import foo from './foo'; console.log(foo);"
  },
  {
    name: 'foo.js',
    text: "export default 'I am foo';"
  }
];

const getFile = fileName => files.find(file => file.name === fileName);

const views = {};
const getOrCreateView = selectedFile => {
  if (!views[selectedFile.name]) {
    const text = selectedFile.text;
    views[selectedFile.name] = createView({ text });
  }
  return views[selectedFile.name];
};

const viewForFileName = fileName => getOrCreateView(getFile(fileName));

export const client = () => {

  let selectedFileName;
  const editorDiv = document.querySelector('#editor');

  const setSelectedFileName = newSelectedFileName => {
    if (selectedFileName) {
      const oldView = viewForFileName(selectedFileName);
      oldView.dom.remove();
    }
    const newView = viewForFileName(newSelectedFileName);
    editorDiv.appendChild(newView.dom);

    selectedFileName = newSelectedFileName;
  };

  setSelectedFileName('index.html');

  select('#files-list')
    .call(dropdownMenu, {
      options: files.map(file => file.name),
      onOptionClicked: setSelectedFileName,
      selectedOption: selectedFileName
    });
};
