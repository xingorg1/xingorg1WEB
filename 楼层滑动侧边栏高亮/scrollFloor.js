(function(window) {
    var defaults = {
        floorClass: '.scroll-floor',
        navClass: '.scroll-nav',
        activeClass: 'active',
        activeTop: 100,
        scrollTop: 100,
        delayTime: 200
    };
    var $body = $('body'),
        floorList = null,
        navList = null;

    function getItem(_list, newOptions) {
        var data = [];
        _list.each(function() {
            var item = {};
            item.$obj = $body.find(this);
            // console.log($body.find(this).scrollTop())
            console.log($body.find(this).offset().top)
            item.$activeTop = $body.find(this).offset().top - newOptions.activeTop;
            item.$scrollTop = $body.find(this).offset().top + newOptions.scrollTop;
            data.push(item);
        });
        return data;
    }

    function scrollActive(_list, newOptions) {//(navList, newOptions);scroll-nav的集合和defaults对象
        var nowScrollTop = $(window).scrollTop();
        // window的scrolltop值
        var data = getItem(floorList, newOptions);
        $.each(data, function(i, item) {
        	// console.log(_list)
        	// console.log(item.$activeTop)
            if (nowScrollTop > item.$activeTop) {
                _list.removeClass(newOptions.activeClass).eq(i).addClass(newOptions.activeClass);
            }
        });
    }

    function clickActive(_index, newOptions) {
        // console.log($body.offsetParent())
        var data = getItem(floorList, newOptions);
        // console.log(data)
        // console.log(data[_index].$scrollTop)
        $('html,body').animate({
            'scrollTop': data[_index].$scrollTop
        }, newOptions.delayTime);
    }
    var scroll_floor = window.scrollFloor = function(options) {//定义一个全局的function：scrollFloor，传入的参数是在html处的那几个
        var newOptions = $.extend({}, defaults, options);
        //$.extend()方法,合并预先设置的默认的对象参数和用户自定义的参数，将不一样的并列出来，一样的合并，就像粘贴复制一样
        // $.each()遍历数组
        floorList = $body.find(newOptions.floorClass);//一楼
        navList = $body.find(newOptions.navClass);//F1
        // 找出所有的scroll-floor和scroll-nav
        scrollActive(navList, newOptions);
        // 调方法scrollActive，并将参数传进去
        $(window).bind('scroll', function() {
        	// $.bind()方法，给元素绑定事件，给window绑定了scroll事件
            scrollActive(navList, newOptions);
        });
        navList.bind('click', function() {
            var _index = $body.find(this).index();
            clickActive(_index, newOptions);
        });
    }
})(window);