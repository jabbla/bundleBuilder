const BundleBuilder = require('../../src/BundleBuilder.js');
const utils = require('../../src/lib/utils.js');
const path = require('path');
const fs = require('fs');

describe('entry with single module', () => {
    const entryPath = path.resolve(__dirname, './src/index.js');
    const outputPath = path.resolve(__dirname, './dist/bundle.js');
    
    describe('CommonJs', () => {
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
                expect(utils.testBundleFile(outputPath)).toBe('module1');
            });
        });
    });
});

describe('entry with recursive module', () => {
    const entryPath = path.resolve(__dirname, './src/index1-1.js');
    const outputPath = path.resolve(__dirname, './dist/bundle1-1.js');
    
    describe('CommonJs', () => {
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
    });
});