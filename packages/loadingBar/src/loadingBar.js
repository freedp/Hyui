/**
 * 作者：Hyhello
 * 时间：2019-10-07
 * 描述：loadingBar
 */
import Vue from 'vue';
import LoadingBarTpl from './loadingBarTpl';

const TransfrLoading = Vue.extend(LoadingBarTpl);

// 实体
const instance = new TransfrLoading({
	data: {}
}).$mount();

export default {
	start: instance.start,
	complete: instance.complete,
	error: instance.error,
	update: instance.update
};
