/**
 * 作者：Hyhello
 * 时间：2019-07-13
 * 描述：初始化
 */

import Icon from 'pkg/icon/index';
import Affix from 'pkg/affix/index';
import Avatar from 'pkg/avatar/index';
import Button from 'pkg/button/index';
import Skeleton from 'pkg/skeleton/index';
import { Breadcrumb, BreadcrumbItem } from 'pkg/breadcrumb/index';

// 组件集合
const components = [Icon, Affix, Avatar, Button, Skeleton, Breadcrumb, BreadcrumbItem];

const install = function(Vue) {
	if (install.installed) return;
	install.installed = true;
	components.forEach(item => {
		Vue.component(item.name, item);
	});
};

// window 部分
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install,
	...components
};
