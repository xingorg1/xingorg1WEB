(function(window) {
    // var defaults = {
    //     floorClass: '.scroll-floor',
    //     navClass: '.scroll-nav',
    //     activeClass: 'active',
    //     activeTop: 100,
    //     scrollTop: 100,
    //     delayTime: 200
    // };
    var $body = $('.parent-box'),
        floorList = null,
        navList = null;

    function getItem(_list, newOptions) {
        var data = [];
        _list.each(function() {
            var item = {};
            item.$obj = $body.find(this);
            item.$height = $body.find(this).height();//点击的时候利用height相加，可能因为触发滚动事件导致问题
            // 可以用点击的时候获取下标，将对应下标内容的offsetTop设置成0 
            item.$activeTop = $body.find(this).offset().top - newOptions.activeTop;
            item.$scrollTop = $body.find(this).offset().top;// + newOptions.scrollTop;
            data.push(item);
        });
        return data;
    }

    function scrollActive(_list, newOptions) {
        var nowScrollTop = $body.scrollTop();
        var data = getItem(floorList, newOptions);
        $.each(data, function(i, item) {
            if (item.$activeTop <= 180) {
                _list.removeClass(newOptions.activeClass).eq(i).addClass(newOptions.activeClass);
            }
        });
    }
    function clickActive(_index, newOptions) {
        var data = getItem(floorList, newOptions);
        var H = 0;
        $.each(data, function(i, item) {
            if(i < _index){
                H += data[i].$height;
            }
        });
        $body.animate({
          'scrollTop': H
        }, newOptions.delayTime);
    }
    var scroll_floor = window.scrollFloor = function(options) {
        var newOptions = options;
        floorList = $body.find(newOptions.floorClass);
        navList = $('.floor-nav').find(newOptions.navClass);
        scrollActive(navList, newOptions);
        $body.bind('scroll', function() {
            scrollActive(navList, newOptions);
        });
        navList.bind('click', function() {
            var _index = $('.floor-nav').find(this).index();
            // $(this).addClass(newOptions.activeClass).siblings('.scroll-nav').removeClass(newOptions.activeClass);
            clickActive(_index, newOptions);
        });
    }
})(window);
/*$(function(){
    // 一个数据存放所有楼层的距离顶部的高度（-也可以减去父元素据顶部的高度）
    // 侧边栏点击的时候，获取索引按下标查找arr，把高度再还给fllor楼层
    // 滚动的时候，实时监控滚动的位置，如果大于楼层的高度就让左边的侧边栏高亮
    let arr = [],
        $floor = $('.scroll-floor');
    console.log($floor)
    for (var i = 0; i < arr.length; i++) {
        arr[i]
    }
})*/