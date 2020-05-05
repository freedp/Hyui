/**
 * 作者：Hyhello
 * 时间：2019-12-29
 * 描述：affix
 */
import { warn } from '@/utils/debug';
import { getDisplay, isElement, getTargetRect } from '@/utils/utils';

const wHeight = window.innerHeight;

export default {
	name: 'Affix',
	props: {
		target: {
			type: String,
			default: ''
		},
		offsetTop: {
			type: Number,
			default: 100
		},
		offsetBottom: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			offset: 0,
			isActive: false,
			fixStyle: {},
			styles: {}
		};
	},
	computed: {
		offsetType() {
			const { offsetBottom } = this;
			return offsetBottom > 0 ? 'bottom' : 'top';
		}
	},
	render(h) {
		try {
			const { isActive, styles, fixStyle } = this;
			const childList = this.$slots.default;
			let vNodeList = [childList];
			if (!childList || !childList[0].tag) {
				throw new Error('component <affix> must contain element');
			}
			if (childList.length > 1) {
				throw new Error('component <affix> must single element');
			}
			if (isActive) {
				vNodeList = [
					h(
						'div',
						{
							style: fixStyle
						},
						vNodeList
					),
					h('div', {
						style: styles
					})
				];
			}
			return h(
				'span',
				{
					style: {
						outline: 'none'
					},
					attrs: {
						rule: 'affix',
						tabIndex: -1
					}
				},
				vNodeList
			);
		} catch (e) {
			warn(e.message);
			return null;
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.$nextTick(() => {
				if (!isElement(this.$el)) return;
				const vNode = this.$slots.default[0].elm;
				const rect = getTargetRect(vNode);
				this.styles = {
					display: getDisplay(vNode),
					width: `${rect.width}px`,
					height: `${rect.height}px`,
					userSelect: 'none'
				};
				this.fixStyle = {
					...this.styles,
					position: 'fixed',
					top: `${this.offset}px`,
					left: `${rect.left}px`
				};
				this.elm = this.target ? document.querySelector(this.target) : window;
				this.elm.addEventListener('scroll', this.updatePos, false);
			});
		},
		updatePos(ev) {
			console.log(ev);
			const { offsetTop, offsetBottom } = this;
			const vNode = this.$slots.default[0].elm;
			const rect = getTargetRect(vNode);
			if (offsetTop) {
				this.isActive = rect.top >= offsetTop;
				console.log(rect.top, offsetTop);
				this.offset = offsetTop;
			} else if (offsetBottom) {
				this.isActive = rect.top >= wHeight - offsetBottom;
				this.offset = wHeight - offsetBottom;
			} else {
				this.isActive = false;
			}
		}
	},
	beforeDestroy() {
		this.elm.removeEventListener('scroll', this.updatePos, false);
		this.elm = null;
	}
};
