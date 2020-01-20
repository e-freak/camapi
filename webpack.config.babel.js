import path from 'path';

module.exports = {
    target: 'node',
    entry: path.join(__dirname, 'src/main/js/server.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'camapi.js',
    },
    module: {
        rules: [ {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [ {
                loader: 'babel-loader',
            } ],
        } ],
    },
    resolve: {
        modules: [
            'node_modules',
        ],
        alias: {
            '@camapi': path.resolve(__dirname, 'src/main/js'),
        },
    },
};
