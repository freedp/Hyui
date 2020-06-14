/**
 * 作者：Hyhello
 * 时间：2019-12-29
 * 描述：affix
 */
import { warn } from '@/utils/debug';
import { getDisplay, isElement, getTargetRect, isWindow } from '@/utils/utils';

const wHeight = window.innerHeight;

const getOffset = (el, target) => {
	const bool = isWindow(target);
	return getTargetRect(el).top - (bool ? 0 : getTargetRect(target).top);
};

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
					h('div', {
						style: styles
					}),
					h(
						'div',
						{
							style: fixStyle
						},
						vNodeList
					)
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
					left: `${rect.left}px`
				};
				// 目前只支持window
				this.elm = window || this.target ? document.querySelector(this.target) : window;
				this.elm.addEventListener('scroll', this.updatePos, false);
			});
		},
		updatePos() {
			const { $el, elm, offsetTop, offsetBottom, offsetType } = this;
			const offset = getOffset($el, elm);
			if (offsetType === 'top') {
				this.isActive = offset <= offsetTop;
				this.fixStyle.top = this.isActive ? `${offsetTop}px` : 0;
			} else if (offsetType === 'bottom') {
				this.isActive = offset <= wHeight - offsetBottom;
				this.fixStyle.top = this.isActive ? `${wHeight - offsetBottom}px` : 0;
			}
			this.$emit('change', this.isActive, offset);
		}
	},
	beforeDestroy() {
		this.elm.removeEventListener('scroll', this.updatePos, false);
		this.elm = null;
	}
};
