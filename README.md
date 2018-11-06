# vizhub-io
Experiments with [CodeMirror 6](https://github.com/codemirror/codemirror.next). For background & writeup, see [Medium: Codemirror 6 Experiments](https://medium.com/@currankelleher/codemirror-6-experiments-a3930bf03781)

![image](https://user-images.githubusercontent.com/68416/47498132-f2be4b80-d879-11e8-8a02-8a66a36c6701.png)

To run:

```
git submodule update --init
npm install -g lerna
lerna bootstrap
lerna run build

cd packages/experiments
npm run watch
# open another terminal
npm start
```
Then navigate to

http://localhost:8080/demo/
