Router.addRules({
    'login' : function () {
        J.Controllers['login'] ? J.Controllers['login'].render() : J.Controllers['login'] = new LoginController();
    },

    'login/url=:url' : function (type, url) {
        var options = {url : url};
        J.Controllers['login'] ? J.Controllers['login'].render() : J.Controllers['login'] = new LoginController(options);
    }
});



var LoginController = function(options){
	var t = this;
	this.url = options && options.url || '';

	t.htmlText = '<div id="loginPageModule" class="login_page_module">'+
			    '<div class="login_container_bg"></div>'+
				'<div class="login_container"><div class="input_wrapper">' +
					'<div class="input_item username_item">' + 
						'<span class="icon username"></span>' + 
						'<input type="text" id="userName" autocomplete="off">' + 
						'<label for="userName">请输入账号</label>' + 
					'</div>' + 
					'<div class="input_item">' + 
						'<span class="icon password"></span>' + 
						'<input type="password" id="password">' + 
						'<label for="password">请输入密码</label>' + 
					'</div></div>' + 
					'<div class="other_info clear">' + 
						'<p class="err" id="loginErr"></p>' + 
						'<a href="#findpw"  class="forget_pass" rel="nofollow">忘记密码</a>' + 
					'</div>' + 
					'<div class="btns">' + 
						'<a href="#" class="login_btn" id="loginBtn" rel="nofollow">登录</a>' + 
						'<a href="#register" class="reg_btn" id="regBtn">注册</a>' + 
					'</div>' + 
				'</div>' + 
		    '</div>';
    t.init();
    require('pc:base/base64');
};
LoginController.prototype = {
	init: function(){
		var t = this;
        t.el = $(t.htmlText);
		$('#mainBody').html(t.el);
    	t.events();
    	t.listenFun();
	},
	render: function(){
		var t = this;
		t.init();
	},

	events : function(){
	    var t = this;
		t.el.delegate('#loginBtn', 'click', function(e){
			e.preventDefault();
			var result = t.checkLogin();
			if(result) {
				t.login();
			}
		});

		t.el.delegate('.input_item input', 'focus', function(e){
			var me = $(this);
			if (me.val().length < 1) {
				me.siblings("label").hide();
			}
		});

		t.el.delegate('.input_item input', 'blur', function(e){
			var me = $(this);
			if (me.val().length < 1) {
				me.siblings("label").show();
			}
		});
	},

    listenFun: function(){
        var t = this;
        Transceiver.listen('userInfo','login.init',function(data){
        	Transceiver.destroy('userInfo','login.init');
            var user = JSON.parse(data);
            if(user.isLogin) {
            	if(t.url) {
            		location.href = new Base64().decode(t.url);
            	} else {
            		location.href = '#home'
            	}
            }
        });
    },

    /**
     * 校验登录字段
     * @method checkLogin
     * */
	checkLogin: function () {
		var name = $.trim($("#userName").val()),
			pass = $.trim($("#password").val()),
			err = $("#loginErr");

		if (name.length < 1) {
			err.text("请输入账号").show();
			return false;
		} else if (pass.length < 1) {
			err.text("请输入密码").show();
			return false;
		}
		err.hide();
		return true;
	},

    /**
     * 登录
     * @method login
     * */
	login: function  () {
		var err = $("#loginErr"),
			t = this;
		var name = $.trim($("#userName").val()),
			pass = $.trim($("#password").val());
		var data = {
			username: name,
			password: pass	
		};
		var options = {
			url: J.Api.login,
			scopt: t,
			data: data,
			callback: function(data) {
				if(data.result == true) {
					if(t.url) {
						location.href = new Base64().decode(t.url);
					} else {
						location.href = '#home'
					}
				} else {
					err.text('用户名或密码错误').show();
				}
			}
		};
		J.Utils.sendAjax(options);
	}
};

LoginController.prototype.constructor = LoginController;
module.exports = LoginController;