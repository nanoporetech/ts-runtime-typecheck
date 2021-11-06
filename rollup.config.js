import typescript from 'rollup-plugin-typescript2';
import { main as MAIN, module as MODULE } from './package.json';
import { dirname } from 'path';

export default {
  input: 'src/index.ts',
  preserveModules: true,
  plugins: [
    typescript({ tsconfig: './tsconfig.main.json' })
  ],
  output: [
    {
      dir: `dist/${dirname(MAIN)}`,
      sourcemap: true,
      entryFileNames: '[name].js',
      format: 'cjs'
    },
    {
      dir: `dist/${dirname(MODULE)}`,
      sourcemap: true,
      entryFileNames: '[name].mjs',
      format: 'esm'
    }
  ]
};