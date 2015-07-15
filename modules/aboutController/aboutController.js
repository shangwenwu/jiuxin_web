var tpl = Template('<ul class="tab_list" id="tabList">' +
        '<li><a class="active" href="#">九信金融</a></li><li><a href="javascript:void(0);">股东背景</a></li><li><a href="javascript:void(0);">联系我们</a></li>' +
    '</ul>' +
    '<div class="content" id="contentModule">' +
        '<div class="jiuxin tab_item">' + 
            '<p class="title">九信金融</p>' +
            '<% $.each(moduleData.jiuxin, function(i, item) { %>'+
            	'<% if(item.subTitle){ %> <p class="sub_title"><%- item.subTitle %></p><% } %>' +
				'<% $.each(item.textList, function(j, text) { %>'+
					'<p class="text"><%- text %></p>' +
				'<% }) %>' +
            '<% }) %>' +
        '</div>' + 
        '<div class="beijing tab_item">' + 
        	'<p class="title">股东背景</p>' +
			'<% $.each(moduleData.beijing.textList, function(i, text) { %>'+
				'<p class="text"><%- text %></p>' +
			'<% }) %>' +
			'<% $.each(moduleData.beijing.tableList, function(i, item) { %>'+
				'<p class="table_desc"><%- item.desc %></p>' +
                '<table><tbody>' +
					'<% $.each(item.data, function(j, sub) { %>'+
						'<tr>' +
							'<% $.each(item.data[j], function(m, td) { %>'+
								'<td><%- td %></td>' +
							'<% }) %>' +    
						'</tr>' +
					'<% }) %>' +       	
                '</tbody></table>' +
			'<% }) %>' +			
        '</div>' +
        '<div class="contact tab_item">' + 
        	'<p class="title">联系我们</p>' +
        	'<h2>公司地址</h2>' +
			'<p class="text">地址：北京市西城区金融大街7号英蓝国际金融中心D座6层</p>' +
			'<p class="text">邮编：100033</p>' +
			'<p class="text">官方网站：www.jiuxinfinance.com</p>' +
			'<p class="text">合作邮箱：market@jiuxinfinance.com</p>' +
        	'<h2>公司地址</h2>' +
        	'<p class="text">客服热线：400-100-0099，周一至周日9:00-21:00</p>' +
        	'<p class="text">客服邮箱：jiuxin@jiuxinfinance.com</p>' +
        '</div>' +
    '</div>'
);
Router.addRules({
    'about' : function () {
        J.Controllers['about'] ? J.Controllers['about'].render() : J.Controllers['about'] = new AboutController();
    },

    'about/location=:bg' : function (type, bg) {
        var options = {location : bg};
        J.Controllers['about'] ? J.Controllers['about'].render(options) : J.Controllers['about'] = new AboutController(options);
    }
});

var jsonData = require('pc:aboutController/aboutData');

var AboutController = function(options){
	var t = this;
	t.el = $('<div id="AboutPageModule" class="about_page_module clear"></div>');
    t.init(options);
};
AboutController.prototype = {
	init: function(options){
		var t = this;
		$('#mainBody').html(t.el);
	    t.fetch(options);
	    t.events();
	    J.Common.matchRoute(location.hash);
	},

	render: function(options){
		var t = this;
		t.init(options);
	},

	fetch : function(_options){
	    var t =this;
		// var options = {
		// 	url: J.Api.about,
		// 	scopt: t,
		// 	callback: function(data) {
		// 		t.el.html($(tpl({ moduleData : data })));
		// 	    if(_options && _options.location == 'bg') {
		// 	    	$("#tabList a:eq(1)").click();
		// 	    }
		// 	}
		// };
		// J.Utils.sendAjax(options);
		t.el.html($(tpl({ moduleData : jsonData.data })));
		$("#tabList a:eq(1)").click();
	},

	events : function(){
	    var t = this;
		t.el.delegate('#tabList a', 'click', function(e){
			e.preventDefault();
			if(!$(this).hasClass('active')){
				$(this).closest('ul').find('a').removeClass('active');
				$(this).addClass('active');
				var index = $(this).parent().index();
				$("#contentModule .tab_item").hide();
				$('#contentModule .tab_item:eq(' + index +')').show();
			}
		});
	}
};

AboutController.prototype.constructor = AboutController;

module.exports = AboutController;