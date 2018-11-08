import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

export default {
  input: './src/client/index.ts',
  output: {
    format: 'iife',
    file: './build/bundle.js',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      preferBuiltins: false,
      browser: true
    }),
    commonjs(),
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
