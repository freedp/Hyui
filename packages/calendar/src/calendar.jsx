/**
 * 作者：Hyhello
 * 时间：2020-05-21
 * 描述：日历
 */
import './calendar.scss';
import Ttable from './table';
import { CLASS_PREFIX, TEXT_MAP } from './_default';

export default {
	name: 'hyCalendar',
	components: { Ttable },
	props: {
		value: {
			type: [Date, String, Number],
			default: ''
		}
	},
	data() {
		return {
			now: new Date()
		};
	},
	methods: {
		handleTool(item) {
			console.log(item);
		}
	},
	render() {
		const { handleTool } = this;
		return (
			<div class={CLASS_PREFIX} aria-label="calendar">
				<div class={`${CLASS_PREFIX}__header`}>
					<div class={`${CLASS_PREFIX}__title`}>2020 年 5 月</div>
					{TEXT_MAP.map((item, key) => (
						<button size="mini" key={key} plain onClick={handleTool.bind(this, item)}>
							{item.label}
						</button>
					))}
				</div>
				<div class={`${CLASS_PREFIX}__body`}>
					<Ttable></Ttable>
				</div>
			</div>
		);
	}
};
