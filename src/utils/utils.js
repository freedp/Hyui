/**
 * 作者：Hyhello
 * 时间：2019-06-23
 * 描述：工具库
 */

import { _hasOwn, _assign, _slice, _toString } from './vars';

// 检测是否是element
export const isElement = el => {
	return typeof el === 'object' && el.nodeType === 1;
};

// oneOf
export const oneOf = (target, list) => {
	return list.some(item => item === target);
};

// 继承
export const extend = (target, resource) => {
	try {
		return _assign.apply(Object, arguments);
	} catch (error) {
		for (const i in resource) {
			if (_hasOwn.call(resource, i)) {
				target[i] = resource[i];
			}
		}
		return target;
	}
};

// 定义属性
export const _defineProperty = (obj, key, value) => {
	return Object.defineProperty(obj, key, {
		value,
		enumerable: true
	});
};

// toNumber
export const toNumber = val => {
	const n = parseFloat(val);
	// eslint-disable-next-line no-restricted-globals
	return isNaN(n) ? val : n;
};

// 判断类型
export const _typeof = type => {
	return _toString
		.call(type)
		.slice(8, -1)
		.toLowerCase();
};

// 判断是否是基本类型
export const isPrimitive = n => {
	return n !== Object(n);
};

// 判断是否是数组
export const isArray =
	Array.isArray ||
	function(n) {
		return n instanceof Array;
	};

// 是否添加px
export const maybeAddPx = n => {
	// eslint-disable-next-line no-restricted-globals
	return isNaN(+n) ? n : `${n}px`;
};

// likeArray
export const toArray = (likeArray, num = 0) => {
	return _slice.apply(likeArray, num);
};
