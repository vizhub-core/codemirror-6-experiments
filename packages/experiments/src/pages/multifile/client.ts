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

export const client = () => {
  const text = 'hello'
  const view = createView({ text });

  const editorDiv = document.querySelector('#editor');

  editorDiv.appendChild(view.dom);

  const onOptionClicked = file => {
    console.log(file);
    editorDiv.removeChild(view.dom);
  };

  const options = files.map(file => file.name);

  select('#files-list')
    .call(dropdownMenu, {
      options,
      onOptionClicked,
      selectedOption: options[0]
    });
};
