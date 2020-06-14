/**
 * 作者：Hyhello
 * 时间：2019-06-23
 * 描述：工具库
 */

import { _hasOwn, _assign, _slice, _toString, elementDisplayMap } from './vars';

// 检测是否是element
export const isElement = el => {
	return typeof el === 'object' && el.nodeType === 1;
};

// oneOf
export const oneOf = (target, list) => {
	return list.some(item => item === target);
};

// 继承
export const _extend = (target, resource) => {
	try {
		return _assign.apply(Object, [target, resource]);
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

// 是否是window
export const isWindow = target => {
	return target != null && target === target.window;
};

export const isObject = target => {
	return target !== null && typeof target === 'object';
};

export const isFunction = target => {
	return typeof target === 'function' && target instanceof Function;
};

export const isPromise = target => {
	// 初始promise 或 promise.then返回的，故target有可能是function
	return target && (isObject(target) || isFunction(target)) && typeof isFunction(target.then);
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

// 获得tag 是否是block,inline-block,inline
export const defaultDisplay = tagName => {
	let element, display;
	if (!elementDisplayMap[tagName]) {
		element = document.createElement(tagName);
		document.body.appendChild(element);
		display = document.defaultView.getComputedStyle(element, false).getPropertyValue('display');
		element.parentNode.removeChild(element);
		if (display === 'none') {
			display = 'block';
		}
		elementDisplayMap[tagName] = display;
	}
	return elementDisplayMap[tagName];
};

// 获取元素display
export const getDisplay = el => {
	const display = document.defaultView.getComputedStyle(el, false).getPropertyValue('display');
	return display;
};

// 获取元素的rect
export const getTargetRect = el => {
	return el !== window ? el.getBoundingClientRect() : { top: 0, bottom: window.innerHeight };
};
