import { nodeResolve } from '@rollup/plugin-node-resolve';
import { createFilter } from '@rollup/pluginutils';
import typescript from '@rollup/plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';

const external = createFilter(
    ['sass', 'postcss-scss', 'postcss', 'fs'],
    null,
    {resolve: false},
);

const output = [{
    format: 'esm',
    dir: 'dist',
    entryFileNames: 'index.js',
    sourcemap: true,
}, {
    format: 'cjs',
    dir: 'dist',
    entryFileNames: 'index.cjs.js',
    sourcemap: true,
}];

const plugins = [
    nodeResolve(),
    commonjs(),
    typescript({tsconfig: './tsconfig.json'}),
];

export default {
    input: 'src/index.ts',
    output,
    external,
    plugins,
};
