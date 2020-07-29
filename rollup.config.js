import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const bannerMsg = `/*! ****************************************************************************
Copyright (c) Microblink. All rights reserved.

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
***************************************************************************** */`

const terserConfig = {
    compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
    }
}

const config = {
    cjs: {
        input: 'src/index.ts',
        output: {
            file: 'lib/photopay-sdk.js',
            format: 'cjs',
            indent: false,
            banner: bannerMsg
        },
        plugins: [
            nodeResolve(),
            typescript({ useTsconfigDeclarationDir: true }),
            babel({ babelHelpers: 'bundled' })
        ]
    },
    es: {
        input: 'src/index.ts',
        output: {
            file: 'es/photopay-sdk.js',
            format: 'es',
            indent: false,
            sourcemap: true,
            banner: bannerMsg
        },
        plugins: [
            nodeResolve(),
            typescript({ tsconfigOverride: { compilerOptions: { declaration: false, sourceMap: true } } }),
            babel({ babelHelpers: 'bundled' })
        ]
    },
    esModule: {
        input: 'src/index.ts',
        output: {
            file: 'es/photopay-sdk.mjs',
            format: 'es',
            indent: false,
            banner: bannerMsg
        },
        plugins: [
            nodeResolve(),
            typescript({ tsconfigOverride: { compilerOptions: { declaration: false } } }),
            babel({ babelHelpers: 'bundled' }),
            terser(terserConfig)
        ]
    },
    umdDev: {
        input: 'src/index.ts',
        output: {
            file: 'dist/photopay-sdk.js',
            format: 'umd',
            name: 'PhotoPaySDK',
            indent: false,
            sourcemap: true,
            banner: bannerMsg
        },
        plugins: [
            nodeResolve(),
            typescript({ tsconfigOverride: { compilerOptions: { declaration: false, sourceMap: true } } }),
            babel({ babelHelpers: 'bundled' })
        ]
    },
    umdProd: {
        input: 'src/index.ts',
        output: {
            file: 'dist/photopay-sdk.min.js',
            format: 'umd',
            name: 'PhotoPaySDK',
            indent: false,
            banner: bannerMsg
        },
        plugins: [
            nodeResolve(),
            typescript({ tsconfigOverride: { compilerOptions: { declaration: false } } }),
            babel({ babelHelpers: 'bundled' }),
            terser(terserConfig)
        ]
    },
    workerDev: {
        input: 'src/worker.ts',
        output: {
            file: 'resources/PhotoPayWasmSDK.worker.js',
            format: 'iife',
            sourcemap: true,
            banner: bannerMsg
        },
        plugins: [
            nodeResolve(),
            typescript({ tsconfigOverride: { compilerOptions: { declaration: false, sourceMap: true } } }),
            babel({ babelHelpers: 'bundled' })
        ]
    },
    workerProd: {
        input: 'src/worker.ts',
        output: {
            file: 'resources/PhotoPayWasmSDK.worker.min.js',
            format: 'iife',
            banner: bannerMsg
        },
        plugins: [
            nodeResolve(),
            typescript({ tsconfigOverride: { compilerOptions: { declaration: false } } }),
            babel({ babelHelpers: 'bundled' }),
            terser(terserConfig)
        ]
    }
}

export default [
    config.cjs,
    config.es,
    config.esModule,
    config.umdDev,
    config.umdProd,
    config.workerDev,
    config.workerProd
]