import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

export default {
  input: './src/pages/client.js',
  output: {
    format: 'iife',
    file: './build/bundle.js',
    sourcemap: true
  },
  plugins: [
    nodeResolve({

      // Required for the case of the 'event' module,
      // which the ShareDB client depends on.
      preferBuiltins: false,
    }),
    commonjs(),
    postcss()
  ],
  onwarn: function ( message ) {

    // Suppress circular dependency warnings that come from d3-selection.
    if (message.code === 'CIRCULAR_DEPENDENCY') {
      return;
    }
    console.error(message);
  }
}
