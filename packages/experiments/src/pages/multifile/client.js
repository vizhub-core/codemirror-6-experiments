import { select } from 'd3-selection';
import { createView } from './demoView';

import { h, render } from 'preact';
import { Page } from './page';

const preactRoot = document.getElementById('preact-root');

export const client = () => {
  render(<Page />, preactRoot, preactRoot.firstElementChild);
};

//
//const getFile = fileName => files.find(file => file.name === fileName);
//
//const views = {};
//const getOrCreateView = selectedFile => {
//  if (!views[selectedFile.name]) {
//    const text = selectedFile.text;
//    views[selectedFile.name] = createView({ text });
//  }
//  return views[selectedFile.name];
//};
//
//const viewForFileName = fileName => getOrCreateView(getFile(fileName));
//
//export const client = () => {
//
//  let selectedFileName;
//  const editorDiv = document.querySelector('#editor');
//
//
//  setSelectedFileName('index.html');
//};
