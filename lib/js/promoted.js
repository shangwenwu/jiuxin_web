



$(function(){
    //获取验证码
    getCaptCha();
    $("#shuaxin").click(function(){
        getCaptCha();
    });

    $(document).find(".tbox").each(function () {
        $(this).focus(function cls(){
    	    $(this).parent().parent().addClass("ipt-active");
             //捕获触发事件的对象，并设置为以下语句的默认对象 
            with (event.srcElement)
             //如果当前值为默认值，则清空 
                if (value == defaultValue) value = ""
        });
    });

    $("#mobile").blur(function(){  
        $(this).parent().parent().removeClass("ipt-active");
        $this = $(this);
        var parentDom = $(this).parent().parent();
        if ($(this).val() == "") { 
            // parentDom.next().children(".c").html("手机号码不能为空！"); 
            // parentDom.next().children(".c").css("display","block"); 

            // parentDom.addClass("iptErr"); 
            with (event.srcElement)
            //如果当前值为空，则重置为默认值 
            if (value == "") value = defaultValue 
            parentDom.next().children(".c").css("display","none"); 
        	parentDom.removeClass("ipt-active");
        	parentDom.removeClass("iptErr");
            return false;
        } 

        if (!$(this).val() || !$(this).val().match(/^[1][3|5|7|8][0-9]{9}$/)) { 
            parentDom.next().children(".c").html("手机号码格式不正确！"); 
            parentDom.next().children(".c").css("display","block"); 
            parentDom.addClass("iptErr"); 
            return false; 
        } else {
            $.post(Api.verify_user,{'mobile':$(this).val()},function(data){
                var flag = data.data.result,mobile = $("#mobile").parent().parent();
                if (flag) {
                    mobile.next().children(".c").html("手机号码已占用！"); 
                    mobile.next().children(".c").css("display","block"); 
                    mobile.addClass("iptErr"); 
                    return false; 
                } else {
                    mobile.next().children(".c").html(""); 
                    mobile.next().children(".c").css("display","none"); 
                    mobile.removeClass("ipt-active");
                    mobile.removeClass("iptErr"); 
                    return true; 
                }
            });
        }
    });

    $("#pas1").blur(function(){ 
        $(this).parent().parent().removeClass("ipt-active");
        var ele = $(this).parent().parent(),
            nextDom = ele.next();
        if ($(this).val() == "") { 
            //ele.next().children(".c").html("手机号码不能为空！"); 
            //ele.next().children(".c").css("display","block"); 
            //ele.addClass("iptErr"); 
            with (event.srcElement)
            //如果当前值为空，则重置为默认值 
            if (value == "") value = defaultValue 
            nextDom.children(".c").css("display","none"); 
            ele.removeClass("ipt-active");
            ele.removeClass("iptErr");return false;
            return false; 
        } 
        if(!$(this).val().match( /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]*).{6,20}$/)){
            nextDom.children(".c").css("display","block");
            nextDom.children(".c").html("密码由6-20位数字、字母和字符组成");
            ele.addClass("iptErr"); 
            return false;   
        }else{
            nextDom.children(".c").html("");
            nextDom.children(".c").css("display","none"); 
            ele.removeClass("iptErr");
            return true; 
        }
    });

    $("#pas2").blur(function(){ 
        $(this).parent().parent().removeClass("ipt-active");
        var ele = $(this).parent().parent(),
            nextDom = ele.next();
        if ($(this).val() == "") {
            with (event.srcElement)
            //如果当前值为空，则重置为默认值 
            if (value == "") value = defaultValue
            nextDom.children(".c").css("display","none"); 
            ele.removeClass("ipt-active");
            ele.removeClass("iptErr");
            return false; 
        }
        if($(this).val() != $("#pas1").val() ){
            nextDom.children(".c").html("密码与上次输入不一致");
            nextDom.children(".c").css("display","block"); 

            ele.addClass("iptErr");return false; 
        }else{
            nextDom.children(".c").html("");
            nextDom.children(".c").css("display","none"); 
            ele.removeClass("iptErr");
            $("#pas2ErrUl").parent().parent().removeClass("iptErr");return true;
        }
    });
    	 
    $("#code").blur(function(){ 
        var ele = $(this).parent().parent(),
            nextDom = ele.next();
        ele.removeClass("ipt-active");
        if(!$(this).val()){
            nextDom.next().children(".c").css("display","block");
            nextDom.next().children(".c").html("请输入短信验证码!");
            ele.addClass("iptErr"); 
            with (event.srcElement)
            //如果当前值为空，则重置为默认值 
            if (value == "") value = defaultValue
            return false; 
        }else{
            //手机短信验证
            var btnSendCode = $('#btnSendCode');
            $.post(Api.sms_voice_verify,{"verify":$("#code").val()},function(data){
                if(data.data == null){
                        nextDom.next().children(".c").css("display","block");
                        nextDom.next().children(".c").html("短信验证码不正确!");
                        ele.addClass("iptErr"); 
                }else{
                    if(data.data.result){
                        window.clearInterval(InterValObj);//停止计时器
                        btnSendCode.removeAttr("disabled");//启用按钮
                        btnSendCode.attr("class", "btn-code");
                        btnSendCode.val("重新获取");
                        nextDom.next().children(".c").html("");
                        nextDom.next().children(".c").css("display","none"); 
                        ele.removeClass("iptErr");
                    }else{
                        nextDom.next().children(".c").css("display","block");
                        nextDom.next().children(".c").html("短信验证码不正确!");
                        ele.addClass("iptErr"); 
                        window.clearInterval(InterValObj);//停止计时器
                        btnSendCode.removeAttr("disabled");//启用按钮
                        btnSendCode.attr("class", "btn-code");
                        btnSendCode.val("重新获取");
                    }
                }
            });
        }

    });

    $('#captcha').blur(function(){
            checkCaptcha();
    });
	 
	 $("#btn-reg").click(function(){
		 
		 if (!$("#mobile").val() || !$("#mobile").val().match(/^[1][3|5|7|8][0-9]{9}$/)){ 
            $("#mobile").parent().parent().next().children(".c").html("手机号码为空或格式不正确！"); 
            $("#mobile").parent().parent().next().children(".c").css("display","block"); 
            $("#mobile").parent().parent().addClass("iptErr"); 
             return false;
        };

        if(!$("#pas1").val().match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]*).{6,20}$/))
        {
			$("#pas1").parent().parent().next().children(".c").css("display","block");
            $("#pas1").parent().parent().next().children(".c").html("密码只能是6-20位的数字、字母和字符的组合！");
			$("#pas1").parent().parent().addClass("iptErr"); 
			return false;
        }
		
		if( $("#pas2").val() != $("#pas1").val() )
        {
			$("#pas2").parent().parent().next().children(".c").css("display","block");
            $("#pas2").parent().parent().next().children(".c").html("密码与上次输入不一致！");
			$("#pas2").parent().parent().addClass("iptErr"); 
			return false;
        }

        if (!$('#code').val()) {
            $("#code").parent().parent().next().children(".c").css("display","block");
            $("#code").parent().parent().next().children(".c").html("短信验证码不能为空！");
            $("#code").parent().parent().addClass("iptErr"); 
            return false;
        }
        var userData = {
            "mobile":$("#mobile").val(),
            "password":$("#pas1").val(),
            'verify':$.trim($('#code').val())
        },
        loginData={
            "loginName": $("#mobile").val(),
            "password": $("#pas1").val()
        };
        
        $.post(Api.register,userData,function(data){
            regCallback(loginData, data.data);
        });
		 
	});
	//
    $('#btnSendCode').click(
        function(){
            if (!$("#mobile").val() || !$("#mobile").val().match(/^[1][3|5|7|8][0-9]{9}$/)) { 
                $("#mobile").parent().parent().next().children(".c").html("手机号码为空或格式不正确！"); 
                $("#mobile").parent().parent().next().children(".c").css("display","block"); 
                $("#mobile").parent().parent().addClass("iptErr"); 
                 return false;
            }
            sendMessage();
            
        }
    ); 
	 
});

