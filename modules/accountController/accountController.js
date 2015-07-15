
var Navigation = require('pc:navigation');

var AccountPandectController = require('pc:accountPandectController');
var ProjectController = require('pc:projectController');
var UnderRepayController = require('pc:underRepayController');


var RechargeController = require('pc:rechargeController');

var WithdrawController = require('pc:withdrawController');
var FundsRecordController = require('pc:fundsRecordController');
var ModifyPwdController = require('pc:modifyPwdController');
var TrusteeshipController = require('pc:trusteeshipController');
var ProtocolController = require('pc:protocolController');

var BankCardController = require('pc:bankCardController');
var CouponController = require('pc:couponController');
var MessageController = require('pc:messageController');

Router.addRules({
    'account' : function () {
        J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
        J.Controllers['accountPandect'] ? J.Controllers['accountPandect'].render() : J.Controllers['accountPandect'] = new AccountPandectController();
    },

    //账户总览
    'account/accountPandect' : function () {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
		J.Controllers['accountPandect'] ? J.Controllers['accountPandect'].render() : J.Controllers['accountPandect'] = new AccountPandectController();
    },


    //已投项目
    'account/project' : function () {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
        J.Controllers['project'] ? J.Controllers['project'].init() : J.Controllers['project'] = new ProjectController();
	},

    //待收款
    'account/underRepay' : function () {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
        J.Controllers['underRepay'] ? J.Controllers['underRepay'].render() : J.Controllers['underRepay'] = new UnderRepayController();
	},


    //提现
    'account/withdraw' : function () {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
        J.Controllers['withdraw'] ? J.Controllers['withdraw'].render() : J.Controllers['withdraw'] = new WithdrawController();
	},

    //资金记录
    'account/fundsRecord' : function () {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
        J.Controllers['fundsRecord'] ? J.Controllers['fundsRecord'].render() : J.Controllers['fundsRecord'] = new FundsRecordController();
	},
    //资金充值提现记录
    'account/fundsRecord/record=:record' : function (type, record) {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
        J.Controllers['fundsRecord'] ? J.Controllers['fundsRecord'].render(record) : J.Controllers['fundsRecord'] = new FundsRecordController(record);
	},
 //    //修改密码
    'account/modifyPwd' : function () {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
        J.Controllers['modifyPwd'] ? J.Controllers['modifyPwd'].render() : J.Controllers['modifyPwd'] = new ModifyPwdController();
    },

    //账户托管
    'account/trusteeship' : function () {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
        J.Controllers['trusteeship'] ? J.Controllers['trusteeship'].render() : J.Controllers['trusteeship'] = new TrusteeshipController();
    },

    //无密协议
    'account/protocol' : function () {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
        J.Controllers['protocol'] ? J.Controllers['protocol'].render() : J.Controllers['protocol'] = new ProtocolController();
    },

	//充值
	'account/recharge' : function () {
		J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
		J.Controllers['recharge'] ? J.Controllers['recharge'].render() : J.Controllers['recharge'] = new RechargeController();
	},

    //银行卡
    'account/bankCard' : function () {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
        J.Controllers['bankCard'] ? J.Controllers['bankCard'].render() : J.Controllers['bankCard'] = new BankCardController();
    },


    //我的红包
    'account/coupon' : function () {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
        J.Controllers['coupon'] ? J.Controllers['coupon'].render() : J.Controllers['coupon'] = new CouponController();
    },


    //我的消息
    'account/message' : function () {
    	J.Controllers['account'] ? J.Controllers['account'].render() : J.Controllers['account'] = new AccountController();
    	J.Controllers['message'] ? J.Controllers['message'].init() : J.Controllers['message'] = new MessageController();
    }

});

var AccountController = function(){
	var t = this;
	t.el = $('<div id="accountModule" class="account_module clear">'+
				'<div class="navigation fl"><a href="#account/subnav"></a></div>'+
				'<div id="accountMain" class="main fr"></div>'+
			'</div>');
	J.Common.matchRoute(location.hash);
	t.listenFun();
    t.init();
};

AccountController.prototype = {
	init: function(){
		var t = this;
		$('#mainBody').html(t.el);
        t.nav = new Navigation();
		t.el.find('.navigation').html(t.nav.el);
	},
	render: function(){
		var t = this;
		t.init();
	},
	listenFun: function(){
		var t = this,
		accountReg = /^#account\/(recharge|bankCard|protocol|withdraw)$/i;
		//'<a href="#account/trusteeship" style="display: block;text-align: center;font-size: 20px;margin: 200px;">您还没有开通托管账户，先去开通托管账户！</a>'
		Transceiver.listen('userInfo','accountModule.init',function(data){
			var user = JSON.parse(data);
			if(!user.isAccount && !!location.hash.match(accountReg)){
                J.Utils.alert({
					content: '您还没有开通托管账户，先去开通托管账户！',
					onSureCallback:function(){
						Router.navigate('account/trusteeship');
					},
                    hideClose:true
				});
			}else if(!user.isBindCard && !!location.hash.match(/^#account\/(withdraw)$/i)){
                J.Utils.alert({
                    content: '您还没有绑定提现银行卡，先去绑定提现银行卡！',
                    onSureCallback:function(){
                        Router.navigate('account/bankCard');
                    },
                    hideClose:true
                });
            }
			
		});
    },


};

AccountController.prototype.constructor = AccountController;
module.exports = AccountController;