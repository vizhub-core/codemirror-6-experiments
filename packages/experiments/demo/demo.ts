import { createView } from './demoView';
import './styles.css';
import 'codemirror-6/codemirror.next/view/style/editorview.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';
const view = createView();
document.querySelector("#editor").appendChild(view.dom)
