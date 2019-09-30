/* global $ */
(function(window) {
    let $body = $('.scroll-box'),
        floorList = null,
        navList = null;
    function getItem(_list, newOptions) {
        let data = [];
        _list.each(function(i) {
            let item = {};
            item.$obj = $body.find(this);
            item.$height = $body.find(this).height();
            item.$offsetheight = $body.find(this).get(0).offsetHeight;
            item.$activeTop = $body.find(this).offset().top - newOptions.activeTop;
            data.push(item);
        });
        return data;
    }
    function scrollActive(_list, newOptions) {
        let nowScrollTop = $body.scrollTop();
        let data = getItem(floorList, newOptions);
        $.each(data, function(i, item) {
          if (item.$activeTop <= 160) {//比最后一个列表据上边的高度再大点就好
            _list.removeClass(newOptions.activeClass).eq(i).addClass(newOptions.activeClass);
          }
        });
    }
    function clickActive(_index, newOptions) {
        let data = getItem(floorList, newOptions);
        let H = 0;
        $.each(data, function(i, item) {
            if(i < _index){
                H += data[i].$offsetheight;
            }
        });
        $body.animate({
          'scrollTop': H
        }, newOptions.delayTime);
    }
    window.scrollFloor = function(options) {
        let newOptions = options;
        floorList = $body.find(newOptions.floorClass);
        navList = $('.floor-nav').find(newOptions.navClass);
        scrollActive(navList, newOptions);
        $body.scroll(function() {
          scrollActive(navList, newOptions);
        });
        navList.bind('click', function() {
            let _index = $('.floor-nav').find(this).index();
            clickActive(_index, newOptions);
        });
    };
})(window);