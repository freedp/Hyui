/**
 * 作者：Hyhello
 * 时间：2018-05-17
 * 描述：面包屑
 */
import './breadcrumb-item.scss';

const CLASS_PREFIX = 'hy-breadcrumb';

export default {
	name: 'BreadcrumbItem',
	props: {
		to: {
			type: [Object, String],
			default: ''
		}
	},
	data() {
		return {
			CLASS_PREFIX,
			separatorShow: true
		};
	},
	inject: ['Breadcrumb'],
	computed: {
		separator() {
			return this.Breadcrumb.separator;
		}
	},
	methods: {
		renderBody() {
			const { to } = this;
			const h = this.$createElement;
			const tag = to ? 'router-link' : 'span';
			return h(
				tag,
				{
					class: [`${CLASS_PREFIX}-item__inner`, { 'is-link': !!to }],
					props: {
						to,
						tag: 'a'
					}
				},
				this.$slots.default
			);
		}
	},
	render(h) {
		const { separator } = this;
		return h(
			'span',
			{
				class: `${CLASS_PREFIX}-item__panel`
			},
			[
				this.renderBody(),
				h(
					'span',
					{
						class: `${CLASS_PREFIX}-item__separator`
					},
					separator
				)
			]
		);
	}
};
