/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：button
 */
import './button.scss';
import { oneOf } from '@/utils/utils';

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
			type: Boolean,
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
	computed: {
		classes() {
			const list = [CLASS_PREFIX];
			const { size, shape, type, disabled } = this;
			list.push(`${CLASS_PREFIX}--${type || 'defulat'}`);
			if (size) {
				list.push(`${CLASS_PREFIX}--${size}`);
			}
			if (shape) {
				list.push(`${CLASS_PREFIX}--${shape}`);
			}
			if (disabled) {
				list.push(`${CLASS_PREFIX}--disabled`);
			}
			return list;
		}
	},
	methods: {
		handlerClick(e) {
			if (this.disabled) return;
			this.$emit('click', e);
		},
		renderBody() {
			const list = [];
			const h = this.$createElement;
			const { loading, icon } = this;
			if (loading || icon) {
				list.push(
					h('hy-icon', {
						props: {
							type: icon && !loading ? icon : 'refresh'
						}
					})
				);
			}
			if (this.$slots.default) {
				list.push(h('span', this.$slots.default));
			}
			return list;
		}
	},
	render(h) {
		const { classes, nativeType } = this;
		return h(
			'button',
			{
				class: classes,
				attrs: {
					'aria-label': 'button',
					rule: 'button',
					type: nativeType
				},
				on: {
					click: this.handlerClick
				}
			},
			this.renderBody()
		);
	}
};
