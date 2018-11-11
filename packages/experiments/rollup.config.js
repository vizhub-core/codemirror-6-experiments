import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import buble from 'rollup-plugin-buble';
import { uglify } from "rollup-plugin-uglify";
import { plugin as analyze } from 'rollup-plugin-analyzer'

const plugins = () => [
  postcss(),
  buble({
    // Support Preact JSX
    jsx: 'h',
    transforms: { forOf: false }
  }),
  nodeResolve({

    // Required for the case of the 'event' module,
    // which the ShareDB client depends on.
    preferBuiltins: false,
  }),
  commonjs(),
  uglify(),
  // Uncomment to see what files are making the bundle large.
  //analyze({
  //  filter: module => module.percent > 3
  //})
];

// Suppress circular dependency warnings that come from d3-selection.
const onwarn = message => {
  if (message.code === 'CIRCULAR_DEPENDENCY') {
    return;
  }
  console.error(message);
};

const client = {
  input: './src/client/index.js',
  output: {
    format: 'iife',
    file: './build/client/bundle.js',
    sourcemap: true
  },
  plugins: plugins(),
  onwarn,
};

const server = {
  external: ['jsdom', "@teamwork/websocket-json-stream", "codemirror-ot", "codemirror-theme-ubuntu", "d3-selection", "events", "express", "jsdom", "preact", "reconnecting-websocket", "sharedb", "ws", 'fs', 'http'],
  input: './src/server/index.js',
  output: {
    format: 'cjs',
    file: './build/server/bundle.js',
    sourcemap: true
  },
  plugins: plugins(),
  onwarn
};

export default [ server, client ];
