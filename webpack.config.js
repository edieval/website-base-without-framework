const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: ['./src/scripts/main.js', './src/styles/main.scss'],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/assets',
    filename: 'assets/scripts/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            // Extracts the CSS into a separate file and uses the defined configurations in the 'plugins' section
            loader: MiniCssExtractPlugin.loader
          },
          {
            // Interprets CSS
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            // Use PostCSS to minify and autoprefix. This loader uses the configuration in `postcss.config.js`
            loader: 'postcss-loader'
          },
          {
            // Adds support for Sass files, if using Less, then
            // use the less-loader
            loader: 'sass-loader'
          }
        ]
      },
      {
        // Adds support to load images in your CSS rules.
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '../images',
              // When this option is 'true', the loader will emit the image to output.path
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/styles/main.css'
    })
  ]
};