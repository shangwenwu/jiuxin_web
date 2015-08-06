/**
 * @file 充值
 * Created by jinguangguo on 2015/6/26.
 */

var tpl = require('pc:rechargeController/rechargeController.tpl');

     
var newTab;
var tplFunc = Template(tpl.content);

var RechargeController = function () {
    var t = this;
    RechargeController.tplData.bankList = RechargeController._getBankList();
    t.el = $(tpl.container);
    // 获取银行列表
    t.init();
};

RechargeController.RECHARGE_TYPE_PERSON = 'PERSON';
RechargeController.RECHARGE_TYPE_ENTERPRISE = 'ENTERPRISE';

RechargeController.URL = {
    getUserInfo: J.Api.getUserInfo,
    bankCardInfo: J.Api.bankCardInfo,
    prepareRecharge: J.Api.prepareRecharge,
    getRechargeResult: J.Api.getRechargeResult  // 获取充值结果
};

RechargeController.BLANK_LIST = {
    ICBC: {
        name: '中国工商银行',
        detail: [
            {
                singleLimit: 500,
                dayLimit: 1000,
                condition: '办理电子银行口令卡(无需开通短信认证)',
                remarks: '如果您在银行设置的网上支付额度低于左表限额，以您的设置为准。'
            },
            {
                singleLimit: 2000,
                dayLimit: 5000,
                condition: '办理电子银行口令卡，开通短信认证',
                remarks: '存量静态密码用户的总累计限额为300元'
            },
            {
                singleLimit: '100万',
                dayLimit: '100万',
                condition: '办理U盾',
                remarks: ''
            }
        ]
    },
    ABC: {
        name: '中国农业银行',
        detail: [
            {
                singleLimit: 1000,
                dayLimit: 3000,
                condition: '办理动态口令卡',
                remarks: '如果您在银行设置的网上支付额度低于左表限额，以您的设置为准。'
            },
            {
                singleLimit: '无限额',
                dayLimit: '无限额',
                condition: '办理电子银行口令卡(无需开通短信认证)',
                remarks: '办理农行K宝'
            }
        ]
    },
    BOC: {
        name: '中国银行',
        detail: [
            {
                singleLimit: 1000,
                dayLimit: 5000,
                condition: '网银快付',
                remarks: ''
            },
            {
                singleLimit: '5万',
                dayLimit: '50万',
                condition: '专业版',
                remarks: ''
            }
        ]
    },
    BCCB: {
        name: '北京银行',
        detail: [
            {
                singleLimit: 1000,
                dayLimit: 5000,
                condition: '开通动态密码版网上支付功能',
                remarks: ''
            },
            {
                singleLimit: '100万',
                dayLimit: '100万',
                condition: '证书版',
                remarks: '开通证书'
            }
        ]
    },
    BOCOM: {
        name: '交通银行',
        detail: [
            {
                singleLimit: 50000,
                dayLimit: 50000,
                condition: '开通短信密码',
                remarks: '如果您在银行设置的网上支付额度低于左表限额，以您的设置为准。'
            }
        ]
    },
    CCB: {
        name: '建设银行',
        detail: [
            {
                singleLimit: 5000,
                dayLimit: 5000,
                condition: '账号支付',
                remarks: '无需办理网银，需要预留的手机号接收验证码'
            },
            {
                singleLimit: '5万',
                dayLimit: '10万',
                condition: '一代网银盾用户',
                remarks: ''
            },
            {
                singleLimit: '50万',
                dayLimit: '50万',
                condition: '二代网银盾用户',
                remarks: ''
            }
        ]
    },
    CIB: {
        name: '兴业银行',
        detail: [
            {
                singleLimit: 5000,
                dayLimit: 5000,
                condition: '仅支持开通短信口令的用户（且只针对在网上开通的）或者开通动态令牌的保护的银行卡',
                remarks: ''
            },
            {
                singleLimit: '100万',
                dayLimit: '100万',
                condition: '开通证书保护，或通过柜面开通短信口令保护的用户',
                remarks: ''
            }
        ]
    },
    CMB: {
        name: '招商银行',
        detail: [
            {
                singleLimit: 5000,
                dayLimit: 5000,
                condition: '开通大众版网上支付功能',
                remarks: ''
            },
            {
                singleLimit: '无限额',
                dayLimit: '无限额',
                condition: '开通专业版网上支付功能',
                remarks: ''
            }
        ]
    },
    CEB: {
        name: '光大银行',
        detail: [
            {
                singleLimit: 5000,
                dayLimit: 5000,
                condition: '开通大众版',
                remarks: ''
            },
            {
                singleLimit: '20万',
                dayLimit: '50万',
                condition: '办理阳光网盾',
                remarks: ''
            },
            {
                singleLimit: '50万',
                dayLimit: '50万',
                condition: '办理动态口令牌',
                remarks: ''
            }
        ]
    },
    CMBC: {
        name: '民生银行',
        detail: [
            {
                singleLimit: 300,
                dayLimit: 300,
                condition: '大众版',
                remarks: ''
            },
            {
                singleLimit: 5000,
                dayLimit: 5000,
                condition: '贵宾版数字证书',
                remarks: ''
            },
            {
                singleLimit: '2万',
                dayLimit: '10万',
                condition: '贵宾版（U宝）',
                remarks: ''
            }
        ]
    },
    CITIC: {
        name: '中信银行',
        detail: [
            {
                singleLimit: 1000,
                dayLimit: 5000,
                condition: '办理文件证书',
                remarks: '柜台开通'
            },
            {
                singleLimit: '100万',
                dayLimit: '100万',
                condition: '办理移动证书',
                remarks: '柜台开通'
            }
        ]
    },
    GDB: {
        name: '广发银行',
        detail: [
            {
                singleLimit: 3000,
                dayLimit: 3000,
                condition: '手机动态验证码',
                remarks: ''
            },
            {
                singleLimit: '30万',
                dayLimit: '30万',
                condition: 'key盾',
                remarks: ''
            }
        ]
    },
    HXB: {
        name: '华夏银行',
        detail: [
            {
                singleLimit: 300,
                dayLimit: 1000,
                condition: '签约客户',
                remarks: '网上开通'
            },
            {
                singleLimit: 5000,
                dayLimit: 5000,
                condition: '证书/U-key',
                remarks: '柜台开通 '
            },
            {
                singleLimit: '无限额',
                dayLimit: '无限额',
                condition: '电子钱包用户',
                remarks: '柜台开通 '
            }
        ]
    },
    HKBEA: {
        name: '东亚银行',
        detail: [
            {
                singleLimit: 5000,
                dayLimit: '2万',
                condition: '手机动态密码',
                remarks: '柜台开通'
            },
            {
                singleLimit: '100万',
                dayLimit: '100万',
                condition: 'U盾',
                remarks: '柜台开通'
            }
        ]
    },
    PSBC: {
        name: '邮政储蓄银行',
        detail: [
            {
                singleLimit: '1万',
                dayLimit: '1万',
                condition: '个人网银短信客户',
                remarks: '包含手机银行、电视银行普通客户'
            },
            {
                singleLimit: '20万',
                dayLimit: '20万',
                condition: '电子令牌客户',
                remarks: ''
            },
            {
                singleLimit: '200万',
                dayLimit: '200万',
                condition: 'UK客户',
                remarks: ''
            }
        ]
    },
    SPDB: {
        name: '浦发银行',
        detail: [
            {
                singleLimit: '5万',
                dayLimit: '20万',
                condition: '动态密码',
                remarks: ''
            },
            {
                singleLimit: '自行设置',
                dayLimit: '自行设置',
                condition: '数字证书',
                remarks: ''
            }
        ]
    },
    SHRCB: {
        name: '上海农村商业银行',
        detail: [
            {
                singleLimit: 50,
                dayLimit: 100,
                condition: '证书专业版支付',
                remarks: '网银证书'
            },{
                singleLimit: 1000,
                dayLimit: 5000,
                condition: '短信专业版支付',
                remarks: ''
            },{
                singleLimit: 2000,
                dayLimit: 5000,
                condition: '卡号密码支付',
                remarks: ''
            },{
                singleLimit: 5000,
                dayLimit: 5000,
                condition: '手机支付',
                remarks: ''
            }
        ]
    },
    WZCB: {
        name: '温州银行',
        detail: [
            {
                singleLimit: 300,
                dayLimit: 300,
                condition: '开通大众版网银支付功能',
                remarks: '付款金额超过1000元，需要专业版网银证书进行验证。'
            },
            {
                singleLimit: 800,
                dayLimit: 800,
                condition: '开通大众版网银支付功能并办理手机验证',
                remarks: '付款金额超过1000元，需要专业版网银证书进行验证。'
            },
            {
                singleLimit: '自行设置',
                dayLimit: '自行设置',
                condition: '专业版',
                remarks: ''
            }
        ]
    }
};

