import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

export default {
  input: './demo/client/demo.ts',
  output: {
    format: 'umd',
    file: './demo/build/demo_built.js',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      preferBuiltins: false
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
