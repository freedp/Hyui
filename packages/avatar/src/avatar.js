/**
 * 作者：Hyhello
 * 时间：2020-01-10
 * 描述：头部
 */

import './avatar.scss';
import { noop } from '@/utils/vars';
import { oneOf, _typeof } from '@/utils/utils';

const SIZE = ['large', 'small', 'default'];

const SHAPE = ['circle', 'square'];

export default {
	name: 'Avatar',
	props: {
		shape: {
			type: String,
			default: 'circle',
			validator(val) {
				return oneOf(val, SHAPE);
			}
		},
		size: {
			type: [String, Number],
			default: 'default',
			validator(val) {
				return oneOf(val, SIZE) || _typeof(val) === 'number';
			}
		},
		icon: {
			type: String,
			default: ''
		},
		src: {
			type: String,
			default: ''
		},
		alt: {
			type: String,
			default: ''
		},
		onError: {
			type: Function,
			default: noop
		}
	},
	render(h) {
		return h('span');
	}
};
