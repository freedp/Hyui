/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：switch
 */

import './switch.scss';
import { warn } from '@/utils/debug';
import { isFunction, isPromise, oneOf } from '@/utils/utils';

const CLASS_PREFIX = 'hy-switch';

const _DEFAULT = {
	position: ['outside', 'inside'],
	size: ['large', 'medium', 'small'],
	activeColor: '#2d8cf0',
	inactiveColor: '#cccccc'
};

export default {
	name: 'hySwitch',
	props: {
		value: {
			type: [Boolean, String, Number],
			default: false
		},
		// 文字展现位置
		position: {
			type: [String],
			default: 'outside',
			validator(val) {
				return oneOf(val, _DEFAULT.position);
			}
		},
		size: {
			type: [String],
			default: 'large',
			validator(val) {
				return oneOf(val, _DEFAULT.size);
			}
		},
		disabled: {
			type: [Boolean],
			default: false
		},
		activeValue: {
			type: [Boolean, String, Number],
			default: true
		},
		inactiveValue: {
			type: [Boolean, String, Number],
			default: false
		},
		activeText: {
			type: [String],
			default: ''
		},
		inactiveText: {
			type: [String],
			default: ''
		},
		activeColor: {
			type: [String],
			default: ''
		},
		inactiveColor: {
			type: [String],
			default: ''
		},
		beforeChange: [Function] // 返回promise
	},
	data() {
		return {
			loading: false
		};
	},
	computed: {
		classes() {
			const list = [CLASS_PREFIX];
			const { size, disabled, loading, currentValue, activeValue } = this;
			if (size) {
				list.push(`${CLASS_PREFIX}--${size}`);
			}
			if (disabled) {
				list.push('is-disabled');
			}
			if (loading) {
				list.push('is-loading');
			}
			if (currentValue === activeValue) {
				list.push('is-checked');
			}
			return list;
		},
		styles() {
			const { activeColor, inactiveColor, currentValue, activeValue } = this;
			return {
				color:
					currentValue === activeValue
						? activeColor || _DEFAULT.activeColor
						: inactiveColor || _DEFAULT.inactiveColor
			};
		},
		currentValue: {
			set(val) {
				this.$emit('input', val);
				this.$emit('change', val);
			},
			get() {
				return this.value;
			}
		}
	},
	methods: {
		next(val) {
			const { activeValue, inactiveValue } = this;
			this.currentValue = val || (this.currentValue === activeValue ? inactiveValue : activeValue);
		},
		toggleChange(val) {
			const { next, loading, disabled, position, activeValue, inactiveValue, currentValue, beforeChange } = this;
			if (disabled || loading) return;
			if (val && position === 'inside') {
				val = val === inactiveValue ? activeValue : inactiveValue;
			}
			if (val && currentValue === val) return;
			this.loading = true;
			if (beforeChange && isFunction(beforeChange)) {
				const pro = beforeChange();
				if (!isPromise(pro)) return warn('component <hy-switch> props [before-change] return is not Promise');
				pro.then(() => {
					next(val);
				}).finally(() => {
					this.loading = false;
				});
			} else {
				next(val);
				this.loading = false;
			}
		}
	},
	render() {
		const { classes, styles, disabled, position, currentValue, activeValue, inactiveValue } = this;
		const checked = currentValue === activeValue;
		const renderCheckBox = (
			<input type="hidden" disabled={disabled} value={String(checked)} class={[`${CLASS_PREFIX}__input`]} />
		);

		const renderBody = () => {
			const list = [];
			const { activeText, toggleChange, inactiveText } = this;
			const { active, inactive } = this.$slots;
			list.push(
				<span
					class={[`${CLASS_PREFIX}__inner`]}
					style={styles}
					onClick={toggleChange.bind(this, undefined)}
				></span>
			);
			if (inactiveText && (position === 'outside' || (position === 'inside' && !checked))) {
				const method = position === 'inside' ? 'push' : 'unshift';
				list[method](
					<span class={[`${CLASS_PREFIX}__text is-left`]} onClick={toggleChange.bind(this, inactiveValue)}>
						{inactive || <span>{inactiveText}</span>}
					</span>
				);
			}
			if (activeText && (position === 'outside' || (position === 'inside' && checked))) {
				list.push(
					<span class={[`${CLASS_PREFIX}__text is-right`]} onClick={toggleChange.bind(this, activeValue)}>
						{active || <span>{activeText}</span>}
					</span>
				);
			}
			return list;
		};

		return (
			<span
				class={classes}
				tab-index="-1"
				rule="switch"
				aria-label="switch"
				aria-checked={String(checked)}
				aria-position={position}
			>
				{renderCheckBox}
				{...renderBody()}
			</span>
		);
	}
};
