var picTpl =Template('<a href="<%-href%>" target="_blank" class="pic_item pic_<%-index%> fl" data-index="<%-index%>" style="width:<%-width%>px; background:url(<%-img%>) no-repeat center;"></a>');

var Carousel = function(){
	var t = this;

	t.el = $('<div id="carouselModule" class="carousel_module">'+
		        '<div class="pic">'+
		        '</div>'+
                '<ul class="point">'+
		        '</ul>'+
		    '</div>');
	t.pic = t.el.find('.pic');
	t.point = t.el.find('.point');
    t.intervalTime = 5000;
    t.interval = '';
    t.init();
};
Carousel.prototype = {
    init: function(){
        var t = this;
        t.fetch();
    },
    render: function(){
        var t = this;
        t.fetch(); 
	},
	fetch :function(){
        var t = this;
        J.Utils.sendAjax({
        	url:J.Api.carousel,
        	type:'get',
        	callback:function(data){
               t.slideList(data.results);
        	}
        });
	},
	slideList:function(picData){
		var t = this, picItem = '', pointItem = '' ,active = '';
		clearInterval(t.interval);
		t.number = picData.length;
		t.picItemW = document.body.clientWidth;
		t.pic.css('width', t.picItemW * 2);
		$.each(picData, function (index, item) {
			active = index ? '' : 'active';
            item.active = active;
			item.width = t.picItemW;
			item.index = index;
            picItem += picTpl(item);
            pointItem += '<li class="point_item point'+index+' fl '+active+'" data-index="'+index+'"></li>';
        });
        t.pic.html(picItem);
        t.point.html(pointItem);
        t.events();
        t.interval = setInterval(function(){
			t.animation();
		}, t.intervalTime);

	},
    animation: function(point){
        var t = this,
        uPoint = t.point.find('.active'),
        uIndex = uPoint.data('index'),
        cIndex = point ? point.data('index') : uIndex + 1 >= t.number ? 0 : uIndex + 1,
        cPoint = point ? point : t.point.find('.point'+cIndex),
        uPic = t.pic.find('.pic_'+uIndex),
        cPic = t.pic.find('.pic_'+cIndex);

        uPoint.removeClass('active');
        cPoint.addClass('active');
        uPic.css({'z-index':10});
        cPic.css({'left':t.picItemW+'px','z-index':10});
        t.pic.animate({'left': -t.picItemW+'px'}, 500, function(){
            t.pic.css('left','0px');
            cPic.css({'left':'0px'});
            uPic.css({'left':t.picItemW+'px','z-index':0});
		    point = false;
		});
    },
    events: function(){
    	var t = this;
    	t.el.delegate('.point_item','click',function(e){
            clearInterval(t.interval);
            t.animation($(this));
            t.interval = setInterval(function(){
				t.animation();
			}, t.intervalTime);
    	});
    }


};

Carousel.prototype.constructor = Carousel;

module.exports = Carousel;