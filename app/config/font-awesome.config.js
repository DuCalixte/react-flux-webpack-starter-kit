const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  styleLoader: ExtractTextWebpackPlugin.extract(
    {fallback: 'style-loader',
      use: ['css-loader, sass-loader']
    }),
  styles: {
    mixins: true,
    'bordered-pulled': true,
    core: true,
    'fixed-width': true,
    icons: true,
    larger: true,
    list: true,
    path: true,
    'rotated-flipped': true,
    animated: true,
    stacked: true,
  },
};
