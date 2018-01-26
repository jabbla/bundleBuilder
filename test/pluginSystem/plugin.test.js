const BundleBuilder = require('../../src/BundleBuilder.js');
const utils = require('../../src/lib/utils.js');
const path = require('path');
const fs = require('fs');

const CommonModulePlugin = require('../../src/plugins/CommonModulePlugin.js');

describe('commonModulePlugin', () => {
    const entryPath = path.resolve(__dirname, './commonModule/src/index.js');
    const outputPath = path.resolve(__dirname, './commonModule/dist/bundle.js');
    const commonModules = ['./commonModule/src/commonModule1.js', './commonModule/src/commonModule2.js'].map(function(item){
        return path.resolve(__dirname, item);
    });
    const commonBundlePath = path.resolve(__dirname, './commonModule/dist/commonModulesBundle.js');
    const Builder = new BundleBuilder({
        entry: entryPath,
        output: outputPath,
        plugins: [
            new CommonModulePlugin({
                modulePaths: commonModules,
                output: commonBundlePath
            })
        ]
    });
    
    let outputPathDir = path.resolve(outputPath, '..');
    let commonBundlePathDir = path.resolve(commonBundlePath, '..');

    test('commonModule file exist', async () => {
        fs.existsSync(outputPathDir) && utils.mustDeleteDir(outputPathDir);
        fs.existsSync(commonBundlePathDir) && utils.mustDeleteDir(commonBundlePathDir);

        await Builder.run();

        expect(fs.existsSync(outputPath)).toBeTruthy();
        expect(fs.existsSync(commonBundlePath)).toBeTruthy();
    });

    test('commonModule split correctly', async ()=> {
        expect(global._output1_).toBe('commonModule1 module1');
        expect(global._output2_).toBe('commonModule2 module2');
    });
});