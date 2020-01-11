const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const rollupConfig = require('./rollup.base');
const config = require('../config');

const HOST = process.env.HOST || config.host;
const PORT = process.env.PORT || config.port;

rollupConfig.plugins.push(
	serve({
		open: config.open, // 是否打开浏览器
		contentBase: './', // 入口html的文件位置
		historyApiFallback: true, // Set to true to return index.html instead of 404
		host: HOST,
		port: PORT
	}),
	livereload({
		watch: config.watchDir //监听文件夹;
	})
);

module.exports = rollupConfig;
