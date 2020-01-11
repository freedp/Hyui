/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：button
 */
import './button.scss';
import { oneOf, _typeof, maybeAddPx } from '@/utils/utils';

const CLASS_PREFIX = 'hy-button';

const TYPE_LIST = ['primary', 'success', 'warning', 'danger', 'info', 'text', ''];

const NATIVE_TYPE_LIST = ['button', 'submit', 'reset'];

const SIZE_LIST = ['large', 'medium', 'small'];

const SHAPE_LIST = ['normal', 'round', 'circle'];

export default {
	name: 'hyButton',
	props: {
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
				return oneOf(val, SIZE_LIST);
			}
		},
		shape: {
			type: String,
			default: 'normal',
			validator(val) {
				return oneOf(val, SHAPE_LIST);
			}
		},
		type: {
			type: String,
			default: '',
			validator(val) {
				return oneOf(val, TYPE_LIST);
			}
		},
		nativeType: {
			type: String,
			default: 'button',
			validator(val) {
				return oneOf(val, NATIVE_TYPE_LIST);
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
