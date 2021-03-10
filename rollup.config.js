import path from 'path';
import rollupTypeScript from '@rollup/plugin-typescript';

const pkg = require(path.join(__dirname, 'package.json'));

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    rollupTypeScript({
      target: 'es5',
      module: 'es6',
    }),
    // babel({
    //   // babelHelpers: 'runtime',
    //   exclude: '**/node_modules/**',
    //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // }),
  ],
};
