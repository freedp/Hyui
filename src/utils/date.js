/**
 * 作者：Hyhello
 * 时间：2020-05-22
 * 描述：日期方面得工具
 */
import { _typeof } from './utils';
// 获取当前时间
export const getNow = () => {
	return new Date();
};

// 判断是否是一个日期
export const isDate = date => {
	return date instanceof Date && _typeof(date) === 'date';
};

export const getPointDate = () => {};

export const rangeArr = n => {
	return [...Array(n).keys()];
};

// 是否是闰年
export const isLeap = year => {
	// eslint-disable-next-line no-nested-ternary
	return year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : year % 4 === 0 ? 1 : 0;
};

export const mdays = date => {
	if (!isDate(date)) return;
	const da = new Date(date.getTime());
	const totalDays = [31, 28 + isLeap(da.getFullYear()), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return totalDays[da.getMonth()];
};

// 获取月天数
export const getDaysByMonth = date => {
	return rangeArr(mdays(date)).map((item, i) => i + 1);
};

// 获取这个月得第一天星期几
export const getFirstDayByMonth = date => {
	if (!isDate(date)) return;
	const da = new Date(date.getTime());
	da.setDate(1);
	return da.getDay();
};

// 获取上月有多少天
export const getPrevMonthLastDays = (date, offset = 0) => {
	if (!isDate(date)) return;
	if (offset <= 0) return [];
	const da = new Date(date.getTime());
	da.setDate(0);
	const lastDay = da.getDate();
	return rangeArr(offset).map((item, i) => {
		return lastDay - (offset - i - 1);
	});
};
