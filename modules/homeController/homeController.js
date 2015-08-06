
var Carousel = require('pc:carousel');
var NewsList = require('pc:newsList');
var InvestHome = require('pc:investHome');

Router.addRules({
    'home' : function () {
        J.Controllers['home'] ? J.Controllers['home'].render() : J.Controllers['home'] = new HomeController();
    },
    'home/source=:source' : function (type, source) {
    	$.cookie('source', source, { expires: 365, path: '/' });
        // var options = {url : url};
        J.Controllers['home'] ? J.Controllers['home'].render() : J.Controllers['home'] = new HomeController();
    }
});
var HomeController = function(){
	var t = this;

	t.el = $('<div id="homePageModule" class="home_page_module">'+
			    '<div id="carouselWrapper">'+
			    '</div>'+
			    '<div id="oneBulletin" class="one_bulletin">'+
			    '</div>'+
			    '<div class="spot_light" >'+
                    '<div class="box">'+
                        '<div class="item fl">'+
                            '<span class="icon one"></span>'+
                            '<p class="note">注册资金20亿元<br>九鼎投资独资子公司</p>'+
                        '</div>'+
                        '<div class="item fl">'+
                            '<span class="icon two"></span>'+
                            '<p class="note">独有高资质借款人<br>近300家企业提供项目源</p>'+
                        '</div>'+
                        '<div class="item fl">'+
                            '<span class="icon three"></span>'+
                            '<p class="note">100%本息保障<br>多层次立体业务及风控体系</p>'+
                        '</div>'+
                        '<div class="item fl">'+
                            '<span class="icon four"></span>'+
                            '<p class="note">年化收益率超8%<br>投资期限最低1个月</p>'+
                        '</div>'+
                    '</div>'+
			    '</div>'+
			    '<div id="investList" class="invest_list">'+
			    		
			    '</div>'+
			    '<a class="invest_more" href="#invest">查看更多</a>'+
			    '<div id="newsBulletin">'+
			    '</div>'+
		    '</div>');
	t.carouselWrapper = t.el.find('#carouselWrapper');
	t.oneBulletin = t.el.find('#oneBulletin');
	t.investList = t.el.find('#investList');
	t.newsBulletin = t.el.find('#newsBulletin');
	t.carousel = new Carousel();
	t.investHome = new InvestHome();
	t.newslist = new NewsList();
	t.init();
};
HomeController.prototype = {
	init: function(){
		var t = this;
		$('#mainBody').html(t.el);
		t.carouselWrapper.html(t.carousel.el);
		t.investList.html(t.investHome.el);
		t.newsBulletin.html(t.newslist.el);
		t.oneBulletin.html(t.newslist.oneNew);
	},
	render: function(){
		var t = this;
		t.carousel.render();
		t.investHome.render();
		t.init();
	}
};

HomeController.prototype.constructor = HomeController;

module.exports = HomeController;