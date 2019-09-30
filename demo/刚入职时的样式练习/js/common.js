$(function(){
		// treeBar
		$(".tree-items").click(function(){
			console.log("冒泡了");
			console.log($(this));//通过这个观察到不同状态的li之间的不同之处，有下拉菜单的children.length是2，反之是1
			var liWrap = $(".tree-items");
			var oLink = $(".submenu-item-link");
			var length = $(this).children().length;//获取并判断不同元素之间内部孩子的个数，没有下拉菜单的孩子是1，反之是2
			var childDiv = $(this).find(".nav-item-submenu");
			var sibilngChild = $(this).siblings().find(".nav-item-submenu");
			var siblingLink = $(this).siblings().find(oLink);
			//var sibling = oDiv.find(oLink);find方法同children当做查找其中一个子元素的时候的用法
			var oI = $(this).find(".icon-pulldown");// 添加小三角指示标
			oI.addClass("icon-pullup");
			if(length > 1){//关键点-通过元素内部children的长度length判断
				if(childDiv.is(":visible")){//关键点：通过is(":visible")判断元素是不是展开的、可见的
					childDiv.slideUp("fast");//jq的高度变化方法，让高度卷起
					childDiv.find(oLink).removeClass("cur");
					oI.removeClass("icon-pullup");
				}else{
					childDiv.slideDown("fast");//高度展开
					sibilngChild.slideUp("fast");
					siblingLink.removeClass("cur");// 点击tree-items的时候，关闭所有的oLInk的选中状态
					oLink.click(function(e){
						e = window.event || e;
						e.stopPropagation();//阻止oLInk点击后的冒泡事件，冒泡到liWrap的点击，整个父元素就关闭了。
						var grandFather = $(this).parent().parent().parent().parent(liWrap);
						var uncle = $(this).parent().siblings()
						$(this).addClass("cur")
						uncle.find(oLink).removeClass("cur");
						siblingLink.removeClass("cur");
						grandFather.addClass("active").siblings().removeClass("active");
					})
				}
			}else{
				$(this).addClass("active").siblings().removeClass("active");
				sibilngChild.slideUp("fast");
				siblingLink.removeClass("cur");
			}
		});
		

		// tab
		$(".tab-wrap li").click(function(){
			var index = $(this).index();
				$(this).addClass("cur").siblings().removeClass("cur");
				$(".tab-cont").eq(index).show().siblings(".tab-cont").hide();
		})
})
