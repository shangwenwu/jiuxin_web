Router.addRules({
    'feedback' : function () {
        J.Controllers['feedback'] ? J.Controllers['feedback'].render() : J.Controllers['feedback'] = new FeedbackController();
    }
});

var FeedbackController = function(){
	var t = this;
	t.htmlText = 
		'<div id="FeedbackPageModule" class="feedback_page_module clear">' +
            '<h2 class="header">我要反馈</h2>' +
            '<p class="wel">我们期待您的意见和建议</p>' +
            '<div class="input_area"><label for="feedbackInput">如果您在使用中有任何不满，请大声的告诉我们吧!</br>我们将每天关注您的反馈，不断优化产品，为您提供更好的服务。</label>' +
            '<textarea id="feedbackInput" class="feedback_input"></textarea><p class="left_text" id="leftText"></p></div>' +
            '<div class="new_user container">' +
                '<div class="bottom_info">' +
                    '<div class="text">请留下您的联系方式，我们将在第一时间为您解决，谢谢。</div>' +
                '</div>' +
                '<div class="item clear">' +
                    '<div class="wrapper tel-wrapper">' +
                        '<label for="tel">手机号</label>' +
                        '<input type="text" class="long_input" id="tel" placeholder="请输入手机号" data-check="checkMobile">' +
                    '</div>' +
                    '<p class="err"></p>' +
                '</div>' +
                '<div class="item clear">' +
                    '<div class="wrapper">' +
                        '<label for="yzm1">验证码</label>' +
                        '<input type="text" class="yzm" id="yzm1" placeholder="请输入验证码" data-check="checkSmsCaptcha">' +
                    '</div>' +
                    '<div class="yzm_wrapper">' +
                        '<img src="">' +
                        '<a class="refresh_img" href="#" title="换一张"></a>' +
                    '</div>' +
                   ' <p class="err"></p>' +
                '</div>' +
            '</div>' +
            '<div class="old_user container">' +
                '<div class="bottom_info">' +
                    '<div class="agree"><input class="to_agree" id="toAgree" type="checkbox" checked><label for="toAgree">我同意通过注册手机号联系我</label></div>' +
                '</div>' +
                '<div class="item clear">' +
                    '<div class="wrapper">' +
                        '<label for="yzm">验证码</label>' +
                        '<input type="text" class="yzm" id="yzm" placeholder="请输入验证码" data-check="checkSmsCaptcha">' +
                   ' </div>' +
                  '<div class="yzm_wrapper">' +
                        '<img src="">' +
                        '<a class="refresh_img" href="#" title="换一张"></a>' +
                    '</div>' +
                    '<p class="err"></p>' +
                '</div>' +
            '</div>' +
            '<a class="submit" id="submit" href="#">提交</a>' +
        '</div>';
    t.init();
};
FeedbackController.prototype = {
	init: function(){
		var t = this;
        t.el = $(t.htmlText);
		$('#mainBody').html(t.el);
        t.events();
        t.refreshCaptcha();
        t.listenFun();
	},
	render: function(){
		var t = this;
		t.init();
	},

    listenFun: function(){
        var t = this;
        Transceiver.listen('userInfo','feedback.init',function(data){
            var user = JSON.parse(data);
            if(user.isLogin === false) {
                $('.old_user').hide();
                $('.new_user').show();
            }
        });
    },
	events : function(){
	    var t = this;
		t.el.delegate('#submit', 'click', function(e){
			e.preventDefault();
			var result = t.checkForm();

			if(result) {
				t.submit();
			}
		});

		t.el.delegate('#feedbackInput', 'focus', function(e){
			var me = $(this);
			if (me.val().length < 1) {
				me.siblings("label").hide();
			}
		});

		t.el.delegate('#feedbackInput', 'blur', function(e){
			var me = $(this);
			if (me.val().length < 1) {
				me.siblings("label").show();
			}
		});

        t.el.delegate('#feedbackInput', 'keyup', function(e){
            var me = $(this);
            var length = $.trim(me.val()).len();
            if(length > 100) {
                var _left = Math.max(500 - length, 0)
                $("#leftText").text(_left + '/500');
            } else {
                $("#leftText").text('');
            }
        });

        t.el.delegate('.item input', 'blur', function(e){
            var me = $(this),
                _val = $.trim(me.val());
            var check = me.attr("data-check");
            t.check(me, _val, check);
        });

        t.el.delegate('.refresh_img', 'click', function(e){
            e.preventDefault();
            t.refreshCaptcha();
        });
	},

    check: function (me, _val, check) {
        var _result,
            require = check == 'checkMobile' ? false : '';
        J.Utils.validator[check] && J.Utils.validator[check](_val, function (result, status) {
            if(result) {
                me.closest('.wrapper').removeClass('warning');
                me.closest('.wrapper').siblings('.err').hide();
            } else {
                me.closest('.wrapper').siblings('.err').text(J.Utils.errorMsg[status]).show();
                me.closest('.wrapper').addClass('warning');
            }
            _result = result;
        }, require);
        return _result;
    },

    refreshCaptcha: function () {
        $.post(J.Api.img_code, function(data){
            $(".yzm_wrapper img").attr('src',data.data.result);
        });
    },


    /**
     * 校验表单
     * @method checkLogin
     * */
	checkForm: function () {
        var text = $.trim($("#feedbackInput").val());
        if(text.length == 0) {
            J.Utils.alert({
                content: '请填写意见和建议'
            })
            return  false;
        } else if(text.length > 500) {
            J.Utils.alert({
                content: '字数不要超过500'
            })
            return false;
        }
        var t = this, checkResult = 0;
        var wrapper = t.el.find(".container:visible"),
            items = wrapper.find('.item .yzm');
        $.each(items, function(index, obj) {
            var item = $(obj),
                _val = $.trim(item.val());
            var check = item.attr("data-check");
            var result = t.check(item, _val, check);
            if(result) {
                checkResult++;
            }
        });
        if (checkResult === items.length) {
            return true;
        }
        return false;

	},

    submit: function () {
        var t= this;
        var data = {
            text: $.trim($("#feedbackInput").val())
        }
        if($('.old_user:visible').size()) {
            data.captcha = $.trim($("#yzm").val());
            data.contact = $("#toAgree").prop('checked');
        } else {
            data.mobile = $.trim($("#tel").val()) || '';
            data.captcha = $.trim($("#yzm1").val());
        }
        var options = {
            url: J.Api.feedback,
            data: data,
            callback: function(data) {
                if(data.result == true) {
                    J.Utils.alert({
                        content: '提交成功',
                        onSureCallback: function () {
                        Router.navigate('home');
                            
                        }
                    })

                } else {
                    J.Utils.alert({
                        content: '提交失败'
                    })
                }
            }
        };
        J.Utils.sendAjax(options);       
    }
};

FeedbackController.prototype.constructor = FeedbackController;
module.exports = FeedbackController;