// const path = require('path');
module.exports = () => ({
    entry: '../../../src/index.ts',
    moudle: {
        rules: [{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
});
