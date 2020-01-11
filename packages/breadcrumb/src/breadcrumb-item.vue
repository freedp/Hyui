/** * 作者：Hyhello * 时间：2018-05-17 * 描述：面包屑 */
<style lang="scss">
@import './breadcrumb-item.scss';
</style>
<template>
	<span class="breadcrumb-item__panel">
		<router-link
			class="breadcrumb-item__inner"
			:class="{ 'is-link': !!this.to }"
			:tag="linkTag"
			:to="to"
			><slot></slot
		></router-link>
		<span class="breadcrumb-item__separator">{{ separator }}</span>
	</span>
</template>
<script>
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
