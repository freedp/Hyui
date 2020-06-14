/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：loadingBar
 */
import './loadingBar.scss';
import { warn } from '@/utils/debug';
import { _typeof } from '@/utils/utils';

const CLASS_PREFIX = 'hy-loadingbar';

const _DEFAULT = {
	spinner: true
};

export default {
	name: 'hyLoadingBar',
	data() {
		return {
			color: '',
			percent: 0, // 0 ~ 1
			isAppend: false,
			visible: false,
			started: false,
			status: '',
			autoIncrement: true
		};
	},
	methods: {
		_inc() {
			const { percent } = this;
			let rnd = 0;
			if (percent >= 0 && percent < 0.25) {
				rnd = (Math.random() * 3 + 3) / 100;
			} else if (percent >= 0.25 && percent < 0.65) {
				rnd = (Math.random() * 3) / 100;
			} else if (percent >= 0.65 && percent < 0.9) {
				rnd = (Math.random() * 2) / 100;
			} else if (percent >= 0.9 && percent < 0.99) {
				rnd = 0.005;
			} else {
				rnd = 0;
			}
			this._set(percent + rnd);
		},
		_set(n) {
			if (!this.started) return;
			if (this.percent >= 1) return this.closed();
			this.percent = n;
			if (this.autoIncrement) {
				window.clearTimeout(this.timer);
				this.timer = window.setTimeout(this._inc, 250);
			}
		},
		append() {
			if (!this.isAppend) {
				document.body.appendChild(this.$el);
				this.isAppend = true;
			}
		},
		start() {
			if (this.started) return;
			this.append();
			this.started = true;
			this.visible = true;
			this._set(0);
		},
		update(n) {
			if (_typeof(n) !== 'number') return warn('plugin <$LoadingBar> methods update arguments muse be a number');
			if (!this.started) {
				this.append();
				this.started = true;
				this.visible = true;
			}
			this.autoIncrement = false;
			this._set(n);
		},
		complete() {
			if (this.status) return;
			this._set(1);
			this.status = 'complete';
		},
		error() {
			if (!this.started || this.status) return;
			this.color = 'red';
			this._set(1);
			this.status = 'error';
		},
		closed() {
			window.clearTimeout(this.completeTimer);
			window.completeTimer = window.setTimeout(() => {
				this.visible = false;
			}, 500);
		},
		afterLeave() {
			this.color = '';
			this.percent = 0;
			this.status = '';
			this.started = false;
			this.autoIncrement = true;
		}
	},
	beforeDestroy() {
		document.body.removeChild(this.$el);
	},
	render() {
		const list = [];
		const { color, percent, visible, afterLeave } = this;
		list.push(
			<div class={[`${CLASS_PREFIX}-main`]}>
				<div class={[`${CLASS_PREFIX}-main__inner`]} style={{ width: `${percent * 100}%` }}>
					<div class={[`${CLASS_PREFIX}-main__peg`]}></div>
				</div>
			</div>
		);

		// <div id="loading-bar-spinner"></div>
		if (_DEFAULT.spinner) {
			list.push(<div class={[`${CLASS_PREFIX}-spinner`]}></div>);
		}

		return (
			<transition name="fade" onAfterLeave={afterLeave}>
				<div
					class={CLASS_PREFIX}
					tab-index="-1"
					rule="loading-bar"
					style={{ color }}
					{...{
						directives: [
							{
								name: 'show',
								value: visible
							}
						]
					}}
				>
					{...list}
				</div>
			</transition>
		);
	}
};
