var ModifyPwdController = function(){
	var t = this;
	t.html = '<div id="modifyPwdModule" class="modifyPwd_module">'+
				'<p class="statusTitle">修改密码</p>'+
				'<p class="f18 pad100 mt30">登录密码</p>'+
				'<div class="statusBox1" style="margin:0; padding-left:200px;">'+
					'<label for="oldPassword" class="mt30"><span>原密码</span><input type="password" id="oldPassword" class="inputPlace" /><span class="placeholder">请输入原密码</span><p class="red"></p></label>'+
					'<label for="password" class="mt20"><span>设置密码</span><input type="password" id="password" class="inputPlace" /><span class="placeholder">6-20位数字、字母和字符组成</span><p class="red"></p></label>'+
					'<label for="againPassword" class="mt20"><span>再次输入</span><input type="password" id="againPassword" class="inputPlace" /><span class="placeholder">请再次输入密码</span><p class="red"></p></label>'+
					'<label for="captcha" id="captcha1" class="mt20"><span>验证码</span><input type="text" id="captcha"  placeholder="请填写验证码" /><p class="red"></p></label>'+
					'<div class="captchaImg fr mt20"><img src="" /><div id="refresh"></div></div>'+
					'<button id="submit" class="submit btn_blue mt10">确&nbsp;&nbsp;&nbsp;&nbsp;认</button>'+
				'</div>'+
				'<p class="f18 pad100 mt80">支付密码</p>'+
				'<p class="textDescript mt30">'+
					'您可以编辑短信"<span class="red">GGMM#原密码#新密码</span>"例如：(GGM-<br>'+
					'M#123456#234567)发送至联动优势修改您的支付密码，支付密码只<br>'+
					'能是6位数字。'+
				'</p>'+
				'<p class="textDescript mt20">'+
					'联动优势短信号码<br>'+
					'移动用户编辑短信发送至10658008<br>'+
					'联通用户编辑短信发送至1069013378275<br>'+
					'电信用户编辑短信发送至10690569'+
				'</p>'+
			'</div>';
	t.el = $(t.html);
    t.init();
};
ModifyPwdController.prototype = {
	init: function(){
		var t = this;
		$('#accountMain').html(t.el);
		t.imgCode();
		t.findEl();
    	t.events();
	},
	render: function(){
		var t = this;
		t.init();
	},
	findEl :function(){
		var t = this;
		t.oldPassword = t.el.find('#oldPassword');
		t.password = t.el.find('#password');
		t.againPassword = t.el.find('#againPassword');
		t.captcha = t.el.find('#captcha');
		t.regEleInfo = {
			oldPassword:{
				el:t.oldPassword,
				reg:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]*).{6,20}$/,
				nullText:"请填写密码,不能为空字符",
				errorText:'密码由6-20位数字、字母及特殊符号组成，区分大小写，不能包含空字符'
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
					$.post(J.Api.img_verify,{"captcha":obj.el.val()},function(data){
						if(data.data.result){
							var reg = true;//true/null;验证 短信码
							t.captchaResult = true;
						}else{
							var reg = null;//true/null;验证 短信码
							t.captchaResult = false;
						}
						return callback(obj.el,reg,obj);
					})
				}
			}
		};
	},
	imgCode:function(){
		var params = {
				url: J.Api.img_code,
				data: {},
				callback: function(data) {
					$("#refresh").prev().attr('src',data.result);
				}
		}
		J.Utils.sendAjax(params);
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
	    t.oldPassword.blur(function(){J.Common.regFun(t.regEleInfo.oldPassword)});
	    t.password.blur(function(){J.Common.regFun(t.regEleInfo.password)});
	    t.againPassword.blur(function(){J.Common.regFun(t.regEleInfo.againPassword)});
	    t.captcha.blur(function(){J.Common.regFun(t.regEleInfo.captcha)});

	    t.el.delegate('#submit', 'click', function(e){ 
	    	if(J.Common.regFun(t.regEleInfo.oldPassword) && J.Common.regFun(t.regEleInfo.password) && J.Common.regFun(t.regEleInfo.againPassword) && (t.captchaResult || J.Common.regFun(t.regEleInfo.captcha))){
	    		//J.Api.modifyPwd 修改密码
	    		var submit = $('#submit');
	    		var params = {
	    			disabled:{
	    				on:function(){
	    					//禁止开启行为
	    					submit.removeAttr('id').css({'background':'#666','cursor':'inherit'});
	    				},
	    				off:function(){
	    					//禁止关闭行为
	    					submit.attr('id','submit').css({'background':'#00205c','cursor':'pointer'});
	    				}
	    			},
					url: J.Api.modifyPwd,
					data: {
						oldPwd:t.oldPassword.val(),
						newPwd:t.password.val(),
						verify:t.captcha.val()
					},
					callback: function(data) {
						if(data.result){
							var con = '您好，修改密码成功！';
						}else{
							var con = '您好，修改密码失败！';
						}
						var obj = {
							 content: con,
							 okValue: '确 认',
							 onSureCallback:function(){
							 	t.el = $(t.html);
    							t.init();
							 }
						};
						J.Utils.alert(obj);
					}
				}
				J.Utils.sendAjax(params);
		    }
	    });

	    t.el.delegate('#refresh', 'click', function(e){
	    	t.imgCode();
	    });
	}
};

ModifyPwdController.prototype.constructor = ModifyPwdController;
module.exports = ModifyPwdController;