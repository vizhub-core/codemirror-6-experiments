export const hydrateEditor = view => {
  const editorDiv = document.querySelector('#editor');
  editorDiv.innerHTML = '';
  editorDiv.appendChild(view.dom)
};
