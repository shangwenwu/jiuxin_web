var _id, user = {}, couponList = [];
Router.addRules({
    'investDetail/id=:id': function(type, id) {
        _id = id;
        var options = {
            id: id
        };
        J.Controllers['investDetail'] ? J.Controllers['investDetail'].render(options) : J.Controllers['investDetail'] = new InvestDetailController(options);
    }
});

var loadStatus = {
    plan: false,
    list: false
};
var investModule = {}, submitStatus = false;

var investTpl = Template(
    '<% if(moduleData.data.status == "OPENED") {%>' +
    '<div class="invest_info">' +
    '<div class="firstLine clear">' +
    '<div class="valiableInvest">' +
    '<div class="tip">可投金额（元）： </div>' +
    ' <div class="money"><%- moduleData.data.balance %></div>' +
    '</div>' +
    '<div class="time"><i class="clock"></i><span id="leftTime" data-leftTime="<%- (moduleData.data.endTime - moduleData.data.serverTime) %>"></span></div>' +
    '</div>' +
    '<div class="progress_bg"></div>' +
    '</div><div class="invest_margin"></div>' +
    '<% if(moduleData.user.isLogin != true || !moduleData.user.isAccount || !moduleData.user.isAgreement) {%>' +
    '<div class="action_wrapper">' +
    '<% if(!moduleData.user.isLogin) {%>' +
    '<p>登录后进行投资，并可查看账户余额</p>' +
    '<a href="<%- moduleData.user.loginUrl %>" class="btn">立即登录</a>' +
    '<% }else if(!moduleData.user.isAccount) {%>' +
    '<p>开通第三方支付托管账户后才能参与投资</p>' +
    '<a href="#account/trusteeship" class="btn">立即开通</a>' +
    '<% }else{%>' +
    '<p>签订快速投资协议后才能参与投资</p>' +
    '<a href="#account/protocol" class="btn">立即签订</a>' +
    '</div>' +
    '<% } %>' +
    '<% }else {%>' +
    '<div class="invest_wrapper">' +
    '<div class="leftMoney">账户余额（元）： <i class="red">¥<%- moduleData.user.leftMoney %></i>' +
    '<a href="#account/recharge" class="recharge">立即充值</a>' +
    '</div>' +
    '<div class="to_invest clear">' +
    '<input type="text" class="invest_input" data-availableAmount="<%- moduleData.user.leftMoney %>" data-max="<%- moduleData.data.max %>" data-balance="<%- moduleData.data.balance %>" data-min="<%- moduleData.data.min %>" data-step="<%- moduleData.data.stepBase %>" placeholder="最少为<%- moduleData.data.min %>，且为<%- moduleData.data.stepBase %>的倍数">' +
    '<a class="invest_btn" href="#">我要投资</a>' +
    '</div>' +
    '<p class="expect">预计总收益：0.00元</p>' +
    '<p class="invest_err"></p>' +
    '<select class="coupon_list" id="couponList"></select><p class="coupon_tip">优惠券不可用</p>' +
    '</div>' +
    '<% } %>' +
    '<% } else if(moduleData.data.status == "FINISHED"){%>' +
    '<div class="status full"></div>' +
    '<% } else if(moduleData.data.status == "CLEARED"){%>' +
    '<div class="status finished"></div>' +
    '<% } else if(moduleData.data.status == "SETTLED"){%>' +
    '<div class="status processing"><p class="next_refund">下一还款日：<%- moduleData.data.lastRepaymentsDate %></p></div>' +
    '<% } else if(moduleData.data.status == "SCHEDULED"){%>' +
    '<div class="waiting"><p class="waiting_time" data-leftTime="<%- moduleData.data.startTime - moduleData.data.serverTime %>"></p><p class="text">后开始...</p></div>' +
    '<% } %>'
);

var couponTpl = Template(
    '<% if(moduleData.length > 0){ %> ' +
        '<option value="0">请选择优惠券</option>' +
        '<% $.each(moduleData, function(i, item) { %>' +
            '<option value="<%- item.id %>" <% if(preCoupon ==  item.id){ %> selected <% }%>><%- getCouponText(item) %></option>' +
        '<% }) %>' +
    '<%} else { %>' +
        '<option value="0">请选择优惠券</option>' +
    '<% } %>'
);

