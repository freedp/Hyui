/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：icon
 */

import './icon.scss';

const CLASS_PREFIX = 'hy-icon';

export default {
	name: 'hyIcon',
	props: {
		type: {
			type: String,
			default: ''
		}
	},
	render(h) {
		return h('span', {
			class: [`${CLASS_PREFIX}-${this.type}`]
		});
	}
};