var captchaData = {};
var getCaptCha = function() {
    var self = this;
    $.post(Api.img_code,function(data){
        $("#captchaImg").attr('src',data.data.result);
    });
};

var checkCaptcha = function(){
    
    captchaData.captcha = $('#captcha').val();
    var captchaDom =  $("#captcha").parent().parent();
    if(!captchaData.captcha){
        captchaDom.next().next().children(".c").html("图片验证码不能为空！"); 
       captchaDom.next().next().children(".c").css("display","block"); 
       captchaDom.addClass("iptErr"); 
       return false;
    }else{
        $.post(Api.img_verify,captchaData,function(data){
            if (!data.data.result) {
                if ($("#captcha").val().trim().length != 6) { 
                   captchaDom.next().next().children(".c").html("图片验证码不正确！"); 
                   captchaDom.next().next().children(".c").css("display","block"); 
                   captchaDom.addClass("iptErr"); 
                   return false;
                }
            }else {
                captchaDom.next().next().children(".c").html(""); 
                captchaDom.next().next().children(".c").css("display","none"); 
                captchaDom.removeClass("iptErr"); 
            }
        });
    }
}

var regCallback = function (user, r, error) {
    var self = this;
    self.loginName = user.loginName;
    self.password = user.password;
    if(r == null){
        alert('输入信息有误，请认真填写！');
    }else{
        if (r.result) {
            //自动登录
            var data = {
                username: self.loginName,
                password: self.password,
                channel: 'WEB'
            };
            $.post(Api.login,data,function(data){
                if (data.data.result) {
                    location.href = '/#account/trusteeship';
                } else {
                    location.href = '/#login';
                }
            });
        } else {
           alert('输入信息有误，请认真填写！');
           //location.reload();
        }
    }
};


var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数

function sendMessage() {
  　curCount = count;
    var btnSendCode = $("#btnSendCode"),codeDom = $("#code").parent().parent();
　　//设置button效果，开始计时
     btnSendCode.attr("disabled", "true");
	 btnSendCode.attr("class", "btn-code-disable");
     btnSendCode.val("(" + curCount + ")重新获取");
     codeDom.next().next().children(".c").html(""); 
     codeDom.next().next().children(".c").css("display","none"); 
     codeDom.removeClass("iptErr"); 

     $.post(Api.sms_voice_code,{'mobile':$("#mobile").val(),'captchaType':'SMS','type':'register'},function(data){
            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
     });
}

//timer处理函数
function SetRemainTime() {
    var btnSendCode = $("#btnSendCode");
    if (curCount == 0) {                
        window.clearInterval(InterValObj);//停止计时器
        btnSendCode.removeAttr("disabled");//启用按钮
		btnSendCode.attr("class", "btn-code");
        btnSendCode.val("重新获取");
    }
    else {
        curCount--;
        btnSendCode.val("(" + curCount + ")重新获取");
    }
}