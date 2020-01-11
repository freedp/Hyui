/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：骨架屏
 */
import './skeleton.scss';
import { _typeof, isArray, isPrimitive, maybeAddPx, oneOf } from '@/utils/utils';
import { warn } from '@/utils/debug';

const CLASS_PREFIX = 'hy-skeleton';

// 默认配置
const _DEFALUT = {
	titleWidth: '38%', //
	graph: {
		rows: 3, // number
		width: '61%' // number | string | Array<number | string>
	},
	avatar: {
		size: 'small', //  large / medium / small
		shape: 'circle' // 'circle', 'square'
	}
};

const SHAPE_LIST = ['circle', 'square'];

const SIZE_LIST = ['large', 'medium', 'small'];

export default {
	name: 'hySkeleton',
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		// 是否展示标题占位符
		title: {
			type: [Boolean, String, Number],
			default: true
		},
		// 是否显示头像
		avatar: {
			type: [Boolean, Object],
			default: false
		},
		// 是否显示动画
		active: {
			type: Boolean,
			default: false
		},
		// 是否显示段落占位图
		graph: {
			type: [Boolean, Object],
			default: false
		}
	},
	computed: {
		rowProp() {
			const { graph } = this;
			if (_typeof(graph) === 'boolean') {
				return graph ? ['', '', _DEFALUT.graph.width] : [];
			}
			if (_typeof(graph) === 'object') {
				const rows =
					'rows' in graph && _typeof(graph.rows) === 'number' && graph.rows > 0
						? graph.rows
						: _DEFALUT.graph.rows;
				let width = [];
				if (isPrimitive(graph.width)) {
					width = [graph.width || _DEFALUT.graph.width];
				} else {
					width = isArray(graph.width) ? graph.width : [_DEFALUT.graph.width];
				}
				width.reverse();
				width.length = rows;
				return width.reverse();
			}
		},
		avatarProp() {
			const { avatar } = this;
			if (_typeof(avatar) === 'boolean') {
				return _DEFALUT.avatar;
			}
			if (_typeof(avatar) === 'object') {
				const size = 'size' in avatar && oneOf(avatar.size, SIZE_LIST) ? avatar.size : _DEFALUT.avatar.size;
				const shape =
					'shape' in avatar && oneOf(avatar.shape, SHAPE_LIST) ? avatar.shape : _DEFALUT.avatar.shape;
				return {
					size,
					shape
				};
			}
		},
		titleProp() {
			return _typeof(this.title) === 'boolean' ? _DEFALUT.titleWidth : maybeAddPx(this.title || 'auto');
		}
	},
	methods: {
		// 头像
		renderAvatar() {
			const list = [];
			const h = this.$createElement;
			const { avatar, avatarProp } = this;
			if (avatar) {
				list.push(
					h(
						'div',
						{
							class: `${CLASS_PREFIX}-header`
						},
						[
							h('hy-avatar', {
								props: {
									size: avatarProp.size,
									shape: avatarProp.shape
								},
								class: `${CLASS_PREFIX}-avatar`
							})
						]
					)
				);
			}
			return list;
		},
		renderTitle() {
			const list = [];
			const h = this.$createElement;
			const { title, titleProp } = this;
			if (title) {
				list.push(
					h('h3', {
						class: `${CLASS_PREFIX}-title`,
						style: {
							width: titleProp
						}
					})
				);
			}
			return list;
		},
		renderRows() {
			const list = [];
			const { rowProp } = this;
			const h = this.$createElement;
			for (let i = 0; i < rowProp.length; i++) {
				list.push(
					h('li', {
						style: {
							width: maybeAddPx(rowProp[i] || 'auto')
						}
					})
				);
			}
			return list;
		}
	},
	render(h) {
		const { active, avatar, loading } = this;

		// body
		const bodyTpl = h(
			'div',
			{
				class: `${CLASS_PREFIX}-content`
			},
			[
				this.renderTitle(),
				h(
					'ul',
					{
						class: `${CLASS_PREFIX}-graph`
					},
					this.renderRows()
				)
			]
		);

		// 整体
		const defaultTpl = h(
			'div',
			{
				class: [
					CLASS_PREFIX,
					{
						[`${CLASS_PREFIX}-active`]: active,
						[`${CLASS_PREFIX}-has-avatar`]: avatar
					}
				],
				attrs: {
					'aria-label': 'skeleton',
					rule: 'navigation'
				}
			},
			[this.renderAvatar(), bodyTpl]
		);

		try {
			return loading ? defaultTpl : h('span', this.$slots.default);
		} catch (e) {
			warn('component <skeleton> must contain elements');
			return null;
		}
	}
};
