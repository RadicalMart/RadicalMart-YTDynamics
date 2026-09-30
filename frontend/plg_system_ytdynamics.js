const entry = {
    "gallery": {
        import: './src/gallery.es6',
        filename: 'gallery.js',
    },
    "src/picker-product": {
        import: './src/picker-product.es6',
        filename: 'picker-product.js',
    },
    "product-interactions": {
        import: './src/product-interactions.es6',
        filename: 'product-interactions.js',
    },
    "table": {
        import: './src/table.es6',
        filename: 'table.js',
    },
    "toolbar": {
        import: './src/toolbar.es6',
        filename: 'toolbar.js',
    },
};

const webpackConfig = require('./webpack.config.js');
const publicPath = '../media';
const production = webpackConfig(entry, publicPath);
const development = webpackConfig(entry, publicPath, 'development');

module.exports = [production, development]
