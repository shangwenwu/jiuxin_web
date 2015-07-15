require('pc:base/uuiPager');
var underRepayTpl = require('pc:underRepayController/dataListTpl'),
    pagerStatus = true;
var UnderRepayController = function(){
	var t = this;
	t.htmlText = require('pc:underRepayController/wrapperTpl');
    t.init();
}

UnderRepayController.prototype = {
	init: function(){
		var t = this;
        t.el = $(t.htmlText);
        pagerStatus = true;
		$('#accountMain').html(t.el);
        t.listenFun();
        t.filter = {
            pageSize:10,
            currentPage:1,
            startTime: '',
            endTime: ''
        };
        t.listenFun();
        t.fetch();
        t.events();
        J.updateTime = function () {
            var startTime = $("#startTime").val(),
                endTime = $("#endTime").val();
            if(startTime && endTime && endTime >= startTime) {
                t.filter.startTime = startTime;
                t.filter.endTime = startTime;
                t.fetch();
            } else if(startTime && endTime && endTime < startTime) {
                J.Utils.alert({
                    content: '起始时间不能早于结束时间'
                });
            }
        }
	},

    listenFun: function(){
        var t = this;
        Transceiver.listen('userInfo','underRepay.init',function(data){
            var user = JSON.parse(data);
            t.serverTimeStamp = parseInt(user.serverTime)
            t.serverTime = J.Utils.formatTime(t.serverTimeStamp, 'Y-M-D');
        });
    },

	render: function(data){
        var t = this;
        $("#dataWrapper").html($(underRepayTpl({ moduleData : data })));
        // t.serverTimeStamp = parseInt(data.serverTime);
        // t.serverTime = J.Utils.formatTime(t.serverTimeStamp, 'Y-M-D');
        if(pagerStatus) {
            $('#underRepay_pager').uuiPager({
                currentPage: 1,
                totalPage: Math.ceil(parseInt(data.totalSize) / 10),
                pageSize: 7,
                nextPage: ">",
                prePage: "<",
                target: '#underRepay_pager',
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

    fetch: function () {
        var t =this;
        var options = {
            url: J.Api.underRepay,
            data: t.filter,
            scopt: t,
            callback: function(data) {
                t.render(data);
            },
            notLoginCallback: function () {
                require('pc:base/base64');
                Router.navigate('login/url=' + new Base64().encode('login/url=' + new Base64().encode(location.href)));
            }
        };
        J.Utils.sendAjax(options);        
    },

    updateTime: function (time) {
        var t = this;
        var start = $("#startTime"),
            end = $("#endTime");
        switch(time) {
            case "0":
                start.val('');
                end.val('');
                t.filter.startTime = '';
                t.filter.endTime = '';
                break;
            case '1': 
                var $time = J.Utils.reduceTime(t.serverTimeStamp, 0, 7);
                start.val($time);
                end.val(t.serverTime);
                t.filter.startTime = $time;
                t.filter.endTime = t.serverTime;
                break;
            case '3': 
                var $time = J.Utils.reduceTime(t.serverTimeStamp, 3, 0);
                start.val($time);
                end.val(t.serverTime);
                t.filter.startTime = $time;
                t.filter.endTime = t.serverTime;
                break;
            case '6': 
                var $time = J.Utils.reduceTime(t.serverTimeStamp, 6, 0);
                start.val($time);
                end.val(t.serverTime);
                t.filter.startTime = $time;
                t.filter.endTime = t.serverTime;
                break;
        }
    },

	events : function(){
	    var t = this;
		t.el.delegate('.time_filer li', 'click', function(e){//切换类别
            if(!$(this).hasClass('active')) {
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
                var time = $(this).attr("data-time")
                t.updateTime(time);
                pagerStatus = true;
                repayPagerStatus = true;
                t.fetch();
            }
		});
        t.el.delegate('.status_filter  li', 'click', function(e){//切换类别
            if(!$(this).hasClass('active')) {
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
                t.filter.status = $(this).attr("data-status");
                pagerStatus = true;
                repayPagerStatus = true;
                t.fetch();
            }
        });
      
	}
};

UnderRepayController.prototype.constructor = UnderRepayController;
module.exports = UnderRepayController;