require('pc:base/uuiPager');
var projectTpl = require('pc:projectController/dataListTpl'),
    repayRecordTpl = require('pc:projectController/recordListTpl'),
    loadingImg = __inline('images/loading.gif');
// var WdatePicker = require('pc:datePicker/WdatePicker');


var pagerStatus = true, repayPagerStatus = true;
var ProjectController = function(){
	var t = this;
	t.htmlText = require('pc:projectController/wrapperTpl');
    t.init();
}

ProjectController.prototype = {
	init: function(){
		var t = this;
        t.el = $(t.htmlText);
        pagerStatus = true;
        repayPagerStatus = true;
		$('#accountMain').html(t.el);
        $("#projectWrapper").html('<div class="ui_loading"></div>');
        t.filter = {
            pageSize:10,
            status: 0,
            currentPage:1,
            startTime: '',
            endTime: ''
        };
        t.repayFilter = {
            pageSize:10,
            currentPage:1
        };
        t.listenFun();        
        t.fetch();
        t.events();
        J.checkTime = function () {
            var startTime = $("#startTime").val(),
                endTime = $("#endTime").val();
            if(startTime && endTime && endTime >= startTime) {
                t.filter.startTime = startTime;
                t.filter.endTime = endTime;
                t.fetch();
            } else if(startTime && endTime && endTime < startTime) {
                J.Utils.alert({
                    content: '起始时间不能早于结束时间'
                });
            }
        }
	},

	render: function(data){
        var t = this;
        $("#projectWrapper").html($(projectTpl({ moduleData : data })));
        if(data.totalSize <= 10) {
            $("#project_pager").empty();
            pagerStatus = true;    
        } else if(pagerStatus) {
            $('#project_pager').uuiPager({
                currentPage: 1,
                totalPage: Math.ceil(parseInt(data.totalSize) / 10),
                pageSize: 7,
                nextPage: ">",
                prePage: "<",
                target: '#project_pager',
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

    renderRepayRecord: function (data) {
        var t = this;
        $("#repayRecordWrapper").html($(repayRecordTpl({ moduleData : data })));
        if(data.totalSize <= 10) {
            $("#repay_record_pager").empty();
            repayPagerStatus = true;
        } else if(repayPagerStatus) {
            $('#repay_record_pager').uuiPager({
                currentPage: 1,
                totalPage: Math.ceil(parseInt(data.totalSize) / 10),
                pageSize: 5,
                nextPage: ">",
                prePage: "<",
                target: '#repay_record_pager',
                prePageClassName: "page_pre",
                nextPageClassName: "pager_next",
                currentPageClassName: "on",
                morePageClassName: "pager_more",
                normalPageClassName: "pager_normal",
                // destroy: false,
                pageChange: function(page) {
                    t.repayFilter.currentPage = page;
                    t.repayFetch();
                }
            });
            repayPagerStatus = false;        
        }
    },


    fetch: function () {
        var t =this;
        var options = {
            url: J.Api.project,
            data: t.filter,
            scopt: t,
            callback: function(data) {
                $('.repay_recordlist_wrapper').hide();
                t.render(data);
            }
        };
        J.Utils.sendAjax(options);        
    },

    repayFetch: function () {
        var t = this;
        var options = {
            url: J.Api.repayRecord,
            data: t.repayFilter,
            callback: function(data) {
                t.renderRepayRecord(data);
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

    listenFun: function(){
        var t = this;
        Transceiver.listen('userInfo','project.init',function(data){
            var user = JSON.parse(data);
            t.serverTimeStamp = parseInt(user.serverTime)
            t.serverTime = J.Utils.formatTime(t.serverTimeStamp, 'Y-M-D');
        });
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
                t.filter.currentPage = 1;
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
                t.filter.currentPage = 1;
                t.fetch();
            }
        });

        t.el.delegate('.repay_record', 'click', function(e){//关闭弹窗
            e.preventDefault();
            $('.meassage_wrapper_data').css("margin-bottom", 0);
            t.repayFilter.id = $(this).data("id");
            repayPagerStatus = true;
            t.repayFetch()
            $("#repayRecordWrapper").html('<tr><td colspan="6"><img src="' + loadingImg + '" alt="" /></td></tr>');
            $('.repay_recordlist_wrapper').css('top', $(this).offset().top - 90).show();
            $(this).closest('.meassage_wrapper_data').css("margin-bottom", $(".repay_recordlist_wrapper").height() + 70)
            // console.log($(this).offset())
        });

        t.el.delegate('.close_recordlist_wrapper', 'click', function(e){//关闭弹窗
            e.preventDefault();
            $('.repay_recordlist_wrapper').hide();
            $('.meassage_wrapper_data').css("margin-bottom", 0);
        });
	}
};

ProjectController.prototype.constructor = ProjectController;
module.exports = ProjectController;