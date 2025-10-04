const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
    clean: true,
    publicPath: '/'
  },

  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'),
      },
      {
        directory: path.join(__dirname, 'public'),
        publicPath: '/public',
      }
    ],
    compress: true,
    port: 3001,
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: {
      paths: ['src/**/*', 'public/**/*'],
      options: {
        usePolling: true,
        interval: 200,
        ignored: /node_modules/,
      },
    },
    historyApiFallback: true,
    client: {
      logging: 'info',
      overlay: {
        errors: true,
        warnings: false,
      },
      webSocketURL: 'auto://0.0.0.0:0/ws',
    },
    devMiddleware: {
      writeToDisk: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: false,
      cache: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: 'public',
          noErrorOnMissing: true
        },
        {
          from: 'manifest.json',
          to: 'manifest.json'
        },
        {
          from: 'sw.js',
          to: 'sw.js'
        }
      ],
    }),
  ],

  resolve: {
    extensions: ['.js', '.css'],
  },

  devtool: 'eval-source-map',
  
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
