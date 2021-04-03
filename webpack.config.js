const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');

// Node Modules
const path = require('path');

// Configurations
const envconfig = (env) => require(`./env-config/webpack.${env}`)(env);
const modulePresets = require('./env-config/modulePresets');

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
    //    console.log(mode);
    return webpackMerge(
        {
            mode,
            output: {
                path: path.resolve(__dirname, 'build'),
                filename: 'bundle.js',
            },

            resolve: {
                extensions: ['.scss', '.mjs', '.js', '.json'],
            },

            module: {
                rules: [
                    {
                        test: /\.jsx|js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                    },

                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            'style-loader',
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    // publicPath: 'build/css',
                                },
                            },

                            {
                                loader: 'css-loader',
                            },
                            {
                                loader: 'postcss-sass-loader',
                                options: {
                                    config: {
                                        path: path.resolve(__dirname, 'postcss.config'),
                                    },
                                },
                            },
                            {
                                loader: 'sass-loader',
                            },
                        ],
                    },
                    {
                        test: /\.html$/,
                        use: [
                            {
                                loader: 'html-loader',
                            },
                        ],
                    },

                    {
                        test: /\.(png|jpe?g|gif|svg)$/i,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[contenthash].[ext]',
                                    outputPath: 'images',
                                    //      limit: 8196,
                                },
                            },
                        ],
                    },

                    { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
                ],
            },
            plugins: [
                new webpack.ProgressPlugin(),
                new CleanWebpackPlugin(),
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.optimize\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {
                        discardComments: { removeAll: true },
                    },
                    canPrint: true,
                }),
                new HtmlWebpackPlugin({
                    template: './src/index.html',
                    inject: true,
                }),
                new MiniCssExtractPlugin({
                    filename: 'bundle.min.css',
                    // chunkFilename: '[id].css',
                }),
            ],
        },

        envconfig(mode),
        modulePresets({ mode, presets })
    );
};
