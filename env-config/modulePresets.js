const webpackMerge = require('webpack-merge');
const modulePresets = (env = { presets: [] }) => {
    const presets = env.presets || [];

    const mergePresets = [].concat(...[presets]);
    const mergedConfigs = mergePresets.map((presetName) => {
        return require(`./presets/webpack.${presetName}`)(env);
    });

    return webpackMerge({}, ...mergedConfigs);
};
module.exports = modulePresets;
