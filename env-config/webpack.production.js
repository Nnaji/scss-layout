const TerserPlugin = require('terser-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg'); // Webpack Plugins
const ImageminPlugin = require('imagemin-webpack-plugin').default;
module.exports = () => ({
    output: {
        filename: 'bundle.min.js',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new ImageminPlugin({
            plugins: [imageminMozjpeg({ quality: 50 })],
        }),
    ],
});
