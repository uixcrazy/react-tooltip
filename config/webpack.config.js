/**
 * docs: webpack 2.2.1
 * https://webpack.js.org/guides/migrating/
 * https://webpack.js.org/configuration/
*/

/* eslint-disable */
import webpack from 'webpack';
import path from 'path';
import { DEV_PORT, HOST_NAME } from './const';

export default {

  entry: {
    tooltip: ['./example/app.js', 'webpack/hot/dev-server'],
  },

  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    publicPath: `http://${HOST_NAME}:${DEV_PORT}/assets/`,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        },
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              sourceMap: true
            }
          }, {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif|eot|woff|ttf)$/,
        use: 'file-loader?name=[path][name].[ext]'
      },

    ],

    /* Advanced module configuration (click to show) */
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    // modules: [
    //   "node_modules",
    //   path.resolve(__dirname, "app")
    // ],
    // ↑↑↑ hông hiểu
    // directories where to look for modules

    extensions: [".js", ".json", ".scss", ".css"],
    // extensions that are used

    alias: {
      "animate": path.resolve(__dirname, '../../node_modules/animate.css/source'),
      "normalize": path.resolve(__dirname, "../node_modules/normalize.css"),
      "isotip": path.resolve(__dirname, "../assets/javascripts/isotip.js"),
    },
  },

  performance: {
    hints: "warning", // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },

  devtool: "source-map",

  // context: __dirname, // string (absolute path!)

  target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  // externals: ["react", /^@angular\//],
  // Don't follow/bundle these modules, but request them at runtime from the environment

  stats: {
    /* TODO */
  },

  devServer: {
    /* TODO - instead dev.js */
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  /* Advanced configuration (click to show) */
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000, // in ms
    poll: true, // intervall in ms
  },
};
/* eslint-enable */
