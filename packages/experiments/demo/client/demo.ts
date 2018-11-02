import { createView } from '../demoView';
import 'codemirror-6/codemirror.next/view/style/editorview.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';
import './styles.css';

const path = [];
const emitOps = ops => console.log(ops);
const view = createView({ path, emitOps });

const editorDiv = document.querySelector('#editor');
editorDiv.innerHTML = '';
editorDiv.appendChild(view.dom)
