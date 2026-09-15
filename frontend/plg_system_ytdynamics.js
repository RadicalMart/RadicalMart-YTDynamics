const entry = {
    "src/gallery": {
        import: './src/gallery.es6',
        filename: 'gallery.js',
    },
    "src/picker-product": {
        import: './src/picker-product.es6',
        filename: 'picker-product.js',
    },
};

const webpackConfig = require('./webpack.config.js');
const publicPath = '../media';
const production = webpackConfig(entry, publicPath);
const development = webpackConfig(entry, publicPath, 'development');

module.exports = [production, development]