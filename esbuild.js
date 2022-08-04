const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['worker/main.ts'],
    bundle: true,
    outfile: 'worker/main.js',
})

esbuild.build({
    entryPoints: ['server/main.ts'],
    bundle: true,
    outfile: 'server/main.js',
    platform: 'node',
})