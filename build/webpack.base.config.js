const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/scripts/main', './src/index.html'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.[contenthash:8].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: [/.css$|.scss$/],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          noquotes: true
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          'file-loader?name=[name].[hash:8].[ext]&outputPath=assets/images',
          {
            loader: 'image-webpack-loader'
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true
            }
          }
        ],
      }
    ]
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@images': path.resolve(__dirname, '../src/images'),
      '@': path.resolve(__dirname, '../src')
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src')
    ],
    extensions: ['.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash:8].css',
    }),
    // new HtmlWebpackPlugin({
    //   title: 'Setting up webpack 4',
    //   template: './src/index.html',
    //   inject: true,
    //   interpolate: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: false
    //   },
    // })
  ]
};
