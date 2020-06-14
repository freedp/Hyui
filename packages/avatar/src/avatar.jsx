/**
 * 作者：Hyhello
 * 时间：2020-01-10
 * 描述：头部
 */

import './avatar.scss';
import { noop } from '@/utils/vars';
import { oneOf, _typeof, maybeAddPx } from '@/utils/utils';
import hyIcon from '../../icon/index';

const CLASS_PREFIX = 'hy-avatar';

const _DEFAULT = {
	shape: ['circle', 'square'],
	size: ['large', 'medium', 'small']
};

export default {
	name: 'hyAvatar',
	components: { hyIcon },
	props: {
		shape: {
			type: String,
			default: 'circle',
			validator(val) {
				return oneOf(val, _DEFAULT.shape);
			}
		},
		size: {
			type: [String, Number],
			default: 'large',
			validator(val) {
				return oneOf(val, _DEFAULT.size) || _typeof(val) === 'number';
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
		}
	},
	render() {
		const { classes, styles, icon, src, alt, srcSet, isImgExist, handlerError } = this;
		let bodyTpl = this.$slot.default;
		if (isImgExist && src) {
			bodyTpl = <img onError={handlerError} src={src} alt={alt} srcSet={srcSet} />;
		} else if (icon) {
			bodyTpl = <hy-icon type={icon}></hy-icon>;
		}

		return (
			<span class={classes} style={styles}>
				{bodyTpl}
			</span>
		);
	}
};
