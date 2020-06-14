/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：tag
 */
import './tag.scss';
import { oneOf } from '@/utils/utils';

const CLASS_PREFIX = 'hy-tag';

const _DEFAULT = {
	size: ['large', 'medium', 'small'],
	type: ['success', 'warning', 'danger', 'info', '']
};

export default {
	name: 'hyTag',
	props: {
		type: {
			type: String,
			default: ''
		},
		closable: {
			type: Boolean,
			default: false
		},
		process: {
			type: Boolean,
			default: false
		},
		dot: {
			type: Boolean,
			default: false
		},
		border: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'large',
			validator(val) {
				return oneOf(val, _DEFAULT.size);
			}
		}
	},
	computed: {
		classes() {
			const list = [CLASS_PREFIX];
			const { type, border, dot, process } = this;
			list.push([`${CLASS_PREFIX}--${type || 'default'}`]);
			if (process) {
				list.push(`${CLASS_PREFIX}--processing`);
			}
			if (border) {
				list.push(`${CLASS_PREFIX}--border`);
			}
			if (dot) {
				list.push(`${CLASS_PREFIX}--dot`);
			}
			return list;
		}
	},
	render() {
		const { classes } = this;
		return (
			<span class={classes}>
				{this.$slots.default}
				{<i class={[`${CLASS_PREFIX}__closed`]}></i>}
			</span>
		);
	}
};
