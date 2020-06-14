/**
 * 作者：Hyhello
 * 时间：2018-05-17
 * 描述：面包屑
 */
import './breadcrumb-item.scss';

const CLASS_PREFIX = 'hy-breadcrumb';

export default {
	name: 'hyBreadcrumbItem',
	props: {
		to: {
			type: [Object, String],
			default: ''
		}
	},
	data() {
		return {
			separatorShow: true
		};
	},
	inject: ['hyBreadcrumb'],
	computed: {
		separator() {
			return this.hyBreadcrumb.separator;
		}
	},
	render() {
		const { to, separator } = this;
		const tag = to ? 'router-link' : 'span';
		return (
			<span class={[`${CLASS_PREFIX}-item__panel`]}>
				<tag class={[`${CLASS_PREFIX}-item__inner`, { 'is-link': !!to }]} to={to} tag="a">
					{this.$slots.default}
				</tag>
				<span class={[`${CLASS_PREFIX}-item__separator`]}>{separator}</span>
			</span>
		);
	}
};
