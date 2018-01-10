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

        test('output file existed', done => {
            let dir = path.resolve(outputPath, '..');
            fs.existsSync(dir) && utils.mustDeleteDir(dir);
            Builder.run(function(){
                expect(fs.existsSync(outputPath)).toBeTruthy()
                done();
            });
        })
    });
});