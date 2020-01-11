/** * 作者：Hyhello * 时间：2018-05-17 * 描述：面包屑 */
<style lang="scss">
@import './breadcrumb-item.scss';
</style>
<template>
	<span :class="[`${CLASS_PREFIX}-item__panel`]">
		<router-link
			:class="[`${CLASS_PREFIX}-item__inner`, { 'is-link': !!this.to }]"
			:tag="linkTag"
			:to="to"
			><slot></slot>
		</router-link>
		<span :class="[`${CLASS_PREFIX}-item__separator`]">
			{{ separator }}
		</span>
	</span>
</template>
<script>
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
		},
		linkTag() {
			return this.to ? 'a' : 'span';
		}
	}
};
</script>
