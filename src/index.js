/**
 * 作者：Hyhello
 * 时间：2019-07-13
 * 描述：初始化
 */

import '@/style/common.scss';
import Tag from 'pkg/tag/index';
import Rate from 'pkg/rate/index';
import Card from 'pkg/card/index';
import Icon from 'pkg/icon/index';
import Affix from 'pkg/affix/index';
import Avatar from 'pkg/avatar/index';
import Button from 'pkg/button/index';
import Switch from 'pkg/switch/index';
import Calendar from 'pkg/calendar/index';
import Skeleton from 'pkg/skeleton/index';
import LoadingBar from 'pkg/loadingBar/index';
import { Breadcrumb, BreadcrumbItem } from 'pkg/breadcrumb/index';
import { _extend } from './utils/utils';
import _default from './_default';

// 插件集合
const plugins = [LoadingBar];

// 组件集合
const components = [
	Tag,
	Icon,
	Rate,
	Card,
	Affix,
	Avatar,
	Button,
	Switch,
	Calendar,
	Skeleton,
	Breadcrumb,
	BreadcrumbItem
];

const install = function(Vue, options = {}) {
	if (install.installed) return;
	install.installed = true;
	components.forEach(item => {
		Vue.component(item.name, item);
	});

	// 插件
	Vue.prototype.$loadingBar = LoadingBar;

	// 配置项
	Vue.prototype.$HYUI = _extend(_default, options);
};

// window 部分
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	v: '__VERSION__',
	install,
	...plugins,
	...components
};
