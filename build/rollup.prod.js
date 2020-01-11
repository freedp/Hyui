const filesize = require('rollup-plugin-filesize');
const { terser } = require('rollup-plugin-terser');
const rollupConfig = require('./rollup.base');

rollupConfig.plugins.push(
	filesize(),
	terser({
		output: {
			ascii_only: true, // 仅支持ascii字符，非ascii字符将转成\u格式
			comments: function(node, comment) {
				var text = comment.value;
				var type = comment.type;
				if (type == 'comment2') {
					// multiline comment
					return /@preserve|@license|@(c)/i.test(text);
				}
			}
		},
		compress: {
			pure_funcs: ['func', 'console.log'] // 去掉console.log函数
		}
	})
);

module.exports = rollupConfig;
