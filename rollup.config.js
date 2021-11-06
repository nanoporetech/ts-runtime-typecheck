import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { dirname } from 'path';

export default {
  input: 'src/index.ts',
  preserveModules: true,
  plugins: [
    typescript()
  ],
  output: [
    {
      dir: `dist/${dirname(pkg.main)}`,
      sourcemap: true,
      entryFileNames: '[name].js',
      format: 'cjs'
    },
    {
      dir: `dist/${dirname(pkg.module)}`,
      sourcemap: true,
      entryFileNames: '[name].mjs',
      format: 'esm'
    }
  ]
};