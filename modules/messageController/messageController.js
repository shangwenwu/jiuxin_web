require('pc:base/uuiPager');
var messageTpl = Template(
    '<% if(moduleData.results.length > 0){ %> ' + 
        '<% $.each(moduleData.results, function(i, item) { %>'+
            '<tr class="<% if(item.status == 0){ %> noread<% } %>" data-id="<%- item.id %>">' + 
                '<td><%- item.typeName %></td>' +
                '<td><%- item.detail %></td>' +
                '<td><%- item.time %></td>' +
            '</tr>' +
        '<% }) %>' +
    '<%} else { %>' +
            '<tr><td colspan="3">暂无相关数据</td></tr>' +       
    '<% } %>'
);

var pagerStatus = true;
var MessageController = function(){
	var t = this;
	t.htmlText = 
        '<div id="MessagePageModule" class="message_page_module">' +
            '<p class="title">我的消息</p>' +
            '<table class="meassage_wrapper">' +
                '<thead>' +
                    '<tr>' +
                        '<th width="15%">项目</th>' +
                        '<th width="65%">内容</th>' +
                        '<th width="20%">时间</th>' +
                    '</tr>' +
                '</thead>' +
               ' <tbody id="message_list"><tr><td class="ui_loading" colspan="3"></td></tr></tbody>' +
            '</table>' +
            '<div class="pager_bar clear" id="messagePager"></div>' +
        '</div>';
    t.listenFun();
    t.init();
}

MessageController.prototype = {
	init: function(){
		var t = this;
        t.el = $(t.htmlText);
        pagerStatus = true;
		$('#accountMain').html(t.el);
        t.filter = {
            pageSize:10,
            status: 0,
            currentPage:1
        };
        t.fetch();
        t.events();
	},

	render: function(data){
        var t = this;
        $("#message_list").html($(messageTpl({ moduleData : data })));
        if(pagerStatus) {
            $('#messagePager').uuiPager({
                currentPage: 1,
                totalPage: data.totalPage,
                pageSize: 7,
                nextPage: ">",
                prePage: "<",
                target: '#messagePager',
                prePageClassName: "page_pre",
                nextPageClassName: "pager_next",
                currentPageClassName: "on",
                morePageClassName: "pager_more",
                normalPageClassName: "pager_normal",
                // destroy: false,
                pageChange: function(page) {
                    t.filter.currentPage = page;
                    t.fetch();
                }
            });
            pagerStatus = false;           
        }
	},

    listenFun: function(){
        var t = this;
        Transceiver.listen('userInfo','message.init', function(data){
            var user = JSON.parse(data);
            if(!user.isLogin) {
                require('pc:base/base64');
                Router.navigate('login/url=' + new Base64().encode('login/url=' + new Base64().encode(location.href)));
            }
        });
    },

    fetch: function () {
        var t =this;
        var options = {
            url: J.Api.message,
            data: t.filter,
            scopt: t,
            callback: function(data) {
                t.render(data);
            }
        };
        J.Utils.sendAjax(options);        
    },

	events : function(){
	    var t = this;
		t.el.delegate('.nav li', 'click', function(e){//切换类别
            if(!$(this).hasClass('active')) {
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
                t.filter.status = $(this).attr("data-type");
                t.filter.currentPage = 1;
                pagerStatus = true;
                t.fetch();
            }
		});

        t.el.delegate('#message_list tr', 'mouseover', function(e){//切换类别
            if($(this).hasClass('noread')) {
                var me = $(this);
                var id = me.attr("data-id");
                var options = {
                    url: J.Api.readMessage,
                    data: {
                        id: id
                    },
                    callback: function(data) {
                        me.removeClass('noread');
                    }
                };
                J.Utils.sendAjax(options);                
            }
        });

	}
};

MessageController.prototype.constructor = MessageController;
module.exports = MessageController;