# vizhub-io
Experiments with [CodeMirror 6](https://github.com/codemirror/codemirror.next). For background & writeup, see [Medium: Codemirror 6 Experiments](https://medium.com/@currankelleher/codemirror-6-experiments-a3930bf03781)

![image](https://user-images.githubusercontent.com/68416/47498132-f2be4b80-d879-11e8-8a02-8a66a36c6701.png)

To run:

```
git submodule update --init --recursive
npm install -g lerna
lerna bootstrap
lerna run build
lerna run start --stream
```
Then navigate to http://localhost:3000

To watch for changes and recompile automatically, run the following (in a separate terminal):

```
lerna run watch --stream
```
