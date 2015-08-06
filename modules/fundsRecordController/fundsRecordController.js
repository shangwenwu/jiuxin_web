require('pc:base/dropdown');

var inquiryTpl = Template(
    '<p class="inquiry_type box">'+
        '<% if (record == "amount"){%>'+
            '<label>交易类型：</label>'+
            '<span id="selectType" class="select_type"></span>'+
        '<%} else{ %>'+
            '<label>交易状态：</label>'+
            '<span class="inquiry_type_item sel" data-index="0">不限</span>'+
            '<span class="inquiry_type_item" data-index="1">成功</span>'+
            '<span class="inquiry_type_item" data-index="2">失败</span>'+
            '<span class="inquiry_type_item" data-index="3">处理中</span>'+
            '<% if (record == "recharge"){%>'+
                '<span class="inquiry_type_item" data-index="4">取消</span>'+
            '<% } %>'+
        '<% } %>'+
    '</p>'+
    '<p class="inquiry_time box">'+
        '<label>交易时间：</label>'+
        '<span class="inquiry_time_item sel" data-index="0">全部</span>'+
        '<span class="inquiry_time_item" data-index="0.5">近7日</span>'+
        '<span class="inquiry_time_item" data-index="1">1个月内</span>'+
        '<span class="inquiry_time_item" data-index="3">3个月内</span>'+
        '<span class="inquiry_time_item" data-index="6">6个月内</span>'+
        '<span class="time_wrapper">' +
            '<span class="fl">止</span>' +
            '<input class="fl" type="text" id="endTime" onclick="WdatePicker({onpicked: J.filterTime})"></input>' +
        '</span> '+
        '<span class="time_wrapper">' +
            '<span class="fl">起</span>' +
            '<input class="fl" type="text" id="startTime" onclick="WdatePicker({onpicked: J.filterTime})"></input>' +
        '</span>' +
    '</p>'
);

