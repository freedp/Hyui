const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const alias = require('rollup-plugin-alias');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const { eslint } = require('rollup-plugin-eslint');
const vue = require('rollup-plugin-vue');
const json = require('rollup-plugin-json');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const config = require('../config');
const pkg = require('../package.json');
const { toCamel } = require('./utils');
const aliass = require('./alias.js');

const name = toCamel(pkg.name);
const author = pkg.author || 'Hyhello';
const version = process.env.VERSION || pkg.version;
const env = process.env.NODE_ENV || 'development';

const banner =
	'/*!\n' +
	` * ${pkg.name} v${version}\n` +
	` * @license (c) 2018-${new Date().getFullYear()} ${author}\n` +
	' * Released under the MIT License.\n' +
	' */';

const baseConfig = {
	input: 'src/index.js',
	output: [
		{
			format: 'iife',
			name: name,
			file: pkg.main,
			sourcemap: true,
			banner: banner,
			globals: {
				vue: 'Vue'
			}
		}
	],
	external: ['vue'],
	plugins: [
		resolve({
			extensions: aliass.resolve
		}),
		commonjs(),
		alias(Object.assign({}, aliass)),
		eslint({
			formatter: require('eslint-friendly-formatter'),
			include: ['src/**/*.js', 'package/**/*.{js|vue}']
		}),
		babel({
			exclude: 'node_modules/**'
		}),
		postcss({
			plugins: [autoprefixer, cssnano],
			sourceMap: true,
			extensions: ['.sass', '.scss', '.css'],
			extract: `${config.buildDir}/hyui.min.css` // 输出路径
		}),
		vue({
			css: false
		}),
		json({
			exclude: ['node_modules/**']
		}),
		replace({
			__VERSION__: version,
			__NAME__: pkg.name,
			'process.env.NODE_ENV': JSON.stringify(env)
		})
	]
};

module.exports = baseConfig;
