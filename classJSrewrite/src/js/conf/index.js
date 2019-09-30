import { tabs } from '@pcjs/tabs';
console.log(tabs)
tabs('tabsBox', 'panel-item');

//可再添加点击事件，执行ajax请求等功能，如无ajax可省略
$('#tabsBox .tabs-ul').on('click', 'li', function () {
	console.log("ajax。")
})