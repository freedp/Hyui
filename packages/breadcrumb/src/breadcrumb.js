/**
 * 作者：Hyhello
 * 时间：2018-05-17
 * 描述：面包屑
 */
import './breadcrumb.scss';

const CLASS_PREFIX = 'hy-breadcrumb';

export default {
	name: 'Breadcrumb',
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		separator: {
			type: String,
			default: '/'
		}
	},
	provide() {
		return {
			Breadcrumb: this
		};
	},
	render(h) {
		return h(
			this.tag,
			{
				class: CLASS_PREFIX,
				attrs: {
					'aria-label': 'breadcrumb',
					rule: 'navigation'
				}
			},
			[this.$slots.default]
		);
	}
};
