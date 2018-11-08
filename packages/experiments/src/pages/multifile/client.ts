import { select } from 'd3-selection';
import { createView } from './demoView';
import { dropdownMenu } from './dropdownMenu';

export const client = () => {
  const text = 'hello'
  const view = createView({ text });
  const editorDiv = document.querySelector('#editor');
  editorDiv.appendChild(view.dom);

  const options = ['a', 'b'];


  console.log('here');
  select('#files-list')
    .call(dropdownMenu, {
      options,
      onOptionClicked: file => { console.log(file); },
      selectedOption: options[0]
    });
};
