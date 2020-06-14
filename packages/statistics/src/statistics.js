/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：statistics
 */

import './statistics.scss';

const CLASS_PREFIX = 'hy-statistics';
console.log(CLASS_PREFIX);
export default {
	name: 'hyStatistics',
	props: {
		value: {
			type: [String, Number],
			defualt: ''
		}
	}
};
