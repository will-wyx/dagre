import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'index.js',
  output: {
    file: 'dist/dagre.es.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [nodeResolve(), commonjs()]
};
