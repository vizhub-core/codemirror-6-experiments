import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import buble from 'rollup-plugin-buble';
import { uglify } from "rollup-plugin-uglify";
import { plugin as analyze } from 'rollup-plugin-analyzer'

export default {
  input: './src/pages/client.js',
  output: {
    format: 'iife',
    file: './build/bundle.js',
    sourcemap: true
  },
  plugins: [
    postcss(),
    buble({
      // Support Preact JSX
      jsx: 'h'
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
  ],
  onwarn: function ( message ) {

    // Suppress circular dependency warnings that come from d3-selection.
    if (message.code === 'CIRCULAR_DEPENDENCY') {
      return;
    }
    console.error(message);
  }
}
