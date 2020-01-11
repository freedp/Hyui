/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：button
 */
import './button.scss';

const CLASS_PREFIX = 'hy-button';

export default {
	name: 'hyButton',
	render(h) {
		return h('button', {
			class: CLASS_PREFIX,
			attrs: {
				'aria-label': 'button',
				rule: 'button'
			}
		});
	}
};
