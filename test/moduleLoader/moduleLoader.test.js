const BundleBuilder = require('../../src/BundleBuilder.js');
const utils = require('../../src/lib/utils.js');
const path = require('path');
const fs = require('fs');

const syncLoader1 = require('./sync/loaders/sync/loader1.js');
const syncLoader2 = require('./sync/loaders/sync/loader2.js');

const asyncLoader1 = require('./async/loaders/loader1.js');
const asyncLoader2 = require('./async/loaders/loader2.js');

describe('Sync ModuleLoader', () => {
    
    test('Two Loaders Process Correctly', async () => {
        const entryPath = path.resolve(__dirname, './sync/src/index.js');
        const outputPath = path.resolve(__dirname, './sync/dist/bundle.js');
        const Builder = new BundleBuilder({
            entry: entryPath,
            output: outputPath,
            loaders: [
                syncLoader1,
                syncLoader2
            ]
        });
        await Builder.run();

        expect(utils.testBundleFile(outputPath)).toBe(6);
    });
});

describe('Async ModuleLoader', () => {
    test('Two Loaders Process Correctly', async () => {
        const entryPath = path.resolve(__dirname, './async/src/index.js');
        const outputPath = path.resolve(__dirname, './async/dist/bundle.js');
        const Builder = new BundleBuilder({
            entry: entryPath,
            output: outputPath,
            loaders: [
                asyncLoader1,
                asyncLoader2
            ]
        });
        await Builder.run();
        
        expect(utils.testBundleFile(outputPath)).toBe(6);
    });
});