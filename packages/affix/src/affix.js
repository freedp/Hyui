/**
 * 作者：Hyhello
 * 时间：2019-12-29
 * 描述：affix
 */
export default {
	name: 'Affix',
	props: {
		tag: {
			type: String,
			default: 'span'
		}
	},
	render(h) {
		return h(this.tag, this.$slots.default);
	}
};
