const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        loaders: ['babel-loader'],
      },
      {
        test: /\.wav$/,
        include: path.resolve(__dirname, 'src'),
        loaders: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devServer: {
    contentBase: './dist',
  },
}
