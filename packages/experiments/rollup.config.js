import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import builtins from 'rollup-plugin-node-builtins'

export default {
  input: './demo/client/demo.ts',
  output: {
    format: 'umd',
    file: './demo/build/demo_built.js',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    commonjs(),

    // Required for ShareDB client to build and run,
    // because it imports EventEmitter from 'events'.
    builtins(),

    typescript({
      check: false,
      tsconfigOverride: {
        compilerOptions: {
          lib: ['es5', 'es6', 'dom'],
          sourceMap: true,
          target: 'es5',
          strict: false
        },
        include: null
      }
    }),
    postcss()
  ]
}
