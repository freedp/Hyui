/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：icon
 */

import './icon.scss';

export default {
	name: 'Icon',
	props: {
		type: {
			type: String,
			default: ''
		}
	},
	render(h) {
		return h('span', {
			class: [`hy-icon-${this.type}`]
		});
	}
};
