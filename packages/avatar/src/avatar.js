/**
 * 作者：Hyhello
 * 时间：2020-01-10
 * 描述：头部
 */

import './avatar.scss';
import { noop } from '@/utils/vars';
import { oneOf, _typeof, maybeAddPx } from '@/utils/utils';

const CLASS_PREFIX = 'hy-avatar';

const SIZE = ['large', 'medium', 'small'];

const SHAPE = ['circle', 'square'];

export default {
	name: 'hyAvatar',
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
			default: 'large',
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
		srcSet: {
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
	data() {
		return {
			isImgExist: true
		};
	},
	computed: {
		classes() {
			const list = [CLASS_PREFIX];
			const { shape, size, icon, src } = this;
			if (size && _typeof(size) === 'string') {
				list.push(`${CLASS_PREFIX}--${size}`);
			}
			if (shape) {
				list.push(`${CLASS_PREFIX}--${shape}`);
			}
			if (src) {
				list.push(`${CLASS_PREFIX}--image`);
			}
			if (icon) {
				list.push(`${CLASS_PREFIX}--icon`);
			}
			return list;
		},
		styles() {
			const { size } = this;
			if (_typeof(size) === 'number') {
				return {
					width: maybeAddPx(size),
					height: maybeAddPx(size),
					lineHeight: maybeAddPx(size)
				};
			}
			return {};
		}
	},
	methods: {
		handlerError() {
			const { onError } = this;
			const flag = onError ? onError() : undefined;
			if (flag !== false) {
				this.isImgExist = false;
			}
		},
		renderAvatar() {
			const h = this.$createElement;
			const { icon, src, alt, srcSet, isImgExist, handlerError } = this;
			if (isImgExist && src) {
				return h('img', {
					on: {
						error: handlerError
					},
					attrs: {
						src,
						alt,
						srcSet
					}
				});
			}
			if (icon) {
				return h('hy-icon', {
					props: {
						type: icon
					}
				});
			}
			return this.$slots.default;
		}
	},
	render(h) {
		const { classes, styles } = this;
		return h(
			'span',
			{
				class: classes,
				style: styles
			},
			[this.renderAvatar()]
		);
	}
};