RechargeController.defaultBank = 'ICBC';

// 模板数据
RechargeController.tplData = {
    userInfo: {
        isBorrower: false,   // 是否是借款人
        remain: 0.00    // 账户余额
    },
    rechargeType: RechargeController.RECHARGE_TYPE_PERSON,  // 默认个人充值
    bankCardInfo: {
        number: 0000,   // 银行卡尾号
        name: ''    // 银行卡名字
    },
    bankList: [ // 银行列表

    ],
    tipInfo: {

    }
};

RechargeController.currentRechargeType = RechargeController.RECHARGE_TYPE_PERSON;

RechargeController.setRechargeType = function(type) {
    this.currentRechargeType = type;
    this.tplData.rechargeType = type;
    RechargeController.tplData.bankList = RechargeController._getBankList();
};

// 根据账户类型获取银行列表
RechargeController._getBankList = function() {
    var result = [];
    var bankList = [];
    $.extend(bankList,J.Utils.bankName);
    if(this.currentRechargeType == this.RECHARGE_TYPE_ENTERPRISE){
        delete bankList['BJBANK'];
        delete bankList['HKBEA'];
        delete bankList['SHRCB'];
        delete bankList['WZCB'];
        bankList['BJB'] = '北京银行';
    }
    for (var key in bankList) {
        result.push({
            shortName: key,
            bankName: bankList[key]
        });
    }
    return result;
};

