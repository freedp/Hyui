/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：button
 */
import './button.scss';
import { oneOf } from '@/utils/utils';
import hyIcon from '../../icon';

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
	components: { hyIcon },
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
		}
	},
	render() {
		const { classes, nativeType, handlerClick, loading, icon } = this;
		const list = [];
		if (loading || icon) {
			list.push(<hy-icon type={icon && !loading ? icon : 'refresh'}></hy-icon>);
		}
		if (this.$slots.default) {
			list.push(<span>{this.$slots.default}</span>);
		}

		return (
			<button class={classes} aria-label="button" rule="button" type={nativeType} onClick={handlerClick}>
				{...list}
			</button>
		);
	}
};
