/**
 * 作者：Hyhello
 * 时间：2020-01-14
 * 描述：防抖及节流
 */

/**
 *
 * @param { int } wait 等待时长
 * @param { function } callback 回调函数
 * @param { boolean } immediate 是否首次触发
 * @return { function }
 */
export const debounce = (callback, wait, immediate = false) => {
	let timer = null;
	const exec = (that, args) => {
		if (immediate) {
			callback.apply(that, args);
			immediate = false;
		}
	};
	return function() {
		// eslint-disable-next-line prefer-rest-params
		const args = arguments;
		exec(this, args);
		if (timer) {
			window.clearTimeout(timer);
			timer = null;
		}
		timer = window.setTimeout(() => {
			immediate = true;
			exec(this, args);
		}, wait);
	};
};

// 节流
/**
 *
 * @param { int } wait 等待时长
 * @param { function } callback 回调函数
 * @return { function }
 */
export const throttle = (callback, wait) => {
	let last = 0;
	return function() {
		const now = Date.now();
		if (now - last > wait) {
			last = now;
			// eslint-disable-next-line prefer-rest-params
			callback.apply(this, arguments);
		}
	};
};
