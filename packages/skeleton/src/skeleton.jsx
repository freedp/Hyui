/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：骨架屏
 */
import './skeleton.scss';
import { _typeof, isArray, isPrimitive, maybeAddPx, oneOf } from '@/utils/utils';
import hyAvatar from '../../avatar';

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
	},
	shape: ['circle', 'square'],
	size: ['large', 'medium', 'small']
};

export default {
	name: 'hySkeleton',
	components: { hyAvatar },
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
		rows() {
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
			return [];
		},
		avatarProp() {
			const { avatar } = this;
			if (_typeof(avatar) === 'boolean') {
				return _DEFALUT.avatar;
			}
			if (_typeof(avatar) === 'object') {
				const size = 'size' in avatar && oneOf(avatar.size, _DEFALUT.size) ? avatar.size : _DEFALUT.avatar.size;
				const shape =
					'shape' in avatar && oneOf(avatar.shape, _DEFALUT.shape) ? avatar.shape : _DEFALUT.avatar.shape;
				return {
					size,
					shape
				};
			}
			return {};
		},
		titleProp() {
			return _typeof(this.title) === 'boolean' ? _DEFALUT.titleWidth : maybeAddPx(this.title || 'auto');
		}
	},
	render() {
		const { active, avatar, loading, rows, title, titleProp, avatarProp } = this;
		// body
		const bodyTpl = (
			<div class={[`${CLASS_PREFIX}-content`]}>
				{title ? <h3 class={[`${CLASS_PREFIX}-title`]} style={{ width: titleProp }}></h3> : null}
				<ul class={[`${CLASS_PREFIX}-graph`]}>
					{rows.map((row, key) => (
						<li key={key} style={{ width: maybeAddPx(row || 'auto') }}></li>
					))}
				</ul>
			</div>
		);

		// 整体
		const defaultTpl = (
			<div
				class={[
					CLASS_PREFIX,
					{
						[`${CLASS_PREFIX}-active`]: active,
						[`${CLASS_PREFIX}-has-avatar`]: avatar
					}
				]}
				tab-index="-1"
				aria-label="skeleton"
				rule="navigation"
			>
				{avatar ? (
					<div class={[`${CLASS_PREFIX}-header`]}>
						<hy-avatar
							class={[`${CLASS_PREFIX}-avatar`]}
							size={avatarProp.size}
							shape={avatarProp.shape}
						></hy-avatar>
					</div>
				) : null}
				{bodyTpl}
			</div>
		);

		try {
			return loading ? defaultTpl : <span>{this.$slots.default}</span>;
		} catch (e) {
			return null;
		}
	}
};
