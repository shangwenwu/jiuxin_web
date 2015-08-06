Router.addRules({
    'guide' : function () {
        J.Controllers['guide'] ? J.Controllers['guide'].render() : J.Controllers['guide'] = new GuideController();
    }
});

var GuideController = function(options){
	var t = this;
	this.url = options && options.url || '';
    var img1 = __inline('images/guide-header.png');
	t.el = $('<div id="guidePageModule" class="guide_page_module">'+
        '<div class="guide_header"><img src="' + img1 + '" alt="" /></div>' +
        '<div class="section_white">' +
            '<div class="desc_wrapper wrapper">' +
                '<h2 class="title">九信金融简介</h2>' +
                '<p class="text">九信金融系新三板上市公司九鼎投资的全资子公司，属于国内首家私募系互联网金融平台。九鼎投资为“中国PE第一股”，净资产超过110亿元，总市值超1000亿元。九信金融将依托大股东雄厚的资金支持、独有的优质底层金融资产、立体的业务及风控体系打造一个不同于传统模式的P2P平台，为投资人提供安全、稳健的理财产品和专业、多元的金融服务。</p>' +
            '</div>' + 
        '</div>' +
        '<div class="section_gray">' +
            '<div class="patten_wrapper wrapper">' +
                '<h2 class="title">为什么选择九信金融</h2>' +
                '<ul class="goodness clear">' +
                    '<li class="right83">' +
                        '<div class="guide_icon1"></div>' +
                        '<p>本息全额保障、优质资产担保、顶级私募风控</p>' +
                    '</li>' +
                   ' <li class="left83">' + 
                        '<div class="guide_icon2"></div>' +
                        '<p>来源九鼎投资及其投资的上市及拟上市公司</p>' +
                   ' </li>' +
                    '<li class="right83 "> '+
                        '<div class="guide_icon3"></div>' +
                       ' <p>谁说私募是高门槛？</br>在九信，1000元即可投！</p>' +
                    '</li>'  +
                    '<li class="left83">' +
                        '<div class="guide_icon4"></div>' +
                        '<p>年化收益 8% 以上，</br>期限最低 1 个月</p>' +
                    '</li>' +
                '</ul>' +
                '<h3>九信金融模式</h3>' +
                '<p class="text">借款人在九信金融平台发布融资需求，并质押足额金融资产给九鼎投资，以保证到期还本付息。投资人通过平台出借资金，九鼎投资提供100%本息安全保障。募资完成后，资金将从投资人托管帐户直接向借款人托管账户划转。</p>' +
                '<div class="invest-patten"></div>' +
            '</div>' +               
        '</div>' +
        '<div class="section_white">' +
            '<div class="invest_wrapper wrapper">' +
                '<h2 class="title">如何投资？</h2>' +
                '<div class="invest-step"></div>' +
                '<div class="invest-money-icon"></div>' +
                '<h3>现在注册 完成首笔投资</br>即送50元＋最高1%本金红包</h3>' +
                '<a class="to_register" href="#register">立即注册</a>' +
            '</div>' +               
        '</div>' +
	'</div>');
    t.init();
};
GuideController.prototype = {
	init: function(){
		var t = this;
		$('#mainBody').html(t.el);
        J.Common.matchRoute(location.hash);
	},
	render: function(){
		var t = this;
		t.init();

	}
};

GuideController.prototype.constructor = GuideController;

module.exports = GuideController;