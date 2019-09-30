function subNav() {
	var $navLink = $('.nav-item-link'); // 一级菜单
	var $navSubLink = $('.submenu-item-link'); // 二级菜单
	var $navList = $('.nav-item-submenu'); // 二级菜单包裹
	$navLink.on('click', function (event) {
		// event.preventDefault();
		$navLink.removeClass('active');
		$navList.slideUp(300);
		$(this).addClass('active');
		var $this = $(this).next('.nav-item-submenu');
		// if($this.is(':hidden')) {
		if ($this.css('display') == "none") {
			$this.slideDown(300);
		} else {
			$this.slideUp(300);
		}
	});
	// if( $navLink.hasClass('active') ){
	// 	$navSubLink.eq(0).addClass('active');
	// }
	$navSubLink.on('click', function () {
		$navSubLink.removeClass('active');
		$(this).addClass('active');
	});
	// subnav end
}
subNav();