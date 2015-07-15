var tpl = Template('<ul class="tab_list" id="tabList">' +
        '<li><a class="active" href="#">账户安全</a></li><li><a href="javascript:void(0);">投资收益</a></li><li><a href="javascript:void(0);">充值提现</a></li><li><a href="#">注册登录</a></li>' +
    '</ul>' +
    '<div class="content" id="contentModule">' +
        '<% $.each(moduleData.list, function(i, item) { %>'+
        	'<ul class="tab_item <% if(i == 0){ %>show<% } %>">' +

        		'<% $.each(item, function(j, sub_item) { %>'+
        			'<li class="sub_question">' +
	        			'<p class="question"><%- sub_item.question %></p>' +
	        			'<ul class="text_list">' +
		        			'<% $.each(sub_item.answer, function(k, text) { %>'+
		        				'<li class="text"><%- text %></li>' +
		        			'<% }) %>' +
						'</ul>' +
					'</li>' +
        		'<% }) %>' +
        	'</ul>' +
        '<% }) %>' +
    '</div>'
);

var tableTpl = Template(
    '<table><tbody>' +
	'<% $.each(moduleData, function(i, item) { %>'+
		'<tr>' +
			'<% $.each(item, function(m, td) { %>'+
				'<td><%- td %></td>' +
			'<% }) %>' +    
		'</tr>' +
	'<% }) %>' +       	
	'</tbody></table>'
);

Router.addRules({
    'help' : function () {
        J.Controllers['help'] ? J.Controllers['help'].render() : J.Controllers['help'] = new HelpController();
    }
});
var HelpController = function(){
	var t = this;

	t.html = '<div id="helpPageModule" class="help_page_module clear"></div>';
    t.init();
};
HelpController.prototype = {
	init: function(){
		var t = this;
		t.el = $(t.html);
		$('#mainBody').html(t.el);
    	t.events();
    	t.fetch();
	},
	render: function(){
		var t = this;
		t.init();
	},

	fetch : function(){
	    var t =this;
	 //    $.ajax({
		//     url: J.Api.help,
		// 	type: 'post',
		// 	dataType:'json',
		// 	success: function(data){
		// 	    // if(res.success){
		// 		    // t.modeData = res.result;
			var data = require('pc:helpController/helpData');
			$(tpl({ moduleData : data })).appendTo(t.el);
			var target = t.el.find('.text_list:last');
			$(tableTpl({ moduleData : data.browers })).appendTo(target);
		// 	}
		// })
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
		t.el.delegate('.tab_item .question', 'click', function(e){
			e.preventDefault();
			if($(this).hasClass('current')){
				$(this).siblings('.text_list').hide();
				$(this).removeClass('current')
			} else {
				$(this).closest('.tab_item').find('.question').removeClass('current');
				$(this).closest('.tab_item').find('.text_list').hide();
				$(this).siblings('.text_list').show();
				$(this).addClass('current');
			}
		});
	}
};

HelpController.prototype.constructor = HelpController;

module.exports = HelpController;