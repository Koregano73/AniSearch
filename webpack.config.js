const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'development',
  plugins: [new HtmlWebpackPlugin({
    template: './src/client/index.html',
  })],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx','.ts','.tsx'],
  },
  devServer: {
    proxy: {
      '/login': 'http://localhost:3000',
      '/': 'http://localhost:3000',
    },
  },
};
