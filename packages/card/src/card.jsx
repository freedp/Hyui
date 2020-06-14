/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：card
 */
import './card.scss';
import { oneOf } from '@/utils/utils';

const CLASS_PREFIX = 'hy-card';

const _DEFAULT = {
	shadow: ['always', 'hover', 'never']
};

export default {
	name: 'hyCard',
	props: {
		header: {
			type: [String, Boolean, Number],
			default: ''
		},
		shadow: {
			type: [String],
			default: 'hover',
			validator(val) {
				return oneOf(val, _DEFAULT.shadow);
			}
		},
		headerStyle: {
			type: [Object],
			default: () => {}
		},
		bodyStyle: {
			type: [Object],
			default: () => {}
		}
	},
	computed: {
		classes() {
			const { shadow } = this;
			const list = [CLASS_PREFIX];
			if (shadow) {
				list.push(`${CLASS_PREFIX}--${shadow}`);
			}
			return list;
		}
	},
	render() {
		const list = [];
		const { classes, header, bodyStyle, headerStyle, $slots } = this;
		// headerTpl
		if (header || $slots.header) {
			list.push(
				<div class={[`${CLASS_PREFIX}-header`]} style={headerStyle}>
					{$slots.header || header}
				</div>
			);
		}

		// bodyTpl
		list.push(
			<div class={[`${CLASS_PREFIX}-body`]} style={bodyStyle}>
				{$slots.default}
			</div>
		);

		return <div class={classes}>{...list}</div>;
	}
};
