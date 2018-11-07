import { createView } from './demoView';

export const client = () => {
  const text = 'hello'
  const view = createView({ text });
  const editorDiv = document.querySelector('#editor');
  editorDiv.appendChild(view.dom);
};