RechargeController.prototype = {
    init: function () {
        var t = this;
        Transceiver.listen('userInfo', 'rechargeModule', function(data) {
            var userInfo = JSON.parse(data);
            // 是否是借款人
            RechargeController.tplData.userInfo.isBorrower = userInfo.isBorrower;
            // 选定个人账户还是企业账户 - 默认是个人账户
            RechargeController.setRechargeType(RechargeController.RECHARGE_TYPE_PERSON);
            // 对于余额进行格式化，如1234567.987，格式化之后变成1,234,567.99
            RechargeController.tplData.userInfo.remain = J.Utils.formatAmount(userInfo.leftMoney, 2);
            t.el.html(tplFunc(RechargeController.tplData));
            // 默认选中第一个
            t._selectFirstBank();
        });
        this.render();
    },
    render: function () {
        var t = this;
        $('#accountMain').html(t.el);
        t.events();
    },
    /**
     * 默认选中第一个银行
     * @private
     */
    _selectFirstBank: function() {
        // 默认选中第一个
        this.el.find('#bankList li.item').eq(0).trigger('click');
    },
    /**
     * 切换tab
     * @param type 账户类型
     * @private
     */
    _tab: function(type) {
        // 个人充值
        if (type === RechargeController.RECHARGE_TYPE_PERSON) {
            RechargeController.setRechargeType(RechargeController.RECHARGE_TYPE_PERSON);
        } else {    // 企业充值
            RechargeController.setRechargeType(RechargeController.RECHARGE_TYPE_ENTERPRISE);
        }
        this.el.html(tplFunc(RechargeController.tplData));
        this._selectFirstBank();
    },
    /**
     * 获取银行信息
     * @private
     * @说明 暂时没有用到
     */
    _fetchBankInfo: function(onSuccessCallback) {
        var bankCardInfo = RechargeController.tplData.bankCardInfo;
        J.Utils.sendAjax({
            url: RechargeController.URL.bankCardInfo,
            type: 'GET',
            callback: function(result) {
                bankCardInfo.number = result.number;
                bankCardInfo.name = result.name;
                if (typeof onSuccessCallback == 'function') {
                    onSuccessCallback();
                }
            }
        });
    },
    events: function () {
        var t = this;

        // 切换tab
        t.el.delegate('.tab_item', 'click', function (e) {
            var $this = $(this);
            var type = $this.data('type');
            $this.siblings('.tab_item').removeClass('tab_item_active');
            t._tab(type);
        });

        // 选择银行
        t.el.delegate('#bankList li.item', 'click', function (e) {
            var $this = $(this);
            var siblings = $this.siblings('li.item');
            siblings.removeClass('item_active');
            $this.addClass('item_active');
            var shortName = $this.data('shortname');
            t.el.find('#bankCode').val(shortName);
            // 根据选中的银行设置对应的银行限额
            t.renderRankLimitTable(shortName);
        });

        // 去充值
        t.el.delegate('#toRecharge', 'click', function (e) {
            e.preventDefault();
            var $form = t.el.find('#rechargeForm');
            var $rechargeValue = $form.find('#rechargeValue');
            var $bankCode = $form.find('#bankCode');
            var $tip = t.el.find('.recharge_money_tip');
            var showTip = function(text) {
                $tip.text(text).show();
            };
            var hideTip = function() {
                $tip.empty().hide();
            };
            // 充值金额
            if ($.trim($rechargeValue.val()) === '') {
                showTip('充值金额不能为空！');
                $rechargeValue.focus();
                return;
            }
            var value = $.trim($rechargeValue.val());

            var reg1 = /^\d+$/;
            var reg2 = /^\d+\.$/;
            var reg3 = /^\d+\.\d+$/;
            if (reg1.test(value) === true || reg2.test(value) === true || reg3.test(value) === true) {

            } else {
                showTip('请输入正确的充值金额！');
                $rechargeValue.focus();
                return;
            }

            // 6位有效数字
            // if (/^\d{1,6}(\.\d{1,})?$/.test(value) === true || /^\d{1,6}(\.)?$/.test(value) === true) {

            // } else {
            //     showTip('单笔充值最高100,000.00元！');
            //     $rechargeValue.focus();
            //     return;
            // }
            if ($bankCode.val() === '') {
                J.Utils.alert({
                    content: '请选择银行卡！'
                });
                return;
            }
            newTab = window.open('about:blank');
            // 先ajax请求-prepareRecharge
            t._ajaxPrepareRecharge(value, $bankCode.val());
        });

        // 输入框的绑定
        t.el.delegate('#rechargeValue', 'keyup', function (e) {
            t.el.find('.recharge_money_tip').empty().hide();
        });
    },
    _tip: function(text) {

    },
    /**
     * 进行充值
     * @param amount
     * @param bankCode
     * @private
     */
    _ajaxPrepareRecharge: function(amount, bankCode) {
        var t = this;
        var payType;
        if (RechargeController.currentRechargeType === RechargeController.RECHARGE_TYPE_PERSON) {
            payType = 'B2CDEBITBANK';
        } else {
            payType = 'B2BBANK';
        }
        J.Utils.sendAjax({
            url: RechargeController.URL.prepareRecharge,
            type: 'get',
            data: {
                bankCode: bankCode,
                amount: amount,
                payType: payType
            },
            callback: function (data) {
                t._submitForm(data);
            }
        });
    },

    /**
     * 提交充值表单
     * @param data
     * @private
     */
    _submitForm: function(data) {
        var t = this;
        // 提交表单
        J.Utils.submitForm({
            url: data.url,
            method: 'post',
            param: data.param,
            windowTarget: newTab,
            onSubmit: function(){
                // 要订单ID
                t._showRechargeDialog(data.orderId);
            }
        });
    },
    /**
     * 展现充值之后的列表
     * @param orderId
     * @private
     */
    _showRechargeDialog: function(orderId) {
        var t = this;
        // 提交成功之后，当前页面显示对话框
        J.Utils.confirm({
            content: '充值是否成功？',
            okValue: '充值成功',
            onSureCallback: function() {
                // 调用接口
                J.Utils.sendAjax({
                    url: RechargeController.URL.getRechargeResult,
                    // type: 'GET',
                    data: {
                        orderId: orderId
                    },
                    callback: function(result) {
                        _hmt && _hmt.push(['_trackEvent', 'chongzhi', 'queren',]);
                        t.renderTip(result);
                    }
                });
            },
            cancelValue: '充值失败',
            onCancelCallback: function() {
                // t.renderTip({
                //     status: 500
                // });
                location.reload();
            }
        });
    },
    /**
     * 渲染提示框
     * @param tplData
     */
    renderTip: function(data) {
        var tplData = {};
        if (data.status === "SUCCESSFUL") {
            // 支付成功的状态
            tplData.isSuccess = true;
            tplData.amount = J.Utils.formatAmount(data.amount, 2);   // 充值金额
            tplData.balance = J.Utils.formatAmount(data.balance, 2); // 账户余额
            tplData.completeTime = J.Utils.formatTime(data.completeTime, 'Y-M-D m:s');  // 充值时间
        } else {
            tplData.isSuccess = false;
        }
        var tplTipFunc = Template(tpl.tip);
        this.el.html(tplTipFunc({
            tipInfo: tplData
        }));
    },
    /**
     * 渲染银行列表
     */
    renderRankLimitTable: function(bankShortName) {
        var limitDetailList = RechargeController.BLANK_LIST[bankShortName].detail;
        var formatLimit = function(num) {
            if (typeof num === 'string') {
                return num;
            }
            if (num < 10000) {
                return num;
            } else {
                return (num / 10000) + '万';
            }
        };
        J.Common.renderTable({
            dataSource: {
                results: limitDetailList
            },
            headTh:{
                field:['singleLimit', 'dayLimit', 'condition', 'remarks'],
                name:['单笔限额（元）','每日限额（元）', '需要满足条件', '备注'],
                width: ['15%', '15%', '35%', '35%']
            },
            sendData:{
                pageSize:10,
                currentPage:1
            },
            className:'bank_limit_table',
            format:{
                singleLimit:function(item){
                    return formatLimit(item.singleLimit);
                },
                dayLimit:function(item){
                    return formatLimit(item.dayLimit);
                },
                condition: function(item) {
                    return item.condition;
                },
                remarks: function(item) {
                    return item.remarks;
                }
            }
        }, function(con, total) {
            $('.limit_detail').html(con);
        });
    }
};

RechargeController.prototype.constructor = RechargeController;

module.exports = RechargeController;