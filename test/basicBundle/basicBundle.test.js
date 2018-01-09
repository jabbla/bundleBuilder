const BundleBuilder = require('../../src/BundleBuilder.js');
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
            fs.rmdirSync(path.resolve(outputPath, '..'));
            Builder.run(function(){
                expect(fs.existsSync(outputPath)).toBeTruthy()
                done();
            });
        })
    });
});