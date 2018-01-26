const BundleBuilder = require('../../src/BundleBuilder.js');
const utils = require('../../src/lib/utils.js');
const path = require('path');
const fs = require('fs');

describe('entry with recursive module', () => {
    describe('CommonJs', () => {
        const entryPath = path.resolve(__dirname, './src/index1-1.js');
        const outputPath = path.resolve(__dirname, './dist/bundle1-1.js');
        const Builder = new BundleBuilder({
            entry: entryPath,
            output: outputPath
        });

        test('output file existed', () => {
            let dir = path.resolve(outputPath, '..');
            fs.existsSync(dir) && utils.mustDeleteDir(dir);
            return Builder.run().then(() => {
                expect(fs.existsSync(outputPath)).toBeTruthy();
            });
        });

        test('avaliable bundle file', () => {
            let dir = path.resolve(outputPath, '..');
            fs.existsSync(dir) && utils.mustDeleteDir(dir);
            return Builder.run().then(() => {
                expect(utils.testBundleFile(outputPath)).toBe(27);
            });
        });

        test('cached module', () => {
            const entryPath = path.resolve(__dirname, './cjs/src/index.js');
            const outputPath = path.resolve(__dirname, './cjs/dist/bundle.js');
            const Builder = new BundleBuilder({
                entry: entryPath,
                output: outputPath
            });
            let dir = path.resolve(outputPath, '..');
            fs.existsSync(dir) && utils.mustDeleteDir(dir);
            return Builder.run().then(() => {
                expect(utils.testBundleFile(outputPath)).toBeTruthy();
            });
        });

        test('circular dependency', () => {
            const entryPath = path.resolve(__dirname, './cjs/circular_dep/src/index.js');
            const outputPath = path.resolve(__dirname, './cjs/circular_dep/dist/bundle.js');
            const Builder = new BundleBuilder({
                entry: entryPath,
                output: outputPath
            });
            let dir = path.resolve(outputPath, '..');
            fs.existsSync(dir) && utils.mustDeleteDir(dir);
            return Builder.run().then(() => {
                utils.testBundleFile(outputPath);
                expect(global._output3_).toBe('module1');
                expect(global._output2_).toBeUndefined();
                expect(global._output1_).toBe('module0');
            });
        });
    });
});