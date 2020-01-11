/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：button
 */
import './button.scss';
import { oneOf, _typeof, maybeAddPx } from '@/utils/utils';

const CLASS_PREFIX = 'hy-button';

const _DEFAULT = {
	delay: 200, // ms 毫秒
	size: ['large', 'medium', 'small'],
	shape: ['normal', 'round', 'circle'],
	nativeType: ['button', 'submit', 'reset'],
	type: ['primary', 'success', 'warning', 'danger', 'info', 'text', '']
};

export default {
	name: 'hyButton',
	props: {
		loading: {
			type: [Boolean, Object],
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		icon: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'large',
			validator(val) {
				return oneOf(val, _DEFAULT.size);
			}
		},
		shape: {
			type: String,
			default: 'normal',
			validator(val) {
				return oneOf(val, _DEFAULT.shape);
			}
		},
		type: {
			type: String,
			default: '',
			validator(val) {
				return oneOf(val, _DEFAULT.type);
			}
		},
		nativeType: {
			type: String,
			default: 'button',
			validator(val) {
				return oneOf(val, _DEFAULT.nativeType);
			}
		}
	},
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
