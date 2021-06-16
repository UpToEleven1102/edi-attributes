const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge.merge(common, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin(),
        new UglifyJsPlugin(),
    ],
});