var FundsRecordController = function(record){
	var t = this;
	t.el = $('<div id="fundsRecordModule" class="funds_record_module">'+
                '<h1 class="hd">资金记录</h1>'+
		        '<div class="tap_head">'+
                    '<span class="tap_item fl amount" data-href="amount">资金记录</span>'+
                    '<span class="tap_item fl recharge" data-href="recharge">充值记录</span>'+
                    '<span class="tap_item fl withdraw" data-href="withdraw">提现记录</span>'+
                '</div>'+
                '<div class="inquiry_box">'+
                    
                '</div>'+
                '<div id="tableBox" class="table_box"></div>'+
                '<div class="pager_bar clear" id="messagePager"></div>' +
		    '</div>');
    t.inquiryBox = t.el.find('.inquiry_box');
    t.tapHead = t.el.find('.tap_head');
    t.tableBox = t.el.find('#tableBox');
    t.render(record);
    t.listenFun();
    J.filterTime = function () {
        var startTime = $("#startTime").val(),
            endTime = $("#endTime").val();
        if(startTime && endTime && endTime >= startTime) {
            t.grid.sendData.startTime = startTime;
            t.grid.sendData.endTime = endTime;
            t.pagerStatus = true;
            t.fetchTable();
        } else if(startTime && endTime && endTime < startTime) {
            J.Utils.alert({
                content: '起始时间不能早于结束时间'
            });
        }
    }
};
FundsRecordController.prototype = {
    render: function(record){
        var t = this;
        t.record = record || 'amount';
        t.tapHead.find('.on').removeClass('on');
        t.tapHead.find('.'+t.record).addClass('on');
        $('#accountMain').html(t.el);
        t.inquiryBox.html(inquiryTpl({record:t.record}));
        (t.record == 'amount') && t.fetchSelect();
        t.events();
        t.pagerStatus = true;
        t.configTable();
        t.fetchTable();
    },
    listenFun: function(){
        var t = this;
        Transceiver.listen('userInfo','fundsRecord.init',function(data){
            var user = JSON.parse(data);
            t.serverTimeStamp = parseInt(user.serverTime)
            t.serverTime = J.Utils.formatTime(t.serverTimeStamp, 'Y-M-D');
        });
    },
    updateTime: function (time) {
        var t = this;
        var start = $("#startTime"),
            end = $("#endTime");
        switch(time) {
            case 0:
                start.val('');
                end.val('');
                t.grid.sendData.startTime = '';
                t.grid.sendData.endTime = '';
                break;
            case 0.5: 
                var $time = J.Utils.reduceTime(t.serverTimeStamp, 0, 7);
                start.val($time);
                end.val(t.serverTime);
                t.grid.sendData.startTime = $time;
                t.grid.sendData.endTime = t.serverTime;
                break;
            case 1: 
                var $time = J.Utils.reduceTime(t.serverTimeStamp, 1, 0);
                start.val($time);
                end.val(t.serverTime);
                t.grid.sendData.startTime = $time;
                t.grid.sendData.endTime = t.serverTime;
                break;
            case 3: 
                var $time = J.Utils.reduceTime(t.serverTimeStamp, 3, 0);
                start.val($time);
                end.val(t.serverTime);
                t.grid.sendData.startTime = $time;
                t.grid.sendData.endTime = t.serverTime;
                break;
            case 6: 
                var $time = J.Utils.reduceTime(t.serverTimeStamp, 6, 0);
                start.val($time);
                end.val(t.serverTime);
                t.grid.sendData.startTime = $time;
                t.grid.sendData.endTime = t.serverTime;
                break;
        }
    },
    fetchSelect: function(){
        var t = this;
        t.el.find('#selectType').dropdown({
            url: J.Api.fundsRecordType,
            className:'dropdown',
            valueField:'id',
            textField:'text'
        });
    },
    fetchTable: function(){
        var t = this;
        J.Common.renderTable(t.grid,function(con,totalSize){
            t.tableBox.html(con);
            t.totalSize = totalSize;
            t.setPages();
        });
    },
    configTable: function(){
        var t = this;
        t.grid = {
            id:'table_box',
            dataSource: t.record == 'amount' ? J.Api.fundsRecord : t.record == 'recharge' ? J.Api.fundsRecharge : J.Api.fundsWithdraw,
            sendData:{
                pageSize:10,
                currentPage: 1,
                transType:'all',
                startTime:'',
                endTime:''
            },
            footer:false,
            headTh: t.record == 'amount' ? {
                field:['time','type','operation','income','disbursement','remaining','status'],
                name:['交易时间','交易类型','资金操作','收入（元）','支出（元）',' 账户余额（元）','状态']
            } : t.record == 'recharge' ? {
                field:['time','number','rechargeMoney','fundChannel','status'],
                name:['充值时间','编号','充值金额（元）','资金渠道','状态']
            } : {
                field:['time','order','withdrawMoney','status'],
                name:['提现时间','订单号','提现金额（元）','状态']
            },
            className:'inquiry_table',
            format:{
                time:function(item){
                    return J.Utils.formatTime(item.time);
                }
            }   
            
        };
        
    },
    setPages: function(){
        var t = this;
        if(t.pagerStatus) {
            $('#messagePager').uuiPager({
                currentPage: 1,
                totalPage: Math.ceil(t.totalSize / 10) || 1,
                pageSize: 10,
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
                    t.grid.sendData.currentPage = page;
                    t.fetchTable();
                }
            });
            t.pagerStatus = false;           
        }
    },
    events: function(){
    	var t = this;
    	 t.el.delegate('.tap_item','click',function(e){
            Router.navigate('account/fundsRecord/record='+ $(this).data('href'));
         });
         t.el.delegate('#selectType','click',function(e){
            t.grid.sendData.transType = $(this).find('.dropdown').val();
            t.grid.sendData.currentPage = 1;
            t.pagerStatus = true;
            t.fetchTable();
         });
         t.el.delegate('.inquiry_type_item','click',function(e){
            $this = $(this);
            t.el.find('.inquiry_type_item.sel').removeClass('sel');
            $this.addClass('sel');
            t.grid.sendData.transType = $this.data('index');
            t.grid.sendData.currentPage = 1;
            t.pagerStatus = true;
            t.fetchTable();
         });
         t.el.delegate('.inquiry_time_item','click',function(e){
            $this = $(this);
            t.el.find('.inquiry_time_item.sel').removeClass('sel');
            $this.addClass('sel');
            t.updateTime($this.data('index'));
            t.pagerStatus = true;
            t.fetchTable();
         });
         
    }


};

FundsRecordController.prototype.constructor = FundsRecordController;

module.exports = FundsRecordController;