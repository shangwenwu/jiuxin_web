var newTab;
var wrapperTpl = require('pc:bankCardController/wrapperTpl');

var BankCardController = function(){
	var t = this;
	t.html = '<div id="bankCardModule" class="bank_card_module"><div class="ui_loading"></div></div>';
    t.render();
    t.listenFun();
};

BankCardController.prototype = {
	render: function(){
		var t = this;
    	t.el = $(t.html)
		$('#accountMain').html(t.el);
		 t.events();
	},
    listenFun: function(){
		var t = this;
		Transceiver.listen('userInfo','bankCard.init',function(data){
			var user = JSON.parse(data);
            if(!user.isLogin) {
                require('pc:base/base64');
                Router.navigate('login/url=' + new Base64().encode('login/url=' + new Base64().encode(location.href)));
            } else {
				t.fetch();
            }
			// t.el.find('.hide').removeClass('hide');

			// if(user.isBindCard){
			// 	// t.step1.addClass('hide');
			// 	// t.hd.html('已绑定提现银行卡');
			// 	t.fetch();
			// }else{
			// 	t.fetch();
			// 	// t.hd.html('绑定提现银行卡');
			// 	// t.step2.addClass('hide');
			// };
		});
    },
	events: function(){
        var t = this;
        t.data = {
        	bankCode:'ICBC'
        };
        t.el.delegate('.card_item','click',function(e){
        	var item = $(this);
        	t.el.find('.card_item.on').removeClass('on');
        	item.addClass('on');
        	t.data.bankCode = item.data('name');
        });
        t.el.delegate('#submit','click',function(e){
        	t.data.bankCardNo = t.el.find('#cardInput').val();
        	if(!+(t.data.bankCardNo)){
                J.Utils.alert({
                    content: '请输入正确储蓄卡！'
                });
                return false;
        	}
        	newTab = window.open('about:blank');
			J.Utils.sendAjax({
				url:J.Api.bankCardInfo,
				type:'get',
				data: t.data,
				callback:function(data){
					// 绑定过银行卡
					if (data.last4BankCardNo) {
						J.Utils.alert({
							content: '该银行卡已绑定过！'
						});
					} else {
						// 没有绑定
						J.Utils.sendAjax({
							url:J.Api.bindBankCard,
							type:'get',
							data: t.data,
							callback:function(data){
								J.Utils.submitForm({
									url:data.url,
									method:'post',
									windowTarget: newTab,
									param:data.param,
									onSubmit:function(){
										var callback = function(){
											J.Utils.sendAjax({
												url:J.Api.bankCardInfo,
												data: t.data,
												callback:function(data){
													t.fetch();
												}
											});
										};
										J.Utils.confirm({
											content: '银行卡是否绑定成功！',
											okValue: '绑定成功',
											cancelValue: '绑定失败',
											onSureCallback: function(){
												callback();
											},
											onCancelCallback: function(){
                                                callback();
											}
										});
									}
								});
							}
						});
					}
				}
			});


        });
	},
	fetch: function(user){
        var t = this;
        J.Utils.sendAjax({
        	url:J.Api.bankCardInfo,
        	type:'get',
        	callback:function(data){
        		$("#bankCardModule").html($(wrapperTpl({ 
        			moduleData : data
        		})));
			    t.hd = t.el.find('.hd');
				t.step1 = t.el.find('#step1');
				t.step2 = t.el.find('#step2');
				t.cardImg = t.el.find('#cardImg');
				t.cardNu = t.el.find('#cardNu');

        	    // t.cardImg.attr('class','card_img').addClass(data.bankCode);
             //    t.cardNu.html(data.last4BankCardNo);
        	}
        });
	}
};

BankCardController.prototype.constructor = BankCardController;
module.exports = BankCardController;