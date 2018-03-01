import rollup from 'rollup';
import ts from 'typescript';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import replace from 'rollup-plugin-replace';

export default {
    input: 'src/main.tsx',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            typescript: ts 
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'production' )
        })
    ]
};