/**
 * docs: http://webpack.github.io/docs/webpack-dev-server.html
*/

import webpack from 'webpack';
import express from 'express';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';
import { DEV_PORT, HOST_NAME } from './const';

const router = express.Router();
const server = new WebpackDevServer(webpack(config), {
  contentBase: path.resolve(__dirname, 'public'),
  compress: true,
  publicPath: '/assets/',
  headers: { "X-Custom-Header": "yes" },
  hot: true,
  inline: true,
  lazy: false,
  historyApiFallback: false,
  stats: { colors: true },
  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
});

// router.get('/:demo_page', (req, res) => {
router.get('/:demo_page', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../example/index.html'), 'utf-8');
});

server.use(router);
server.listen(DEV_PORT, HOST_NAME, () => {
  console.log(`Server start at ${HOST_NAME} on port: ${DEV_PORT}`);
});
// server.close();
