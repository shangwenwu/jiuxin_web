/**
 * @project jiuxin
 * @author jialaibin
 * @version 1.0
 */
;
(function(win) {

	// 对话框组件
	// 使用说明：http://aui.github.io/artDialog/doc/index.html
	var artDialog = require('pc:dialog');

	var Utils = {
        
        //银行卡对应名称
        bankName:{
            ICBC: '中国工商银行',
            ABC: '中国农业银行',
            BOC: '中国银行',
            BCCB: '北京银行',
            BOCOM: '交通银行',
            CCB: '建设银行',
            CIB: '兴业银行',
            CMB: '招商银行',
            CEB: '光大银行',
            CMBC: '民生银行',
            CITIC: '中信银行',
            GDB: '广发银行',
            HXB: '华夏银行',
            HKBEA: '东亚银行',
            PSBC: '邮政储蓄银行',
            SPDB: '浦发银行',
            SRCB: '上海农村商业银行',
            SDBC: '深圳发展银行',
            WZCB: '温州银行'
        },
		//错误消息
		errorMsg: {
			PASSWORD_NULL: '请填写密码,不能为空字符',
			PASSWORD_LENGTH: '密码由6-20位数字和字母组成，区分大小写，不能包含空字符',
			PASSWORD_AGAIN_NULL: '请填写密码确认',
			PASSWORD_AGAIN_INVALID: '两次输入的密码不一致',
			REPASSWORD_NULL: '请填写密码确认',
			REPASSWORD_INVALID: '两次输入的密码不一致',
			MOBILE_USED: '手机号码已被使用',
			MOBILE_CAPTCHA_NULL: '请填写手机短信验证码',
			MOBILE_CAPTCHA_INVALID: '验证码无效或已过期，请尝试重新发送',
			MOBILE_CAPTCHA_EXPIRED: '验证码过期，请尝试重新发送',
			AGREEMENT_NULL: '注册需先同意服务条款',
			CAPTCHA_NULL: '请填写验证码',
			CAPTCHA_INVALID: '验证码不正确',
			MOBILE_NULL: '请填写手机号码',
			MOBILE_INVALID: '请输入正确的手机号',
			LOGINNAME_EXISTS: '用户名已存在',
			LOGINNAME_STRICT: '2至15位中英文字符、数字或下划线',
			LOGINNAME_NULL: '请填写用户名',
			LOGINNAME_INVALID: '2至15位中英文字符、数字或下划线',
			LOGINNAME_SIZE: '2至15位中英文字符、数字或下划线',
			LOGINNAME_NOT_MOBILE: '用户名不能是手机号（注册后可以用手机号登录）',
			LOGINNAME_NOT_EMAIL: '用户名不能是邮箱',
			NAME_NULL: '请填写真实姓名',
			NAME_INVALID: '真实姓名错误，应为2-15位中文汉字',
			EMAIL_NULL: '请填写电子邮箱',
			EMAIL_INVALID: '请输入正确的邮箱',
			IDNUMBER_INVALID: '请正确填写 18 位身份证号码',
			LOGIN_INVALID: '手机号或密码错误',
			INVALID_CAPTCHA: '验证码错误',
			LOGINNAME_NOT_MATCH: '手机号码与登录名不匹配',
			INVITATION_INVALID: 'H码无效',
			INVITATION_NULL: 'H码为空',
			PAYMENT_ACCOUNT_CREATE_ERROR: '国政通实名认证校验未通过',
			SMSCAPTCHA_INVALID: '验证码为6位',
			SMSCAPTCHA_NULL: '验证码不能为空',
			IDNUMBER_NULL: '身份证号不能为空'
		},

		validator: {

			checkLoginName: function(loginName, next) {
				var reg =
					/^(?!(([1][3|5|7|8][0-9]{9})|([\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+)))([0-9a-zA-Z_\u4E00-\u9FBF]+)/;

				if (!loginName || !loginName.length) {
					next(false, 'LOGINNAME_NULL');
					return;
				}

				if (loginName.length < 2 || loginName.length > 30) {
					next(false, 'LOGINNAME_SIZE');
					return;
				}

				if ( !! ('' + loginName).match(/[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+/)) {
					next(false, 'LOGINNAME_NOT_EMAIL');
					return;
				}

				if ( !! ('' + loginName).match(/^[1][3|5|7|8][0-9]{9}$/)) {
					next(false, 'LOGINNAME_NOT_MOBILE');
					return;
				}

				next(true, null);
			},

			checkRegisterName: function(registerName, next) {
				var reg =
					/^(?!(([1][3|5|7|8][0-9]{9})|([\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+)))([0-9a-zA-Z_\u4E00-\u9FBF]+)/;

				if (!registerName || !registerName.length) {
					next(false, 'LOGINNAME_NULL');
					return;
				}

				if (!('' + registerName)
					.match(reg)) {
					next(false, 'LOGINNAME_INVALID');
					return;
				}

				if (registerName.indexOf('-') >= 0) {
					next(false, 'LOGINNAME_INVALID');
					return;
				}

				if (registerName.length < 2 || registerName.length >
					30) {
					next(false, 'LOGINNAME_SIZE');
					return;
				}

				next(true, null);
			},

			checkPassword: function(password, next) {

				if (!password || !password.length) {
					next(false, 'PASSWORD_NULL');
					return;
				}

				if (password.length < 6) {
					next(false, 'PASSWORD_LENGTH');
					return;
				}

				next(true, null);
			},

			checkRePassword: function(password, repassword, next) {

				if (!repassword || !repassword.length) {
					next(false, 'REPASSWROD_NULL');
					return;
				}

				if (repassword !== password) {
					next(false, 'REPASSWORD_INVALID');
					return;
				}

				next(true, null);
			},

			checkEmail: function(email, next) {
				if (!email || !email.length) {
					next(false, 'EMAIL_NULL');
					return;
				}
				if (!('' + email).match(/[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+/)) {
					next(false, 'EMAIL_INVALID');
					return;
				}
				next(true, null);
			},

			checkMobile: function(mobile, next, require) {
				if (require === false && (!mobile || !mobile.length)) {
					next(true, null);
					return;
				}
				if (!mobile || !mobile.length) {
					next(false, 'MOBILE_NULL');
					return;
				}
				if (!('' + mobile)
					.match(/^[1][3|5|7|8][0-9]{9}$/)) {
					next(false, 'MOBILE_INVALID');
					return;
				}
				next(true, null);
			},

			checkIdNumber: function(idNumber, next) {
				idNumber = ('' + idNumber).replace(/^\s+|\s+$/g, '');
				var pcode = []; //只有这些数字开头的代码才是合法的
				pcode.push("11"); //北京
				pcode.push("12"); //天津
				pcode.push("13"); //河北
				pcode.push("14"); //山西
				pcode.push("15"); //内蒙古
				pcode.push("21"); //辽宁
				pcode.push("22"); //吉林
				pcode.push("23"); //黑龙江
				pcode.push("31"); //上海
				pcode.push("32"); //江苏
				pcode.push("33"); //浙江
				pcode.push("34"); //安徽
				pcode.push("35"); //福建
				pcode.push("36"); //江西
				pcode.push("37"); //山东
				pcode.push("41"); //河南
				pcode.push("42"); //湖北
				pcode.push("43"); //湖南
				pcode.push("44"); //广东
				pcode.push("45"); //广西
				pcode.push("46"); //海南
				pcode.push("50"); //重庆
				pcode.push("51"); //四川
				pcode.push("52"); //贵州
				pcode.push("53"); //云南
				pcode.push("54"); //西藏
				pcode.push("61"); //陕西
				pcode.push("62"); //甘肃
				pcode.push("63"); //青海
				pcode.push("64"); //宁夏
				pcode.push("65"); //新疆
				if (!~pcode.indexOf(idNumber.substring(0, 2))) {
					if (next) {
						next(false, 'IDNUMBER_INVALID');
					} else {
						return {
							success: false,
							data: 'IDNUMBER_INVALID'
						};
					}
				}

				var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9,
					10, 5, 8, 4,
					2
				];
				var validEnding = ["1", "0", "X", "9", "8", "7",
					"6", "5", "4",
					"3", "2"
				];

				if (idNumber[17] != validEnding[reduce(factor,
					function(r, n, i) {
						return r + n * ~~idNumber[i];
					}, 0) % 11]) {
					if (next) {
						next(false, 'IDNUMBER_INVALID');
					} else {
						return {
							success: false,
							data: 'IDNUMBER_INVALID'
						};
					}
				}
				if (next) {
					next(true, null);
				} else {
					return {
						success: true,
						data: null
					};
				}
			},
			checkName: function(name, next) {
				if (!name || !name.length) {
					next(false, 'NAME_NULL');
					return;
				}
				if (!('' + name)
					.match(/[\u4E00-\u9FBF]{2,15}/)) {
					next(false, 'NAME_INVALID');
					return;
				}
				next(true, null);
			},
			checkSmsCaptcha: function(sms, next) {
				if (!sms || !sms.length) {
					next(false, 'SMSCAPTCHA_NULL');
					return;
				}

				// if (sms.length !== 6) {
				//     next(false, 'SMSCAPTCHA_INVALID');
				//     return;
				// }
				next(true, null);
			}

		},

		// format amount
		formatAmount: function(s, n) {
			n = n > 0 && n <= 20 ? n : 0;
			if (s < 0) {
				var _s = 0;
				return _s.toFixed(n);
			}
			s = parseFloat((s + "")
				.replace(/[^\d\.-]/g, ""))
				.toFixed(n) + "";
			var l = s.split(".")[0].split("")
				.reverse();
			var r = s.split(".")[1];
			var t = "",
				i;
			for (i = 0; i < l.length; i++) {
				t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ?
					"," :
					"");
			}
			if (r) {
				return t.split("")
					.reverse()
					.join("") + "." + r; // 99.99
			} else {
				return t.split("")
					.reverse()
					.join("");
			}
		},

		// format percent
		formatPercent: function(percent, offset) {
			percent = percent.toString();
			if (offset === undefined || offset === null) {
				offset = 2;
			}
			if (percent.indexOf('.') === -1) {
				return percent;
			} else {
				if (offset === 0) {
					return percent.substring(0, percent.indexOf("."));
				} else {
					return percent.substring(0, percent.indexOf(".") +
						(offset +
							1));
				}
			}
		},



		// format timeElapsed 

		timeElapsed: function(timeElapsed, isobj) {
			if (timeElapsed < 0) {
				return;
			}
			var s = ~~ (timeElapsed / 1000),
				m = 0,
				h = 0,
				d = 0;
			var result = '';

			if (s > 59) {
				m = ~~ (s / 60);
				s = s % 60;
			}
			if (m > 59) {
				h = ~~ (m / 60);
				m = m % 60;
			}
			if (h > 24) {
				d = ~~ (h / 24);
				h = h % 24;
			}

			if (s < 0) {
				s = 0;
			}
			result = '<span>' + s + '</span>秒';
			if (m) {
				result = '<span>' + m + '</span>分' + result;
			}
			if (h) {
				result = '<span>' + h + '</span>时' + result;
			}
			if (d) {
				result = '<span>' + d + '</span>日' + result;
			}
			return !isobj ? result : {
				day: d,
				hour: h,
				min: m,
				sec: parseInt(s)
			};
		},

		match: {
			mobile: function(mobile) {
				var req = /^[1][3|5|7|8][0-9]{9}$/;
				return !!mobile.toString().match(req);
			},
			amount: function(amount) {
				var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
				return exp.test(amount);
			},
			email: function(email) {
				var exp = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
				return exp.test(email);
			},
			// 6到20位数字字母密码
			password: function(s) {
				return !!s.match(/[0-9a-zA-Z]{6,20}/);
			}
		},

		sendAjax: function(params) {
			$.ajax({
				url: params.url,
				type: params.type || 'POST',
				data: params.data,
				async: params.async || true,
				cache: params.cache || false,
				// contentType: false,
				dataType: 'json',
				beforeSend: function(xhr, settings) {},
				success: function(data) {
					if (data.status == 200) {
						if (params.scope) {
							params.callback && params.callback.call(params.scope, data.data);
						} else {
							params.callback && params.callback(data.data);
						}
					} else if (data.status == 401) {
						if(!params.url.match(/.*(getBasicUserInfo|getUserInfo)/) && !!location.hash.match(/^#account/i)){
                           Router.navigate('home');
						}else{
							if (params.scope) {
								params.notLoginCallback && params.notLoginCallback.call(params.scope, data.data);
							} else {
								params.notLoginCallback && params.notLoginCallback(data.data);
							}
						}
					}else if(data.status == 500){
						if(data.message){
							var para = {
									 content: data.message,
									 okValue: '确 定'
								};
							J.Utils.alert(para);
						}
					}
				},

				error: function(xhr, status, errorThrow) {
					params.errorCallback && params.errorCallback();
					console.log('请求失败')
					// common.showTip('请求失败', $('.form-tip'));
				}
			});
		},

		getUserInfo: function(options) {
			var options = {
				url: J.Api.getUserInfo,
				scopt: options.scope,
				callback: options.callback,
				notLoginCallback: options.notLoginCallback
			};
			this.sendAjax(options);
		},

		

		/**
	     格式化时间

	     @method formatTime
	     @param {string} time 时间戳.
	     @param {string} format 格式.
	     **/
		formatTime: function(time, format) {
			var time = parseInt(time);
			var d = new Date(time);
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			month = (month < 10) ? "0" + month : month;
			var date = d.getDate();
			date = (date < 10) ? "0" + date : date;
			var hour = d.getHours();
			hour = (hour < 10) ? "0" + hour : hour;
			var minute = d.getMinutes();
			minute = (minute < 10) ? "0" + minute : minute;
			var second = d.getSeconds();
			second = (second < 10) ? "0" + second : second;
			if(!format) {
				return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
			} else if(format == 'Y-M-D') {
				return year + "-" + month + "-" + date;
			} else if(format == 'Y-M') {
				return year + "-" + month;
			} else if(format == 'Y-M-D m:s') {
				return year + "-" + month + "-" + date + " " + hour + ":" + minute;
			} else {
				return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
			}
		},

		/**
	     计算若干天/月之前的日期

	     @method reduceTime
	     @param {Number} months 月份.
	     @param {Number} days 天数.
	     @serverDate 时间戳;
	     **/
		reduceTime: function (serverDate, months, days) {
			if(!serverDate || isNaN(months) || isNaN(days)) {
				return '';
			}  else {
				var cur = new Date(serverDate);
				cur.setDate(cur.getDate() - days);
				var mon = cur.getMonth() + 1,
					year = cur.getFullYear(),
					day = cur.getDate();

 				if(months != 0) {
 					if(mon > months) {
 						mon = mon - months;
 					} else {
 						--year;
 						mon = mon + 12 - months;
 					}
				}
				if(mon < 10) {
					mon = '0' + mon;
				} 
				if(day < 10) {
					day = '0' + day;
				}
				return year + '-' + mon + '-' + day;
			}
		},


		dialog: function(options) {
			return artDialog(options);
		},
		/**
		 * alert对话框
		 * @param {Object} option 配置
		 * 配置参数说明——
		 *	@param {string} content 提示内容
		 *
		 * @example
		 * 	J.Utils.alert({
		 *		content: '我是内容',
		 *		onSureCallback: function(){},
		 *		okValue: '支付成功'
		 *	})
		 */
		alert: function(config) {
			if (!config.content) {
				throw new Error('The content of alertDialog is must !');
			}
			if (config.onSureCallback && typeof config.onSureCallback !== 'function') {
				throw new Error('The onSureCallback of alertDialog is must be a function !');
			}
			var params = {
				id: 'Alert',
				fixed: true,
				title: ' ',
				width: '408',
				padding: '40px 20px 60px 20px',
				content: config.content,
				okValue: config.okValue || '确定',
				ok: function() {
					if (typeof config.onSureCallback === 'function') {
						config.onSureCallback.call(this);
					}
				}
			};
			if (config.hideClose === true) {
				params.cancel = false;
			}
			var alertDialog = artDialog(params);
			alertDialog.showModal();
		},
		/**
		 * 确认对话框
		 * @param {Object} option 配置
		 * 配置参数说明——
		 *	@param {string} content 提示内容
		 *
		 * @example
		 * 	J.Utils.confirm({
		 *		content: '我是气泡的内容',
		 *		onSureCallback: function(){},
		 *		onCancelCallback: function(){}
		 *		okValue: '支付成功',
		 *		cancelValue: '支付失败'
		 *	})
		 */
		confirm: function(config) {
			if (!config.content) {
				throw new Error('The content of confirmDialog is must !');
			}
			if (config.onSureCallback && typeof config.onSureCallback !== 'function') {
				throw new Error('The onSureCallback of confirmDialog is must be a function !');
			}
			if (config.onCancelCallback && typeof config.onCancelCallback !== 'function') {
				throw new Error('The onCancelCallback of confirmDialog is must be a function !');
			}
			var confirmDialog = artDialog({
				id: 'Confirm',
				fixed: true,
				title: ' ',
				width: '408',
				padding: '40px 20px 60px 20px',
				content: config.content,
				okValue: config.okValue || '确定',
				ok: function() {
					if (typeof config.onSureCallback === 'function') {
						config.onSureCallback.call(this);
					}
				},
				cancelValue: config.cancelValue ||  '取消',
				cancel: function() {
					if (typeof config.onCancelCallback === 'function') {
						config.onCancelCallback.call(this);
					}
				}
			});
			confirmDialog.showModal();
		},
		/**
		 * 显示气泡
		 * @param {Object} option 配置
		 * 配置参数说明——
		 *	@param {string} content 气泡提示内容
		 *	@param {HTMLElement} element 需要显示的气泡依附元素
		 * 	@param {string} position 位置
		 * 		"top", "right", "bottom", "left"
		 * 		"top left", "top right"
		 * 		"bottom left", "bottom right"
		 * 		"left top", "left bottom"
		 * 		"right top", "right bottom"
		 * @example
		 * 	J.Utils.tooltip({
		 *		element: $('.item_first')[0],
		 *		position: 'left top',
		 *		content: '我是气泡的内容',
		 *		width:
		 *	})
		 */
		tooltip: function(option) {
			var position = option.position || "top"; 	// 默认是top
			if (!option.content) {
				throw new Error('The content of tooltip is must !');
			}
			if (!option.element) {
				throw new Error('The element of tooltip is must !');
			}
			var d = J.Utils.dialog({
				id: 'tooltip',
				padding: '10px 20px',
				align: position,
				content: option.content,
				width: option.width || ''
			});
			d.show(option.element);
			return d;
		},
        /**
		*Util.submitForm({
		*   url:'',
		*	method :'post',
		*	param: {key1 : value1,key2 : value2,key3 : value3},
		*	onSubmit: function(){}
		*})
		*/
		submitForm: function(config){
            var submitForm = $('#submitForm');
			if(!submitForm.length){
				submitForm = $('<form id="submitForm" action="'+config.url+'" style="display: none;" method="'+config.method+'" target="_blank"></form>');
				$('body').append(submitForm);
			}else{
			    submitForm.attr({'action': config.url, 'method': config.method});
			}
			 submitForm.empty();
			var param = '';
			for(var k in config.param){
				param += '<input type="hidden" id="'+ k +'" name="'+ k +'" value="'+ config.param[k] +'">' 
			}
			$(param).appendTo(submitForm);
			submitForm.submit();
			config.onSubmit();
		}
	};
	win.J.Utils = Utils;
})(window);