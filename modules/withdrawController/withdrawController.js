var newTab;
var WithdrawController = function(){
	var t = this;
	t.el = $('<div id="withdrawModule" class="withdraw_module">'+
		        '<a href="#account/fundsRecord/record=withdraw" class="withdraw_record fl">提现记录</a>'+
		        '<h1 class="hd">提 现</h1>'+
		        '<div class="box">'+
		            '<div class="top">'+
		            	'<span class="title fl">可提现金额：</span>'+
		            	'<span id="bancRemaining" class="greet fl"></span>'+
		            '</div>'+
		            '<div>'+
		            	'<span class="title fl">提现银行卡：</span>'+
		            	'<div class="bank_info fl">'+
		            		'<span id="bankImg" class="bank_img fl"></span>'+
		            		'<span id="bankNu" class="bank_nu fl">5368</span>'+
		            	'</div>'+
		            '</div>'+
		            // '<p><span class="hint"></span></p>'+
		            '<div class="money_cont">'+
		            	'<span class="title fl">提现金额：</span>'+
		            	'<input type="text" id="amount" class="amount fl" placeholder="请输入提现金额"></input>'+
		            	'<span class="unit">元</span>' +
		            '</div>'+
		            '<p class="red"><span id="tip" class="tip"></span></p>'+
		        '</div>'+
		        '<button id="submit" class="btn_blue submit">提&nbsp;&nbsp;&nbsp;&nbsp;现</button>'+
		        '<div class="explanation">'+
		            '<ul>'+
		               '<li>提现说明：</li>'+
		               '<li>1、活动期间提现手续费由平台承担。</li>'+
		               '<li>2、单笔提现金额最低100元，不足100元需全部提现。</li>'+
		               '<li>3、资金将会在24小时之内转入您绑定的银行卡账户中。</li>'+
		               '<li>4、双休日和法定节假日期间，用户可申请提现，但资金托管系统暂不处理，到账时间顺延至工作日。</li>'+
		            '</ul>'+
		        '</div>'+
			'</div>');
    t.bankImg = t.el.find('#bankImg');
    t.inputAmount = t.el.find('#amount');
    t.bankNu = t.el.find('#bankNu');
    t.tip = t.el.find('#tip');
    t.bancRemaining = t.el.find('#bancRemaining');
    t.render();
};

WithdrawController.prototype = {
	render: function(){
		var t = this;
		$('#accountMain').html(t.el);
		t.inputAmount.val('');
		t.fetch();
		t.events();
	},
 
	events: function(){
        var t = this;
        t.cash = '';
        t.el.delegate('#amount','keyup',function(e){
        	var v = $(this).val();
        	if (v === '') {
				t.tip.html('');
				t.cash = '';
				return;
			} else if (!parseFloat(v)) {
				t.tip.html('请输入正确提现金额');
				t.cash = false;
				return;
			} else if (parseFloat(v) > t.amount) {
				t.cash = false;
				t.tip.html('您的可用余额不足');
				return;
			} else if (t.amount > 100 && parseFloat(v) < 100) {
				t.cash = false;
				t.tip.html('单笔提现金额最低为100元');
				return;
			}else if (t.amount < 100 && parseFloat(v) != t.amount) {
				t.cash = false;
				t.tip.html('不足100元时请全部提现');
				return;
			} else {
				t.tip.html('');
				t.cash = v;
			}
        	
        });
        t.el.delegate('#submit','click',function(e){
        	if (t.cash === '') {
        		$('#amount').val('');
				t.tip.html('请输入提现金额');
				return;
			}else if(t.cash === false){
                return;
			}
			newTab = window.open('about:blank');
        	J.Utils.sendAjax({
        	    url:J.Api.withdraw,
	        	type:'get',
	        	data: {amount: t.cash},
	        	callback:function(data){
	        		var orderId = data.orderId;
	        		J.Utils.submitForm({
        				url:data.url,
        				method:'post',
        				param:data.param,
        				windowTarget: newTab,
        				onSubmit:function(){
							J.Utils.confirm({
								content: '提现金额是否成功！',
								okValue: '提现成功',
								cancelValue: '提现失败',
								onSureCallback: function(){
	                                J.Utils.sendAjax({
						        	    url:J.Api.getWithdraw,
							        	type:'post',
							        	data: {orderId:orderId},
							        	callback:function(data){ 
							        		if(data.result){
		        	   							t.render();
							        		}else{
							        			J.DEBUG && console.log('提现接口失败！');
							        		}
							        	}
							        });  
								}
							});
        				}
        			});
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
        		t.amount = data.availableWithdrawAmount;
        		t.bancRemaining.html(J.Utils.formatAmount(data.availableWithdrawAmount,2) + '元');
        	    t.bankImg.attr('class','bank_img fl').addClass(data.bankCode);
                t.bankNu.html(data.last4BankCardNo);
        	}
        });
	}
};

WithdrawController.prototype.constructor = WithdrawController;
module.exports = WithdrawController;