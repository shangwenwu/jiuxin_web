
Router.addRules({
    'findpw' : function () {
        J.Controllers['findpw'] ? J.Controllers['findpw'].render() : J.Controllers['findpw'] = new FindpwController();
    }
});
var FindpwController = function(){
	var t = this;
	t.html = '<div id="findpwModule" class="findpw_module">'+
				'<p class="statusTitle">找回密码</p>'+
				'<div class="status bg1"></div>'+
				'<div class="statusText"><span class="statusText1 golden">填写手机号</span><span class="statusText2">验证身份</span><span class="statusText3">重置密码</span><span class="statusText4">成功</span></div>'+
				'<div class="statusBox4">'+
						'<div class="mtb20 finishIcon"></div>'+
						'<p class="f20 blue tac">恭喜您，成功设置新密码</p>'+
						'<p class=" blue tac">如有疑问，请拔打客户电话</p>'+
						'<p class="f25 blue tac">400-100-0099</p>'+
						'<div><a class="btn_blue" href="#login">立即登录</a><a class="btn_gold" href="#home">返回首页</a></div>'+
				'</div>'+
				'<div class="statusBox3">'+
						'<label for="password" class="mt60"><span>设置密码</span><input type="password" id="password" class="inputPlace"  /><span class="placeholder">6-20位数字、字母和字符组成</span><p class="red">请输入6-20位数字、字母和字符的组合！</p></label>'+
						'<label for="againPassword" class="mt20"><span>再次输入</span><input type="password" id="againPassword" class="inputPlace"  /><span class="placeholder">请再次输入密码</span><p class="red">两次输入的密码不一致</p></label>'+
						'<button id="submit1" class="submit btn_blue">提&nbsp;&nbsp;&nbsp;&nbsp;交</button>'+
				'</div>'+
				'<div class="statusBox2">'+
						'<p class="discription">校验码短信已经发送到您的手机，有效时间10分钟，请及时查收。</p>'+
						'<label for="card" class="mt30 cardLabel"><span>证件号</span><input type="text" id="card"  placeholder="请输入身份证号" /><p class="red">请输入正确的身份证号码！</p></label>'+
						'<div>'+
							'<label for="verify"><span>验证码</span>'+
							'<input type="text" id="verify" placeholder="请输入验证码" /><p class="red">验证码不正确</p></label>'+
							'<button class="fr tac" id="sms"><span></span>重新获取</button>'+
						'</div>'+
						'<p class="tar"><span id="voiceWait">收不到验证码？</span><a id="voice" class="blue uLine">立即语音获取</a></p>'+
						'<button id="submit" class="submit btn_blue">下一步</button>'+
				'</div>'+
				'<div class="statusBox1">'+
					'<label for="mobile" class="mt60"><span>手机号</span><input type="text" id="mobile"  placeholder="请输入手机号" /><p class="red">请输入正确的手机号码！</p></label>'+
					'<label for="captcha" id="captcha1" class="mt20"><span>验证码</span><input type="text" id="captcha"  placeholder="请填写验证码" /><p class="red">验证码不正确</p></label>'+
					'<div class="captchaImg fr mt20"><img src="" /><div id="refresh"></div></div>'+
					'<button id="nextStep" class="submit btn_blue mt30">下一步</button>'+
				'</div>'+
			'</div>';
	t.el = $(t.html);
	
    t.init();    
    t.findEl();
    t.events();
};
FindpwController.prototype = {
	init: function(){
		var t = this;
		$('#mainBody').html(t.el);
		t.img_code();
	},
	render: function(){
		var t = this;
		t.el = $(t.html);
		t.init();
		t.findEl();
    	t.events();
		//t.reset();
	},
	img_code:function(){
		$.post(J.Api.img_code,function(data){
			$("#refresh").prev().attr('src',data.data.result);
		});
	},
	reset:function(){
		var t = this;
		t.status.addClass('bg1').removeClass('bg31 bg2 bg4');
        t.statusText1.addClass('golden');
        t.statusText2.removeClass('golden');
        t.statusText3.removeClass('golden');
        t.statusText4.removeClass('golden');
        t.statusBox1.show();
        t.statusBox2.hide();
        t.statusBox3.hide();
        t.statusBox4.hide();
        t.el.find('p.red').hide();
        t.el.find('label').removeClass('bRed');
        t.el.find('input').val('');
	},
	findEl :function(){
		var t = this;
		t.card = t.el.find('#card');
		t.mobile = t.el.find('#mobile');
		t.password = t.el.find('#password');
		t.againPassword = t.el.find('#againPassword');
		t.captcha = t.el.find('#captcha');
		t.verify = t.el.find('#verify');
		t.statusText1 = t.el.find('.statusText1');
		t.statusText2 = t.el.find('.statusText2');
		t.statusText3 = t.el.find('.statusText3');
		t.statusText4 = t.el.find('.statusText4');
		t.status = t.el.find('.status');
		t.statusBox1 = t.el.find('.statusBox1');
		t.statusBox2 = t.el.find('.statusBox2');
		t.statusBox3 = t.el.find('.statusBox3');
		t.statusBox4 = t.el.find('.statusBox4');
		t.sms = t.el.find("#sms");
		t.regEleInfo = {
			mobile:{
				el:t.mobile,
				reg:/^[1][3|5|7|8][0-9]{9}$/,
				nullText:"请填写手机号码",
				errorText:"请输入正确的手机号",
				before:function(obj,callback){
					var reg = obj.el.val().match(obj.reg);
					if(reg){
						var resultreg;
						var params = {
							url: J.Api.verify_user,
							data:{'mobile':obj.el.val()},
							async:'false',
							callback:function(data){
								if(!data.result){
				    				resultreg = null;//true/null;验证 短信码
				    				obj.errorText = "该手机号未注册过";
							    }else{
							    	resultreg = true;//true/null;验证 短信码
							    }
							    
							}
						}
						J.Utils.sendAjax(params);
						return callback(obj.el,resultreg,obj);
					}else{
						t.verifyMobile = false;
						obj.errorText = "请输入正确的手机号";
						return callback(obj.el,reg,obj);
					}
				}
			},
			password:{
				el:t.password,
				reg:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]*).{6,20}$/,
				nullText:"请填写密码,不能为空字符",
				errorText:'密码由6-20位数字、字母及特殊符号组成，区分大小写，不能包含空字符'
			},
			againPassword:{
				el:t.againPassword,
				reg:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]*).{6,20}$/,
				nullText:"请填写密码确认",
				errorText:"两次输入的密码不一致",
				otherFun:function(obj){
					var el = obj.el,reg=obj.reg,nullText=obj.nullText,errorText=obj.errorText;
					if(el.val().toString() != t.password.val().toString()){
						el.parent().addClass('bRed');
			    		el.siblings('p').html(errorText).show();
			    		return false;
					}else{
						el.parent().removeClass('bRed');
						el.siblings('p').hide();
						return true;
					}
				}
			},
			card:{//身份证验证
	    		el:$('#card'),
	    		reg:/(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
	    		nullText:"身份证号不能为空",
	    		errorText:"请正确填写正确的身份证号码",
				before:function(obj,callback){//在otherFun方法前执行 idNum
					var reg = obj.el.val().match(obj.reg);
					if(reg){
						var resultreg;
						var params = {
							url: J.Api.checkIdNum,
							data:{"mobile":t.mobile.val(),'idNum':t.card.val()},
							async:'false',
							callback:function(data){
							    if(data.result){
									resultreg = true;//true/null;验证 短信码
								}else{
									resultreg = null;//true/null;验证 短信码
									obj.errorText = "不是绑定的身份证号";
								}
							}
						}
						J.Utils.sendAjax(params);
						return callback(obj.el,resultreg,obj);
					}else{
						obj.errorText = "请正确填写正确的身份证号码";
						return callback(obj.el,reg,obj);
					}
				}
	    	},
			captcha:{//图片验证码 验证
				el:t.captcha,
				reg:'',
				nullText:"请填写验证码",
				errorText:"验证码不正确",
				before:function(obj,callback){//在otherFun方法前执行

					var resultreg;
					var params = {
						url: J.Api.img_verify,
						data:{"captcha":obj.el.val()},
						async:'false',
						callback:function(data){
						    if(data.result){
								resultreg = true;//true/null;验证 短信码
							}else{
								resultreg = null;//true/null;验证 短信码
							}
						}
					}
					J.Utils.sendAjax(params);
					return callback(obj.el,resultreg,obj);
				}
			},
			verify:{//短信验证码
				el:t.verify,
				reg:'',
				nullText:'请输入短信验证码',
				errorText:'短信验证码不正确',
				otherFun:function(obj){
					var el = obj.el;
					el.parent().removeClass('bRed');
					el.siblings('p').hide();
					J.Common.timingFun(t,t.sms,'clear');
					return true;
				},
				before:function(obj,callback){//在otherFun方法前执行
					var resultreg;
					var params = {
						url: J.Api.sms_voice_verify,
						data:{"verify":obj.el.val()},
						async:'false',
						callback:function(data){
						    if(data.result){
								resultreg = true;//true/null;验证 短信码
							}else{
								resultreg = null;//true/null;验证 短信码
							}
						}
					}
					J.Utils.sendAjax(params);
					return callback(obj.el,resultreg,obj);
				}
			}
		};
	},
	events : function(){
	    var t = this;
	    t.el.on('focus', '.inputPlace', function(e){
			var me = $(this);
			if (me.val().length < 1) {
				me.siblings(".placeholder").hide();
			}
		});
	    t.el.on('blur', '.inputPlace', function(e){
			var me = $(this);
			if (me.val().length < 1) {
				me.siblings(".placeholder").show();
			}
		});
	    t.el.delegate('#nextStep', 'click', function(e){    	
	    	if(J.Common.regFun(t.regEleInfo.mobile) && 
	    		J.Common.regFun(t.regEleInfo.captcha)){
				var nextStep = $('#nextStep');
	    		var params = {
	    			disabled:{
	    				on:function(){
	    					nextStep.removeAttr('id').css({'background':'#666','cursor':'inherit'});
	    				},
	    				off:function(){
	    					nextStep.attr('id','nextStep').css({'background':'#00205c','cursor':'pointer'});
	    				}
	    			},
					url: J.Api.verify_user,
					data:{'mobile':t.mobile.val()},
					//async:'false',
					callback:function(data){
					    if(data.result){
		    				if(!data.haveIdNum){
		    					t.card.parent().hide();
		    				}
				       		t.status.removeClass('bg1').addClass('bg2');
					    	t.statusText2.addClass('golden');
					    	t.statusBox1.hide();
					    	t.statusBox2.show();
					    	$.post(J.Api.sms_voice_code,{'mobile':t.mobile.val(),'captchaType':'SMS','type':'forget'},function(data){
					       		console.log(data.status);
						    });
						    J.Common.timingFun(t,t.sms);
					    }else{
					    	J.Utils.alert({
				                content: '没有该用户！'
				            });
					    }
					}
				}
				J.Utils.sendAjax(params);


	    		
	    	}
	    });
	    t.mobile.blur(function(){J.Common.regFun(t.regEleInfo.mobile)});
	    t.captcha.blur(function(){J.Common.regFun(t.regEleInfo.captcha)});

	    t.card.blur(function(){J.Common.regFun(t.regEleInfo.card)});


	    t.password.blur(function(){J.Common.regFun(t.regEleInfo.password)});
	    t.againPassword.blur(function(){J.Common.regFun(t.regEleInfo.againPassword)});


	    t.verify.blur(function(){J.Common.regFun(t.regEleInfo.verify)});

	    t.el.delegate('#submit', 'click', function(e){ //J.Common.regFun(t.regEleInfo.card)
	    	if((t.card.parent().is(":visible") ? J.Common.regFun(t.regEleInfo.card) : true) && 
	    		J.Common.regFun(t.regEleInfo.verify)){
	    		t.status.removeClass('bg2').addClass('bg31');
		    	t.statusText3.addClass('golden');
		    	t.statusBox2.hide();t.statusBox3.show();
		    }
	    });

	    t.el.delegate('#submit1', 'click', function(e){ 
	    	if(J.Common.regFun(t.regEleInfo.password) && J.Common.regFun(t.regEleInfo.againPassword)){
	    		var submit1 = $('#submit1');
	    		var params = {
	    			disabled:{
	    				on:function(){
	    					submit1.removeAttr('id').css({'background':'#666','cursor':'inherit'});
	    				},
	    				off:function(){
	    					submit1.attr('id','submit1').css({'background':'#00205c','cursor':'pointer'});
	    				}
	    			},
					url: J.Api.find_password,
					data:{"mobile":t.mobile.val(),"password":t.password.val()},
					//async:'false',
					callback:function(data){
					    if(data.result){
	    					t.status.removeClass('bg31').addClass('bg4');
					    	t.statusText4.addClass('golden');
					    	t.statusBox3.hide();
					    	t.statusBox4.show();
	    				}else{
	    					J.Utils.alert({
				                content: '您好：没有找回，请重新找回！',
				                onSureCallback: function(){
	    							t.render();
				                }
				            });
	    				}
					}
				}
				J.Utils.sendAjax(params);

		    }
	    });

	    t.el.delegate('#voice', 'click', function(e){
	    	$('#voiceWait').text('请等待语音提示，');
	    	$.post(J.Api.sms_voice_code,{'mobile':t.mobile.val(),'captchaType':'VOICE','type':'forget'},function(data){
	       		console.log(data.status);
		    });
	    });

	    t.el.delegate('#refresh', 'click', function(e){
	    	t.img_code();
	    });

	    //定时
	    t.el.delegate('#sms', 'click',function(e){
	    	$.post(J.Api.sms_voice_code,{'mobile':t.mobile.val(),'captchaType':'SMS','type':'forget'},function(data){
	       		console.log(data.status);
		    });
	    	var ele = $(this);
	    	
	    	J.Common.timingFun(t,ele);
    		
	    });

	}
};

FindpwController.prototype.constructor = FindpwController;

module.exports = FindpwController;