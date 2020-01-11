/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：骨架屏
 */
import './skeleton.scss';
import {
	_typeof,
	isArray,
	isPrimitive,
	maybeAddPx,
	oneOf
} from '@/utils/utils';
import { warn } from '@/utils/debug';

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

const SHAPE = ['circle', 'square'];

const SIZE = ['large', 'small'];

export default {
	name: 'Skeleton',
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
			if (_typeof(this.graph) === 'boolean') {
				return this.graph ? ['', '', _DEFALUT.graph.width] : [];
			}
			if (_typeof(this.graph) === 'object') {
				const rows =
					'rows' in this.graph &&
					_typeof(this.graph.rows) === 'number' &&
					this.graph.rows > 0
						? this.graph.rows
						: _DEFALUT.graph.rows;
				let width = [];
				if (isPrimitive(this.graph.width)) {
					width = [this.graph.width || _DEFALUT.graph.width];
				} else {
					width = isArray(this.graph.width)
						? this.graph.width
						: [_DEFALUT.graph.width];
				}
				width.reverse();
				width.length = rows;
				return width.reverse();
			}
		},
		avatarProp() {
			if (_typeof(this.avatar) === 'boolean') {
				return _DEFALUT.avatar;
			}
			if (_typeof(this.avatar) === 'object') {
				const size =
					'size' in this.avatar && oneOf(this.avatar.size, SIZE)
						? this.avatar.size
						: _DEFALUT.avatar.size;
				const shape =
					'shape' in this.avatar && oneOf(this.avatar.shape, SHAPE)
						? this.avatar.shape
						: _DEFALUT.avatar.shape;
				return {
					size,
					shape
				};
			}
		},
		titleProp() {
			return _typeof(this.title) === 'boolean'
				? _DEFALUT.titleWidth
				: maybeAddPx(this.title || 'auto');
		}
	},
	render(h) {
		// 头像
		const avatars = [];
		if (this.avatar) {
			avatars.push(
				h(
					'div',
					{
						class: 'hy-skeleton-header'
					},
					[
						h('span', {
							class: [
								'hy-skeleton-avatar',
								`hy-skeleton-avatar--${this.avatarProp.size}`,
								`hy-skeleton-avatar--${this.avatarProp.shape}`
							]
						})
					]
				)
			);
		}

		// title
		const titles = [];
		if (this.title) {
			titles.push(
				h('h3', {
					class: 'hy-skeleton-title',
					style: {
						width: this.titleProp
					}
				})
			);
		}
		// graph
		const rows = [];
		for (let i = 0; i < this.rowProp.length; i++) {
			rows.push(
				h('li', {
					style: {
						width: maybeAddPx(this.rowProp[i] || 'auto')
					}
				})
			);
		}

		// body
		const bodyTpl = h(
			'div',
			{
				class: 'hy-skeleton-content'
			},
			[
				titles,
				h(
					'ul',
					{
						class: 'hy-skeleton-graph'
					},
					rows
				)
			]
		);

		// 整体
		const defaultTpl = h(
			'div',
			{
				class: [
					'hy-skeleton',
					{
						'hy-skeleton-active': this.active,
						'hy-skeleton-has-avatar': this.avatar
					}
				],
				attrs: {
					'aria-label': 'skeleton',
					rule: 'navigation'
				}
			},
			[avatars, bodyTpl]
		);

		try {
			return this.loading ? defaultTpl : h('span', this.$slots.default);
		} catch (e) {
			warn('component <skeleton> must contain elements');
			return null;
		}
	}
};
