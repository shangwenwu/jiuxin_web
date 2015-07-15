
var BankCardController = function(){
	var t = this;
	t.html = '<div id="bankCardModule" class="bank_card_module">'+
		        '<h1 class="hd">绑定提现银行卡</h1>'+
                '<div id="step1" class="card_box">'+
		        	'<p class="hint">请务必本人绑卡，请选择换开户银行卡</p>'+
	                '<div id="cardList" class="card_list">'+
	                    '<span class="card_item gs on fl" data-name="ICBC"></span>'+ 
	                    '<span class="card_item ny fl" data-name="ABC"></span>'+ 
	                    '<span class="card_item zg fl" data-name="BOC"></span>'+ 
	                    '<span class="card_item js fl" data-name="CCB"></span>'+ 
	                    '<span class="card_item xy fl" data-name="CIB"></span>'+ 
	                    '<span class="card_item ms fl" data-name="CMBC"></span>'+ 
	                    '<span class="card_item yz fl" data-name="PSBC"></span>'+ 
	                    '<span class="card_item zs fl" data-name="CMB"></span>'+ 
	                    '<span class="card_item gd fl" data-name="CEB"></span>'+ 
	                '</div>'+
	                '<p class="card_number">'+
	                	'<label class="label">银行卡号：</label><input id="cardInput" class="card_input" type="text" placeholder="请输入储蓄卡"></input>'+
	                '</p>'+
	                '<p class="card_hint">（该银行卡可用于充值、提现）</p>'+
	                '<button id="submit" class="btn_blue submit">确认</button>'+
                '</div>'+
                '<div id="step2" class="card_box">'+
                    '<div id="cardImg" class="card_img">'+
                        '<span class="card_txt fl">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;</span>'+
                        '<span id="cardNu" class="card_nu fl">5118</span>'+
                    '</div>'+
                    '<div class="bind_txt">'+
                    	'<p>您的提现银行卡由账户托管方进行维护管理。</p>'+
                    	'<p>账户托管方将在工作日11:00、14:00、16:00，每天三次处理您的提现请求。</p>'+
                    '</div>'+
                '</div>'+
			'</div>';
    t.el = $(t.html)
    t.hd = t.el.find('.hd');
	t.step1 = t.el.find('#step1');
	t.step2 = t.el.find('#step2');
	t.cardImg = t.el.find('#cardImg');
	t.cardNu = t.el.find('#cardNu');
    t.render();
    t.listenFun();
    t.events();
};

BankCardController.prototype = {
	render: function(){
		var t = this;
		$('#accountMain').html(t.el);
	},
    listenFun: function(){
		var t = this;
		Transceiver.listen('userInfo','bankCardModule.init',function(data){
			var user = JSON.parse(data);
			t.el.find('.hide').removeClass('hide');
			if(user.isBindCard){
				t.step1.addClass('hide');
				t.hd.html('已绑定提现银行卡');
				t.fetch();
			}else{
				t.hd.html('绑定提现银行卡');
				t.step2.addClass('hide');
			};
		});
    },
	events: function(){
        var t = this;
        t.data = {};
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

			J.Utils.sendAjax({
				url:J.Api.bankCardInfo,
				type:'post',
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
									param:data.param,
									onSubmit:function(){
										J.Utils.confirm({
											content: '银行卡是否绑定成功！',
											okValue: '绑定成功',
											cancelValue: '绑定失败',
											onSureCallback: function(){
												J.Utils.sendAjax({
													url:J.Api.bankCardInfo,
													type:'post',
													data: t.data,
													callback:function(data){
														if(data.last4BankCardNo){
															t.render();
														}else{
															J.DEBUG && console.log('绑定银行卡接口失败！');
														}
													}
												});
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
	fetch: function(){
        var t = this;
        J.Utils.sendAjax({
        	url:J.Api.bankCardInfo,
        	type:'get',
        	callback:function(data){
        	    t.cardImg.attr('class','card_img').addClass(data.bankCode);
                t.cardNu.html(data.last4BankCardNo);
        	}
        });
	}
};

BankCardController.prototype.constructor = BankCardController;
module.exports = BankCardController;