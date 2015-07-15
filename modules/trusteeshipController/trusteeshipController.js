var agreement = require('pc:agreement/trusteeship');
var invest = require('pc:agreement/invest');

var TrusteeshipController = function(){
	var t = this;
	t.html = '<div id="trusteeshipModule" class="trusteeship_module">'+
				'<p class="statusTitle">账户托管</p>'+
				'<div class="box1">'+
					'<div class="status bg1"></div>'+
					'<div class="statusBox3">'+
							'<div class="tac mt60" >您已绑定第三方托管账户，信息如下：</div>'+
							'<div class="mt60 l25" style="width:400px;  margin:30px auto 0 auto;">'+
								'<div class="fl">资金托管账户<br>用户名<br>手机号码<br>支付密码</div>'+
								'<div class="fl" style="padding-left:20px;"><span id="account1">02000156979762</span><br><span id="accountName1">UB2015051708540004011806</span><br><span id="mobile1">18600739687</span><br>见手机短信</div>'+
							'</div>'+
							'<a href="#account/withdraw" class="submit btn_blue">前往绑定提现银行卡</a>'+
					'</div>'+
					'<div class="statusBox2">'+
							'<p class="discription tac">开通此功能才能进行投资操作，点击下一步<br>进入跳转页，请输入您手机收到的联动优势支付密码</p>'+
							'<p class="mt40 pl100"><input type="checkbox" id="argee1" value="1" /><a class="blue uLine f16" id="agreement2">《快速投资协议》</a></p>'+
							'<button id="submit" class="submit btn_blue">下 一 步</button>'+
					'</div>'+
					'<div class="statusBox1">'+
						'<p class="mt60" style="padding-bottom:10px">请填写以下信息，用于开通资金托管账户 <a class="aImg"></a><br>真实姓名需与您用于提现的银行卡账户名一致</p>'+
						'<p class="failed">验证失败</p>'+
						'<label for="userName" class="mt20"><span>真实姓名</span><input type="text" id="userName"  placeholder="请输入您的姓名" /><p class="red"></p></label>'+
						'<label for="idNumber" class="mt20"><span>身份证号</span><input type="text" id="idNumber"  placeholder="请输入身份证号码" /><p class="red"></p></label>'+
						'<p class="mt20 f12"><input type="checkbox" checked id="argee" value="1" />我已阅读并同意<a class="blue uLine" id="agreement1">《九鼎金融账户托管协议》</a></p>'+
						'<button id="nextStep" class="submit btn_blue" style="margin-top:10px">确 认</button>'+
					'</div>'+
				'</div>'+
				'<div class="box2">'+
					'<div class="tac mt60" >您已绑定第三方托管账户，信息如下：</div>'+
					'<div class="mt60 l25" style="width:400px;  margin:30px auto 0 auto;">'+
						'<div class="fl">资金托管账户<br>用户名<br>手机号码<br>支付密码</div>'+
						'<div class="fl" style="padding-left:20px;"><span id="account11">12345678901234567890123456789012</span><br><span id="accountName11">UB2015051708540004011806</span><br><span id="mobile11">18600739687</span><br>见手机短信</div>'+
					'</div>'+
				'</div>'+
			'</div>';
	t.el = $(t.html);
    t.init();
    t.getUesrInfo();
};
TrusteeshipController.prototype = {
	init: function(){
		var t = this;
		$('#accountMain').html(t.el);
		t.findEl();
    	t.events();
	},
	render: function(){
		var t = this;
		t.el = $(t.html);
		$('#accountMain').html(t.el);
		t.findEl();
    	t.events();
		t.getUesrInfo();
	},
	getUesrInfo:function(){
		var t = this;
		Transceiver.listen('userInfo','accountPandectModule.init',function(data){
			var user         = JSON.parse(data);
			if(user.isAccount){	
				t.el.find('.box1').hide().siblings('div').show();
				t.el.find("#account11").html(user.account);
				t.el.find("#accountName11").html(user.username);
				t.el.find("#mobile11").html(user.username);
			}else{
				t.el.find('.box2').hide().siblings('div').show();
			}
		});
	},
	findEl :function(){
		var t = this;
		t.userName = t.el.find('#userName');
		t.idNumber = t.el.find('#idNumber');
		t.argee = t.el.find('#argee');
		t.argee1 = t.el.find('#argee1');
		t.status = t.el.find('.status');
		t.statusBox1 = t.el.find('.statusBox1');
		t.statusBox2 = t.el.find('.statusBox2');
		t.statusBox3 = t.el.find('.statusBox3');

		t.regEleInfo = {
			userName:{
				el:t.userName,
				reg:'',
				nullText:"请输入您的姓名",
				errorText:''
			},
			idNumber:{
				el:t.idNumber,
				reg:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
				nullText:"请输入您的身份证号码",
				errorText:'身份证号码格式不正确'
			},
			argee:{
				el:t.argee,
				info:"请阅读并同意《九信金融账户托管协议》!",
				otherFun:function(obj){
					if(!obj.el.attr('checked')){
			    		var para = {
							 content: obj.info,
							 okValue: '确 认'
						};
						J.Utils.alert(para);
			    		return false;
			    	}else{
			    		return true;
			    	}
				}
			},
			argee1:{
				el:t.argee1,
				info:"请阅读并同意快速投资协议",
				otherFun:function(obj){
					if(!obj.el.attr('checked')){
			    		var para = {
							 content: obj.info,
							 okValue: '确 认'
						};
						J.Utils.alert(para);
			    		return false;
			    	}else{
			    		return true;
			    	}
				}
			}
		};
	},
	events : function(){
	    var t = this;
	    
	    t.userName.blur(function(){J.Common.regFun(t.regEleInfo.userName)});
	    t.idNumber.blur(function(){J.Common.regFun(t.regEleInfo.idNumber)});

	    
		var tooltip;
	    t.el.delegate('.aImg', 'mouseenter', function(e){
			tooltip = J.Utils.tooltip({
				element: $('.aImg')[0],
				position: 'right',
				width: '300',
				content: '<div style="text-align:left;">九信金融平台上的所有资金交易由联动优势电子商务有限公司提供第三方支付托管与结算服务;用户资金只存在于第三方支付托管平台中的托管账户中,平台无法擅自动用。</div>'
			});
	    });
		t.el.delegate('.aImg', 'mouseleave', function(e){
			tooltip.remove();
		});

	    t.el.delegate('#nextStep', 'click', function(e){ 
	    	if(J.Common.regFun(t.regEleInfo.userName) && J.Common.regFun(t.regEleInfo.idNumber) && t.regEleInfo.argee.otherFun(t.regEleInfo.argee)){
	    		//开通资金托管接口
	    		var params = {
					url: J.Api.bindTrusteeship,
					data: {
						userName:t.userName.val(),
   						idNumber:t.idNumber.val()
					},
					callback: function(data) {
						if(data.result){
							$("#account1").html(data.account);
							$("#accountName1").html(data.accountName);
							$("#mobile1").html(data.mobile);
							
							var para = {
								 content: '<div class="mobileIcon"></div><p class="tac">资金托管账户支付密码已发送到您的手机请查收</p>',
								 onSureCallback: function(){
								 		//点击知道了
										t.status.removeClass('bg1').addClass('bg2');
								    	t.statusBox1.hide();
									    t.statusBox2.show();
								 },
								 okValue: '知 道 了'
							};
							J.Utils.alert(para);

							
							
						}else{
							$('.failed').show();
						}
					}
				}
				J.Utils.sendAjax(params);

	    		
		    }
	    });

	    t.el.delegate('#submit', 'click', function(e){ 
	    	if(t.regEleInfo.argee.otherFun(t.regEleInfo.argee1)){

	    			//准备开通无密协议
		    		//J.Api.prepareBindBindAgreement
		    		var params = {
						url: J.Api.prepareBindBindAgreement,
						data: {},
						callback: function(data) {
							//打开新窗口
							J.Utils.submitForm({
								url:data.url,
								method :'post',
								param: data.param,
								onSubmit: function(){
										//弹出框 
										var obj = {
									 		content: '请在弹出的窗口上进行签署投资协议，操作完成后请确认！',
									 		onSureCallback: function(){
									 				// location.reload();
									 				t.status.removeClass('bg2').addClass('bg3');
								    				t.statusBox2.hide();
									        		t.statusBox3.show();
									 		},
									 		okValue: '确 认',
									 		cancelValue: '取消'
									 	};
										J.Utils.confirm(obj);
								}
							})
						}
					}
					J.Utils.sendAjax(params);


		    }
	    });

	    $('#agreement1').click(function(){
	    	J.Utils.dialog({
		 		content: agreement,
		 		width:600,
		 		title:'九鼎金融账户托管协议',
		 		okValue: '已阅读并同意账户托管协议',
		 		ok: true
		 	}).show();
	    });

	     $('#agreement2').click(function(){
		 	J.Utils.dialog({
		 		content: invest,
		 		width:600,
		 		title:'快速投资协议',
		 		okValue: '已阅读并同意快速投资协议',
		 		ok: true
		 	}).show();
	    });

	}
};

TrusteeshipController.prototype.constructor = TrusteeshipController;
module.exports = TrusteeshipController;