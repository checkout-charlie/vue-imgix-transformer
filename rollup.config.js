import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    {
      file: path.resolve('./dist/vue-imgix-transformer.common.js'),
      format: 'cjs'
    },
    {
      file: path.resolve('./dist/vue-imgix-transformer.esm.js'),
      format: 'es'
    },
    {
      file: path.resolve('./dist/vue-imgix-transformer.js'),
      format: 'umd',
      name: 'vue-Imgix-transformer'
    }
  ],
  plugins: [
    nodeResolve({
      browser: true
    }),
    commonjs(),
    vue(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
