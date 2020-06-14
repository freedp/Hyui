/**
 * @flow
 * 作者：Hyhello
 * 时间：2020-05-21
 * 描述：表格部分
 */
import { rangeArr, getDaysByMonth, getFirstDayByMonth, getPrevMonthLastDays } from '@/utils/date';
import { ROW_SPAN, THEADER, CLASS_PREFIX } from './_default';

const _slice = [].slice;

export default {
	name: 'Ttable',
	data() {
		return {
			currentDate: new Date()
		};
	},
	methods: {
		toNestedArr(days) {
			const { cols, nums } = this;
			return rangeArr(nums / cols).map((_, i) => {
				return _slice.call(days, i * cols, (i + 1) * cols);
			});
		},
		setCellStyle(item) {
			const list = [item.type];
			if (item.type === 'current') {
				list.push('is-today');
			}
			return list;
		},
		handleChoose(item) {
			console.log(item);
		}
	},
	computed: {
		cols() {
			return THEADER.length;
		},
		nums() {
			const { cols } = this;
			return ROW_SPAN * cols;
		},
		firstDayOfMonth() {
			const { currentDate } = this;
			return getFirstDayByMonth(currentDate);
		},
		days() {
			const { nums, currentDate, firstDayOfMonth, toNestedArr } = this;
			const lastMonthDays = getPrevMonthLastDays(currentDate, firstDayOfMonth).map(day => {
				return {
					type: 'prev',
					value: day
				};
			});
			const nowMonthDays = getDaysByMonth(currentDate).map(day => {
				return {
					type: 'current',
					value: day
				};
			});
			const nextMonthDays = rangeArr(nums - lastMonthDays.length - nowMonthDays.length).map((_, i) => {
				return {
					type: 'next',
					value: i + 1
				};
			});
			return toNestedArr([...lastMonthDays, ...nowMonthDays, ...nextMonthDays]);
		}
	},
	render() {
		const { days, handleChoose, setCellStyle } = this;
		const thead = (
			<thead>
				{THEADER.map((day, key) => (
					<th key={key}>{day}</th>
				))}
			</thead>
		);
		return (
			<table cellspacing="0" cellpadding="0" class={`${CLASS_PREFIX}-table`}>
				{thead}
				<tbody>
					{days.map((day, n) => (
						<tr key={n} class={`${CLASS_PREFIX}-table__row`}>
							{day.map((cell, m) => (
								<td key={m} class={setCellStyle(cell)}>
									<div class={`${CLASS_PREFIX}-day`} onClick={handleChoose.bind(this, cell)}>
										{cell.value}
									</div>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	}
};
