/**
 * 作者：Hyhello
 * 时间：2019-06-26
 * 描述：工具
 */
const path = require('path');

exports.pathResolve = dir => path.resolve(__dirname, '../', dir);

exports.toCamel = str => {
	return str.replace(/(?:^|-)(\w)/g, (_, $1) => {
		return $1.toUpperCase();
	});
};

exports.convertSep = (str, sep) => {
	return str.replace(new RegExp(`\\${path.sep}`, 'g'), sep);
};
