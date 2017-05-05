/**
 * docs: http://webpack.github.io/docs/webpack-dev-server.html
*/
/* eslint-disable */
import webpack from 'webpack';
import express from 'express';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import getConfig from './webpack.config';
import { DEV_PORT, HOST_NAME } from './const';

const router = express.Router();

const entries = {};
// demo: ['./example/demo.js', 'webpack/hot/dev-server'],
// todolist: ['./example/todolist.js', 'webpack/hot/dev-server'],
function getEntries() {
  return entries;
}
// ↑↑↑ ----- ??? ----- ↑↑↑
const config = getConfig(getEntries);
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

router.get('/:demo_page', (req, res) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  // ↑↑↑ http://stackoverflow.com/questions/49547/how-to-control-web-page-caching-across-all-browsers

  const pageName = req.params.demo_page;
  if(!entries[pageName]) {
    entries[pageName] = [`./example/${pageName}.js`, 'webpack/hot/dev-server'];
    server.middleware.invalidate();
  }
  res.sendFile(path.resolve(__dirname, `../example/index-${pageName}.html`), 'utf-8');
});

server.use(router);
server.listen(DEV_PORT, HOST_NAME, () => {
  console.log(`Server start at ${HOST_NAME} on port: ${DEV_PORT}`);
});
// server.close();
