var agreement = require('pc:agreement/regist');

Router.addRules({
    'register' : function () {
        J.Controllers['register'] ? J.Controllers['register'].render() : J.Controllers['register'] = new RegisterController();
    }
});

var RegisterController = function(){
	var t = this;
	t.html = '<div id="registerModule" class="register_module">'+
				'<p class="statusTitle">注册账号</p>'+
				'<div class="status bg1"></div>'+
				'<div class="statusText"><span class="statusText1 golden">基本信息</span><span class="statusText2">验证手机</span><span class="statusText3">注册成功</span></div>'+
				'<div class="statusBox3">'+
						'<div class="mtb20 finishIcon"></div>'+
						'<p class="f20 blue tac">感谢您注册九信金融</p>'+
						'<div><a class="btn_blue" href="#login">立即登录</a><a class="btn_gold" href="#home">返回首页</a></div>'+
				'</div>'+
				'<div class="statusBox2">'+
						'<p class="discription">校验码短信已经发送到您的手机，有效时间10分钟，请及时查收。</p>'+
						'<div>'+
							'<label for="verify"><span>验证码</span>'+
							'<input type="text" id="verify" placeholder="请输入验证码" /><p class="red">验证码不正确</p></label>'+
							'<button class="fr tac" id="sms"><span></span>重新获取</button>'+
						'</div>'+
						'<p class="tar"><span id="voiceWait">收不到验证码？</span><a id="voice" class="blue uLine">立即语音获取</a></p>'+
						'<button id="submit" class="submit btn_blue">提&nbsp;&nbsp;&nbsp;&nbsp;交</button>'+
				'</div>'+
				'<div class="statusBox1">'+
					'<label for="mobile" class="mt30"><span>手机号</span><input type="text" id="mobile"  placeholder="请输入手机号" /><p class="red">请输入正确的手机号码！</p></label>'+
					'<label for="password" class="mt20"><span>设置密码</span><input class="inputPlace" type="password" id="password"/><span class="placeholder">6-20位数字、字母和字符组成</span><p class="red">6-20位数字、字母和字符组成</p></label>'+
					'<label for="againPassword" class="mt20"><span>再次输入</span><input class="inputPlace" type="password" id="againPassword" /><span class="placeholder">请再次输入密码</span><p class="red">两次输入的密码不一致</p></label>'+
					'<label for="captcha" id="captcha1" class="mt20"><span>验证码</span><input type="text" id="captcha"  placeholder="请填写验证码" /><p class="red">验证码不正确</p></label>'+
					'<div class="captchaImg fr mt20"><img src="" /><div id="refresh"></div></div>'+
					'<p class="mt20 f12"><input type="checkbox" checked id="argee" value="1" />我已阅读并同意<a class="blue uLine" id="agreement">《注册服务协议》</a></p>'+
					'<button id="nextStep" class="submit btn_blue" style="margin-top:10px">下一步</button>'+
					'<p class="tar mt10">已有账号？<a href="#login" class="blue uLine">直接登录</a></p>'+
				'</div>'+
			'</div>';
	t.el = $(t.html);
    t.init();
    t.findEl();
    t.events();

};
RegisterController.prototype = {
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
		t.status.addClass('bg1').removeClass('bg3 bg2');
        t.statusText1.addClass('golden');
        t.statusText2.removeClass('golden');
        t.statusText3.removeClass('golden');
        t.statusBox1.show();
        t.statusBox2.hide();
        t.statusBox3.hide();
        t.el.find('p.red').hide();
        t.el.find('label').removeClass('bRed');
        t.el.find('input').val('');
	},
	findEl :function(){
		var t = this;
		t.nextStep = t.el.find('#nextStep');
		t.mobile = t.el.find('#mobile');
		t.password = t.el.find('#password');
		t.againPassword = t.el.find('#againPassword');
		t.captcha = t.el.find('#captcha');
		t.argee = t.el.find('#argee');
		t.verify = t.el.find('#verify');
		t.statusText1 = t.el.find('.statusText1');
		t.statusText2 = t.el.find('.statusText2');
		t.statusText3 = t.el.find('.statusText3');
		t.status = t.el.find('.status');
		t.statusBox1 = t.el.find('.statusBox1');
		t.statusBox2 = t.el.find('.statusBox2');
		t.statusBox3 = t.el.find('.statusBox3');
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
								if(data.result){
				    				resultreg = null;//true/null;验证 短信码
				    				obj.errorText = "该手机号已经注册过";
							    }else{
							    	resultreg = true;//true/null;验证 短信码
							    }
							}
						}
						J.Utils.sendAjax(params);
						return callback(obj.el,resultreg,obj);

					}else{
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
			argee:{
				el:t.argee,
				info:"请阅读并同意协议",
				otherFun:function(obj){
					if(!obj.el.attr('checked')){
			    		J.Utils.alert({
		                    content: obj.info
		                });
			    		return false;
			    	}else{
			    		return true;
			    	}
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
	    //点击下一步 触发 校验
	   //J.Common.regFun(t.regEleInfo.captcha)
	    t.el.delegate('#nextStep', 'click', function(e){//J.Common.regFun(t.regEleInfo.mobile)
	    	
	    	if(J.Common.regFun(t.regEleInfo.mobile) && 
	    	   J.Common.regFun(t.regEleInfo.password) && 
	    	   J.Common.regFun(t.regEleInfo.againPassword) && 
	    	   J.Common.regFun(t.regEleInfo.captcha) &&
	    	   t.regEleInfo.argee.otherFun(t.regEleInfo.argee)){

		    	   t.status.removeClass('bg1').addClass('bg2');
			       t.statusText2.addClass('golden');
			       t.statusBox1.hide();
			       t.statusBox2.show();

			       J.Common.timingFun(t,t.sms);
			       
				   var params = {
				   		url: J.Api.sms_voice_code,
				   		data:{'mobile':t.mobile.val(),'captchaType':'SMS','type':'register'}
				   };
				   J.Utils.sendAjax(params);
				   
	    	 }
	    });
	    t.mobile.blur(function(e){J.Common.regFun(t.regEleInfo.mobile)});
	    t.password.blur(function(e){J.Common.regFun(t.regEleInfo.password)});
	    t.againPassword.blur(function(e){J.Common.regFun(t.regEleInfo.againPassword)});
	    t.captcha.blur(function(e){J.Common.regFun(t.regEleInfo.captcha)});
	    t.verify.blur(function(e){J.Common.regFun(t.regEleInfo.verify)});

	    t.el.delegate('#submit', 'click',function(e){
	    	if(J.Common.regFun(t.regEleInfo.verify)){//J.Common.regFun(t.regEleInfo.verify)
	    		var submit = $('#submit');
	    		var params = {
	    			disabled:{
	    				on:function(){
	    					submit.removeAttr('id').css({'background':'#666','cursor':'inherit'});
	    				},
	    				off:function(){
	    					submit.attr('id','submit').css({'background':'#00205c','cursor':'pointer'});
	    				}
	    			},
					url: J.Api.register,
					data:{"mobile":t.mobile.val(),"password":t.password.val(),'verify':t.verify.val()},
					//async:'false',
					callback:function(data){
					    if(data.result){
					    	_hmt && _hmt.push(['_trackEvent', 'register', 'xiayibu',]);

	    					t.status.eq(0).removeClass('bg2').addClass('bg3');
					    	t.statusText3.addClass('golden');
					    	t.statusBox2.hide();
					    	t.statusBox3.show();
	    				}else{
	    					J.Utils.alert({
				                content: '您好：没有注册成功，请重新注册！',
				                onSureCallback:function(){
	    							t.render();
				                }
				            });
	    				}
					}
				}
				J.Utils.sendAjax(params);

	    		
		    }
	    });

	    t.el.delegate('#voice', 'click',function(e){
	    	$('#voiceWait').text('请等待语音提示，');
	    	$.post(J.Api.sms_voice_code,{'mobile':t.mobile.val(),'captchaType':'VOICE','type':'register'},function(data){
	       		console.log(data.status);
		    });
	    });

	    t.el.delegate('#refresh', 'click',function(e){
	    	t.img_code();
	    });
	    
	    //定时
	    t.el.delegate('#sms', 'click',function(e){
	    	$.post(J.Api.sms_voice_code,{'mobile':t.mobile.val(),'captchaType':'SMS','type':'register'},function(data){
	       		console.log(data.status);
		    });
	    	var ele = $(this);
	    	J.Common.timingFun(t,ele);
	    });

	    $('#agreement').click(function(){
		 	J.Utils.dialog({
		 		content: agreement,
		 		width:600,
		 		title:'注册服务协议',
		 		okValue: '已阅读并同意此协议',
		 		ok: function(){
		 			if(!$('#argee').attr('checked')){
		 				$('#argee').attr('checked',true);
		 			}
		 		}
		 	}).show();
	    });

	}

};




RegisterController.prototype.constructor = RegisterController;

module.exports = RegisterController;