var tpl = Template(
    '<div class="top_wrapper clear">' +
    '<div class="invest_data_wrapper">' +
    '<div class="invest_title">' +
    '<a class="protocol" target="_blank" href="<%- moduleData.tempRef %>">借贷协议（范本）</a>' +
    '<div class="title"><% if(moduleData.rookie == true){ %> <span class="rookie"></span><% } %><%- moduleData.title %></div>' +
    '</div>' +
    '<div class="content clear">' +
    '<div class="item itemFirst">' +
    '<div class="name">年化利率</div>' +
    '<div class="value"><%- moduleData.rate %>%</div>' +
    ' </div>' +
    '<div class="item itemSecond">' +
    ' <div class="name">期限</div>' +
    '<div class="value"><%- moduleData.fduration %><span><%- moduleData.fdurunit %></span></div>' +
    '</div>' +
    '<div class="item itemThird">' +
    '<div class="name">总额</div>' +
    '<div class="value"><%- moduleData.amount %><span><%- moduleData.aUnit %></span></div>' +
    '</div>' +
    '</div>' +
    '<ul class="info_list">' +
    '<li><div class="itemt"><i class="goldenDot">&bull;</i>保障方式 : 100%本金 + 利息</div></li>' +
    '<li><div class="itemt"><i class="blueDot">&bull;</i>还款方式 : &nbsp;&nbsp;&nbsp;<%- moduleData.method %></div></li>' +
    '</ul>' +
    '</div>' +
    '<div class="do_invest_wrapper" id="doInvestWrapper"></div> ' +
    '</div>' +
    '<div class="detail_wrapper">' +
    '<ul class="nav_item">' +
    '<li class="active">项目信息</li>' +
    '<li data-type="plan">还款计划</li>' +
    '<li data-type="list">投资记录</li>' +
    '</ul>' +
    '<div class="content_wrapper">' +
    '<div class="sub_content basic">' +
    '<p class="title">项目基本信息</p>' +
    '<p class="text"><%- moduleData.basicInfo %></p>' +
    '<p class="title">安全保障措施</p>' +
    '<p class="text"><%- moduleData.safeInfo %></p>' +
    '</div>' +
    '<div class="sub_content refund_plan">' +
    '<table class="table repay-plan">' +
    '<thead><tr>' +
    '<th>期次</th>' +
    '<th>预期还款时间</th>' +
    '<th>应收本息(元)</th>' +
    '<th>应收本金(元)</th>' +
    '<th>应收利息(元)</th>' +
    '<th>剩余本金(元)</th>' +
    '</tr></thead>' +
    '<tbody id="planWrapper"></tbody>' +
    '</table>' +
    '</div>' +
    '<div class="sub_content record">' +
    '<table class="table">' +
    '<thead><tr>' +
    '<th>成交时间</th>' +
    '<th>投资人</th>' +
    '<th>投资金额(元)</th>' +
    '</tr></thead>' +
    '<tbody id="listWrapper"></tbody>' +
    '</table>' +
    '</div>' +
    '</div>' +
    '</div>'
);

var renderList = {
    'plan': {
        url: J.Api.refundPlan,
        tpl: Template(
            '<% if(moduleData.length > 0){ %> ' +
            '<% $.each(moduleData, function(i, item) { %>' +
            '<tr>' +
            '<td><%- (i + 1) %></td>' +
            '<td><%- item.dueDate %></td>' +
            '<td><%- item.amount %></td>' +
            '<td><%- item.amountPrincipal %></td>' +
            '<td><%- item.amountInterest %></td>' +
            '<td><%- item.amountOutstanding %></td>' +
            '</tr>' +
            '<% }) %>' +
            '<%} else { %>' +
            '<tr><td colspan="6">暂无相关数据</td></tr>' +
            '<% } %>'
        )
    },
    "list": {
        url: J.Api.investList,
        tpl: Template(
            '<% if(moduleData.length > 0){ %> ' +
            '<% $.each(moduleData, function(i, item) { %>' +
            '<tr>' +
            '<td><%- item.submitTime %></td>' +
            '<td><%- item.loginName %></td>' +
            '<td><%- item.amount %></td>' +
            '</tr>' +
            '<% }) %>' +
            '<%} else { %>' +
            '<tr><td colspan="3">暂无相关数据</td></tr>' +
            '<% } %>'
        )
    }
}
var InvestDetailController = function(options) {
    var t = this;
    // this.url = options && options.url || '';
    t.el = $('<div id="InvestDetail_page_modulePageModule" class="investDetail_page_module clear"></div>');
    t.init(options);
    t.listenFun();
};
InvestDetailController.prototype = {
    init: function(options) {
        var t = this;
        investModule = {};
        loadStatus = {
            plan: false,
            list: false
        };
        submitStatus = false
        $('#mainBody').html(t.el);
        t.el.html('<div class="loading"></div>');
        t.fetch(options);
    },

    render: function(options) {
        var t = this;
        t.init(options);
    },

    //投资标的详情数据
    fetch: function() {
        var t = this;
        var options = {
            url: J.Api.investDetail,
            data: {
                id: _id
            },
            scopt: t,
            callback: function(data) {
                t.el.html($(tpl({
                    moduleData: data
                }))).append('<div class="post_loading"><span class="post_loading_img"></span></div>');
                if (data.status == 'OPENED' || data.status == 'SCHEDULED') {
                    $('.nav_item li:eq(1)').hide();
                }
                t.events();
                investModule.data = data;
                t.renderWrapper();
            }
        };
        J.Utils.sendAjax(options);
    },

    getCouponText: function(item) {
        // return 'aa';
        var text = '';
        switch (item.type) {
            case 'INTEREST':
                text = '加息券' + '-' + item.price + '%';
                break;
            case 'PRINCIPAL':
                text = '增值券' + '-￥' + item.price;
                break;
            case 'REBATE':
                text = '抵扣券' + '-￥' + item.price;
                break;
            case 'CASH':
                text = '现金券' + '-￥' + item.price;
                break;
        }
        return text;
    },

    renderWrapper: function() {
        var t = this;
        window.setTimeout(function() {
            if (typeof investModule.data != 'undefined' && typeof investModule.user != 'undefined') {
                $("#doInvestWrapper").html($(investTpl({
                    moduleData: investModule
                })));
                if ($("#leftTime").size()) {
                    t.timeDown($("#leftTime"));
                } else if ($(".waiting").size()) {
                    t.timeDown($(".waiting .waiting_time"));
                }
                if(investModule.data.status == 'OPENED') {
                    t.fetchCoupon();
                }
            } else {
                window.setTimeout(arguments.callee, 50);
            }
        }, 50);
    },

    fetchCoupon: function() {
        var t = this;
        var options = {
            url: J.Api.listCoupon,
            data: {
                id: _id
            },
            scopt: t,
            callback: function(data) {
                couponList = data.results;
                t.renderCoupon(100000000);
            }
        };
        J.Utils.sendAjax(options);
    },

    renderCoupon: function(number) {
        var t = this;
        var data = [], preCoupon = $("#couponList").val() || 0;
        for (var i = 0, len = couponList.length; i < len; i++) {
            if (couponList[i].minAmount <= number) {
                data.push(couponList[i]);
            }
            if(preCoupon && couponList[i].id == preCoupon && couponList[i].minAmount > number) {
                t.showCouponTip();
            }
        }
        var wrapper = $("#couponList");
        if (data.length) {
            wrapper.show();
            wrapper.html($(couponTpl({
                moduleData: data,
                getCouponText: t.getCouponText,
                preCoupon: preCoupon
            })));
        } else {
            wrapper.hide();
        }
    },

    showCouponTip: function () {
        var dom = $('.coupon_tip');
        if(dom.css('display') == 'none'){
            dom.show();
            setTimeout(function () {
                dom.hide();
            }, 3000)
        }
    },

    listenFun: function() {
        var t = this;
        Transceiver.listen('userInfo', 'investDetail.init', function(data) {
            investModule.user = {};
            investModule.user = JSON.parse(data);
            if (!investModule.user.isLogin) {
                require('pc:base/base64');
                investModule.user.loginUrl = '#login/url=' + new Base64().encode(location.href);
            }
            t.renderWrapper();
        });
    },

    events: function() {
        var t = this;
        t.el.delegate('.nav_item li', 'click', function(e) {
            e.preventDefault();
            if (!$(this).hasClass('active')) {
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
                var index = $(this).index();
                $(".sub_content").hide();
                $('.sub_content:eq(' + index + ')').show();
                var type = $(this).attr("data-type");
                if (type) {
                    !loadStatus[type] && t.loadData(type);
                }
            }
        });

        t.el.delegate('.invest_btn', 'click', function(e) {
            e.preventDefault();
            var input = $('.invest_input'),
                val = Number($.trim(input.val())),
                min = parseInt(input.data("min")),
                max = parseInt(input.data("max")),
                step = parseInt(input.data("step")),
                balance = parseInt(input.data("balance")),
                availableAmount = parseInt(input.attr("data-availableAmount")),
                err = input.closest('.to_invest').siblings('.invest_err');
            if (isNaN(val)) {
                err.text('输入有误，请重新输入 ! ').show();
            } else if(('' + val).indexOf('.') != -1) {
                err.text('投资金额必须为整数 ! ').show();
            } else if (val > availableAmount) {
                err.text('账户余额不足 ! ').show();
            } else if (val > balance) {
                err.text('投资金额不可大于可投金额 ! ').show();
            } else if (min >= balance && val != balance) {
                err.text('可投金额不大于最少投资金额时，投资金额必须等于可投金额 ! ').show();
            } else if (val > max) {
                err.text('单次投标金额不可大于' + max + ' ! ').show();
            } else if (val < min && min < balance) {
                err.text('单次投标金额不可少于' + min + ' ! ').show();
            } else if (val % step !== 0 && min < balance) {
                err.text('单次投标金额必须为' + step + ' 的倍数! ').show();
            } else {
                t.submitInvest(val);
            }
        });

        t.el.delegate('.invest_input', 'keyup', function(e) {
            e.preventDefault();
            var input = $('.invest_input'),
                // val = parseInt($.trim(input.val())),
                val = $.trim(input.val()),
                err = input.closest('.to_invest').siblings('.invest_err');
            err.hide();
            if (!val || isNaN(val)) {
                $('.expect').text('预计总收益：0.00元');
            } else {
                t.renderCoupon(val);
                t.calculateInterest(val);
            }
        });

        t.el.delegate('#couponList', 'change', function(e) {
            var input = $('.invest_input'),
                val = $.trim(input.val()),
                err = input.closest('.to_invest').siblings('.invest_err');
            err.hide();
            if (!val || isNaN(val)) {
                $('.expect').text('预计总收益：0.00元');
            } else {
                t.calculateInterest(val);
            }
        });
        
    },

    //计算预期收益
    calculateInterest: function(num) {
        var options = {
            url: J.Api.getinterest,
            data: {
                id: _id,
                num: num,
                placementId: $("#couponList:visible").size() ? ($("#couponList:visible").val() != 0 ? $("#couponList:visible").val() : '') : ''
            },
            callback: function(data) {
                $('.expect').text('预计总收益：' + data.interest + '元');
            }
        };
        J.Utils.sendAjax(options);
        // return (investModule.data.totalInterest * num / investModule.data.originalAmount).toFixed(2);
        // var interest = t.calculateInterest(val);
        // $('.expect').text('预计总收益：' + interest + '元');
    },

    submitInvest: function(num) {
        var t = this;
        J.Utils.confirm({
            content: '确定投标',
            onSureCallback: function() {
                if(submitStatus) return false;
                $('.post_loading').show();
                var options = {
                    url: J.Api.submitInvest,
                    data: {
                        id: _id,
                        num: $.trim($('.invest_input').val()),
                        placementId: $("#couponList:visible").size() ? ($("#couponList:visible").val() != 0 ? $("#couponList:visible").val() : '') : ''
                    },
                    scopt: t,
                    callback: function(data) {
                        $('.post_loading').hide();
                        J.Utils.alert({
                            content: '投标成功',
                            onSureCallback: function() {
                                Router.navigate('account/project');
                            }
                        });
                    }
                };
                J.Utils.sendAjax(options);
            }
        })
    },

    loadData: function(type) {
        var t = this;
        var data = {
            id: _id
        };
        if (type == 'list') {
            data.currentPage = 1;
            data.pageSize = 15;
        }
        var options = {
            url: renderList[type].url,
            data: data,
            scopt: t,
            callback: function(data) {
                $('#' + type + 'Wrapper').html($(renderList[type].tpl({
                    moduleData: data.results
                })));
                loadStatus[type] = true;
            }
        };
        J.Utils.sendAjax(options);
    },

    timeDown: function(target) {
        var t = this;
        var timestamp = parseInt(target.attr("data-leftTime")),
            down = setInterval(function() {
                var str = J.Utils.timeElapsed(timestamp);
                target.html(str);
                timestamp = timestamp - 1000;
                if (timestamp == 0) {
                    location.reload();
                }
            }, 1000);
    }
};

InvestDetailController.prototype.constructor = InvestDetailController;

module.exports = InvestDetailController;