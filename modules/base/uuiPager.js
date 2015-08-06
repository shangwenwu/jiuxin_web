/*
 * @uuiPager.js 分页组件
 * @author liang.tang
 * @time 2014-07-07
 **/

/**
 给jQuery添加可直接操作uui的接口，以支持链式语法

 @module base
 @author sogou ufo team
 **/
(function($) {
	window.uuiJQuery = $;
	/**
	 *继承，类继承，即父类有子类没有的才继承
	 *
	 *@param target 子类
	 *@param obj 父类
	 *@method myExtend
	 * */

	function myExtend(target, obj) {
		for (var i in obj) {
			if (target[i]) continue;
			target[i] = obj[i];
		}
	};
	var os = {};

	function detect(ua) {
		var webkit = ua.match(/WebKit\/([\d.]+)/),
			android = ua.match(/(Android)\s+([\d.]+)/),
			ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
			iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
			webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
			touchpad = webos && ua.match(/TouchPad/),
			kindle = ua.match(/Kindle\/([\d.]+)/),
			silk = ua.match(/Silk\/([\d._]+)/),
			blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/)

			// todo clean this up with a better OS/browser
			// separation. we need to discern between multiple
			// browsers on android, and decide if kindle fire in
			// silk mode is android or not

			//if (browser.webkit = !!webkit) browser.version = webkit[1]

			if (android) os.android = true, os.version = android[2]
			if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
			if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
			if (webos) os.webos = true, os.version = webos[2]
			if (touchpad) os.touchpad = true
		if (blackberry) os.blackberry = true, os.version = blackberry[2]
		if (kindle) os.kindle = true, os.version = kindle[1]
		//if (silk) browser.silk = true, browser.version = silk[1]
		//if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
	};
	if (!$.os) {
		detect(navigator.userAgent);
	} else {
		os = $.os;
	}

	var xy
	uiDict = {};

	function getScroll() {
		return {
			top: (document.body.scrollTop || document.documentElement.scrollTop),
			left: (document.body.scrollLeft || document.documentElement.scrollLeft)
		}
	};

	function getEPos(e) {
		var scroll = getScroll();
		return {
			clientX: e.clientX,
			clientY: e.clientY,
			left: e.clientX + scroll.left,
			top: e.clientY + scroll.top
		}
	};

	function S4() {
		return Math.floor(Math.random() * 0x10000).toString(16);
	};
	// 判断是否是mobile
	var ismobile = os && os.version;
	// mobile重写getEPos
	if (ismobile) {
		var tmp = getEPos;
		getEPos = function(e) {
			// e是jQuery event
			var e = e.originalEvent;
			if (e.touches) return tmp(e.touches[0])
			return tmp(e);
		}
	};
	/**
     Returns this，以支持链式语法，同时将缓存到dom上的ui实例注入到jQuery对象里，经此调用后的jQuery实例将失去之前筛选的dom队列

     @method $.fn.getUUI
     @return ui list
     @example $('.datepicker').getUUI();
     **/
	$.fn.getUUI = function(uiName) {
		var arr = [];
		var uiName = uiName || this.uiName;
		this.each(function(i, dom) {
			//this.tmp.push(dom);
			var un = $(dom).data(uiName);
			if (un && uiDict[un]) {
				arr.push(uiDict[un]);
			}
		});
		return arr;
	};
	/**
     链式方式调用组件方法，不会返回执行结果

     @method $.fn.excUUICMD
     @param {String} cmd api名.
     @param {Object} options 传递给api的参数.
     @example $('.datepicker').excUUICMD('setDate','2012-09-04');
     **/
	$.fn.excUUICMD = function(cmd, options) {
		var uis = this.getUUI(this.uiName);
		$.each(uis, function(i, ui) {
			ui.excUUICMD && ui.excUUICMD(cmd, options);
		});
		return this;
	};
	/**
     通过$.UUIBase.createSgUI创建一个UI组件

     @namespace jQuery
     @class $.UUIBase
     **/
	$.UUIBase = {
		ismobile: ismobile,
		/**
		 * 阻止冒泡
		 *
		 * @method stopPropagation
		 **/
		stopPropagation: function(event) {
			event.stopPropagation && event.stopPropagation();
			event.cancelBubble = true;
		},
		preventDefault: function(event) {
			if (event && event.preventDefault)
				event.preventDefault();
			else
				window.event.returnValue = false;
			return false;
		},
		/**
		 * 获取滚动条高度
		 *
		 * @method getScroll
		 * */
		getScroll: getScroll,
		/**
		 * 计算鼠标位置
		 *
		 * @method getEPos
		 * @return {Object} {left:,top:,clientX:,clientY}
		 * */
		getEPos: getEPos,
		/**
		 * 生成唯一数
		 *
		 * @method guid
		 * @return {Number} 唯一随机数
		 * */
		guid: function() {
			return (
				S4() + S4() +
				S4() + S4() +
				S4() + S4() +
				S4() + S4()
			);
		},
		/**
		 * 返回mousemove更新的鼠标位置
		 *
		 * @return {Object} {left:,top:,clientX:,clientY}
		 * */
		getMousePos: function() {
			return xy
		},
		/**
		 * 清空选中
		 *
		 * @method empty
		 * */
		empty: function() {
			if (document.selection && document.selection.empty) {
				document.selection.empty();
			} else if (window.getSelection) {
				window.getSelection().removeAllRanges();
			};
		},
		/**
		 * 计算元素的offset,height,width
		 *
		 * @method offset
		 * */
		offset: function($this) {
			return $.extend({
				width: $this.width(),
				height: $this.height()
			}, $this.offset())
		},
		// 路由移动和pc的事件，如果是mobile，则将mousedown => touchstart, mouseup => touchend, mousemove => touchmove, mouseover => touchstart
		eventHash: {
			mousedown: ismobile ? 'touchstart' : 'mousedown',
			mousemove: ismobile ? 'touchmove' : 'mousemove',
			mouseover: ismobile ? 'touchstart' : 'mouseover',
			mouseup: ismobile ? 'touchend' : 'mouseup',
			click: 'click'
		},
		baseClass: {
			/**
             每个UI都会继承的方法，用于以命令行形式调用ui的接口

             @method excUUICMD
             @param {String} cmd ui接口名字.
             @param {Object} options 传递给接口的参数，必须是key=>value形式.
             @return 返回接口执行结果.
             @protected
            **/
			excUUICMD: function(cmd, options) {
				if (this[cmd]) {
					this[cmd](options);
				}
				if (cmd == 'destroy') {
					this._destroy(options);
				}
			},
			/**
			 * 存储事件队列
			 *
			 * @property eventList
			 * @type Array
			 * */
			//eventList: [],
			/**
			 * 封装的事件绑定
			 *
			 * @method on
			 * @param {Object} $this jQuery实例
			 * @param {String} event 事件名字
			 * @param {String | Function} query 当query和handle参数同时出现的时候，query是选择器，事件绑定会走代理，否则query是handle
			 * @param {Function} handle 回调
			 * @return {arguments} 将传入的参数返回，用于销毁
			 * */
			on: function($this, event, query, handle) {
				// 实现事件pc和mobile的路由
				arguments[1] = this.eventName(event);
				this.eventList ? this.eventList.push(arguments) : this.eventList = [arguments];
				$this.on.apply($this, Array.prototype.slice.call(arguments, 1));
				// 返回参数
				return arguments;
			},
			/**
			 * 路由事件名称，实现mobile和pc透明封装
			 * @method eventName
			 * @param {String} eventName
			 * @return {String} eventName
			 * */
			eventName: function(eventName) {
				return $.UUIBase.eventHash[eventName] || eventName;
			},
			/**
			 * 移除绑定的事件，参数必须是通过组建on方法绑定事件的返回值
			 *
			 * @method off
			 * @param {arguments} onReturn 通过on方法绑定的事件的返回值
			 * */
			off: function(onReturn) {
				var o = onReturn[0],
					_ = this;
				o.off.apply(o, Array.prototype.slice.call(onReturn, 1));
				$.each(this.eventList, function(i, arg) {
					if (onReturn == arg) _.eventList.splice(i, 1);
				});
			},
			/**
			 *每个UI都继承的自我销毁逻辑，另可各自实现destroy逻辑，因为每个组件可能需要有自己额外销毁逻辑
			 *
			 *@method _destroy
			 *
			 * */
			_destroy: function() {
				if (!this.eventList) return;
				$.each(this.eventList, function(j, evtSingle) {
					evtSingle[0].off.apply(evtSingle[0], Array.prototype.slice.call(evtSingle, 1));
				})
			}
		},
		data: {},
		css: [],
		/**
         将js内的css注入到页面里，暂时只针对mobile做此处理

         @method $.UUIBase.init
         @example $.UUIBase.init()
         * */
		init: function() {
			if ($.UUIBase.css.length) {
				var cssText = $.UUIBase.css.join('');
				if (cssText == '') return;
				var style = document.createElement('style');
				style.setAttribute('type', 'text/css');
				style.innerHTML = cssText;
				$('head').append(style);
				$.UUIBase.css = [];
				$.UUIBase.data = [];
			}
		},
		/**
         创建一个uui，将其注册到jQuery上面

         @method $.UUIBase.create
         @param {String} uiName 组件名.
         @param {Function} classCode 组件代码.
          @example $.UUIBase.create('datepicker',function($this,options){xxxx});
         **/
		create: function(uiName, classCode) {
			$[uiName] = classCode;
			// 继承基类，如果子类有该方法的实现，则不继承该方法
			myExtend($[uiName].prototype, $.UUIBase.baseClass);
			$.fn[uiName] = function(options) {
				var _options = options || {};
				this.uiName = uiName;
				this.each(function(i, item) {
					var un = $(item).data(uiName);
					// 已经存在一个
					if (un) {
						if (_options.destroy) {
							// 移除
							uiDict[un].excUUICMD('destroy', _options);
							delete uiDict[un];
							$(item).removeData(uiName);
						} else
						// 如果传递了!false的options，则更新ui，否则只是实现获取ui
							options && uiDict[un].excUUICMD('update', _options);
					} else if (!_options.destroy) {
						// 新建，默认enable
						if (_options.enable === undefined && _options.disable === undefined)
							_options.enable = true;

						un = uiName + (+(new Date()));
						$(item).data(uiName, un);
						uiDict[un] = new $[uiName]($(item), _options);
					}
				});
				if (_options.instance)
				// 返回uilist 
					return this.getUUI();
				return this;
			};
		}
	};
	$(function() {
		$(document).on($.UUIBase.eventHash['mousemove'], function(e) {
			xy = getEPos(e);
		});
		// 由于手机没有鼠标，因此需要在touchstart的时候更新一下xy的位置
		ismobile && $(document).on($.UUIBase.eventHash['mousedown'], function(e) {
			xy = getEPos(e);
		});
	});
})(jQuery);
/**
 * 表单验证组件
 * @module uuiPager
 * @author tanngliang
 **/
(function($) {
	/**
	 * 实现元素的可拖动功能
	 * @class $.fn.uuiPager
	 * @constructor 分页
	 * @param {jQuery} $this .
	 * @param {Object} options 默认配置.
	 * @param {Number} options.currentPage 当前页，也即初始化后所处的页面.
	 * @param {Number} options.totalPage 总页数.
	 * @param {Number} options.pageSize 每页显示的页码数，如pageSize为9时，初始页面能够显示1-9页和最末页的页码，其他页码需要往下翻才能看见.
	 * @param {String} options.nextPage 下一页.
	 * @param {String} options.prePage 上一页.
	 * @param {String} options.prePageClassName 上一页的ClassName.
	 * @param {String} options.nextPageClassName 下一页的ClassName.
	 * @param {String} options.currentPageClassName 当前页的ClassName.
	 * @param {String} options.normalPageClassName 普通页的ClassName.
	 * @param {String} options.morePageClassName 省略符的ClassName.
	 * @param {Function} options.pageChange 页码改变时的响应函数.
	 * @example $('.uuiPager').uuiPager({enable:0}).
	 * */
	// 默认配置
	var _options = {
		currentPage: 1,
		totalPage: 1,
		pageSize: 7,
		nextPage: "下一页",
		prePage: "上一页"
	};

	function uuiPager($this, options) {
		// 拓展默认配置        
		this.processOpt(options);
		$(this.opt.target).empty();

		//生成链接
		this.returnLink = function(classaName, href, innerHTML) {
			if (href == "") return $("<span class=" + classaName + " >" + innerHTML + "</span>");
			else return $("<a class=" + classaName + " href=" + href + ">" + innerHTML + "</a>");
		};
		// 链接配置 
		this.link = {
			start: this.returnLink(this.opt.prePageClassName, "#", this.opt.prePage),
			end: this.returnLink(this.opt.nextPageClassName, "#", this.opt.nextPage),
			first: this.returnLink(this.opt.normalPageClassName, "#", 1),
			last: this.returnLink(this.opt.normalPageClassName, "#", this.opt.totalPage),
			more: this.returnLink(this.opt.morePageClassName, "", "...")
		};

		if(this.opt.totalPage > 1) {
			this.update(this.opt);
		}
	};
	uuiPager.prototype = {
		processOpt: function(options) {
			this.opt = {
				currentPage: Math.max(options.currentPage, 1),
				totalPage: Math.max(options.totalPage, 1),
				pageSize: options.pageSize || 10,
				nextPage: options.nextPage || _options.nextPage,
				prePage: options.prePage || _options.prePage,
				target: options.target,
				prePageClassName: options.prePageClassName,
				nextPageClassName: options.nextPageClassName,
				currentPageClassName: options.currentPageClassName,
				morePageClassName: options.morePageClassName,
				normalPageClassName: options.normalPageClassName,
				pageChange: options.pageChange
			}
		},
		/**
		 * 计算页码的起始和结束值
		 * @method getRange
		 * @returns {Array}
		 */
		getRange: function() {
			var ne_half = Math.floor(this.opt.pageSize / 2);
			var upper_limit = this.opt.totalPage - this.opt.pageSize;
			var start = this.opt.currentPage > ne_half ? Math.max(Math.min(this.opt.currentPage - ne_half, upper_limit), 1) : 1;
			var end = this.opt.currentPage > ne_half ? Math.min(parseInt(this.opt.currentPage) + parseInt(ne_half), this.opt.totalPage) : Math.min(this.opt.pageSize, this.opt.totalPage);
			return {
				start: start,
				end: end
			};
		},
		/**
		 * 返回创建的节点
		 * @param {Number} page_id
		 * @returns {object} 返回创建的链接
		 */
		createLink: function(page_id) {
			var lnk, np = this.opt.totalPage,
				current_page = this.opt.currentPage;
			page_id = page_id < 1 ? 1 : (page_id < np ? page_id : np);
			if (page_id == current_page) {
				return this.returnLink(this.opt.currentPageClassName, "", page_id);
			} else {
				return this.returnLink(this.opt.normalPageClassName, "#", page_id);
			}
		},
		/**
		 * 给container添加子节点
		 * @param {Object} container
		 * @param {Number} current_page
		 * @param {Number} start
		 * @param {Number} end
		 */
		appendRange: function(start, end) {
			var i, container = $(this.opt.target);
			if (this.opt.currentPage != 1) {
				$(this.link.start).appendTo(container);
			}
			if (start != 1) {
				$(this.link.first).appendTo(container);
				if (start > 2) {
					$(this.returnLink(this.opt.morePageClassName, "", "...")).appendTo(container);
				}
			}
			for (i = start; i <= end; i++) {
				this.createLink(i).appendTo(container);
			}
			if (parseInt(this.opt.totalPage) - parseInt(end) >= Math.floor(this.opt.pageSize / 2)) {
				$(this.link.more).appendTo(container);
			}
			if (end != this.opt.totalPage) {
				$(this.link.last).appendTo(container);
			}
			if (this.opt.currentPage != this.opt.totalPage) {
				$(this.link.end).appendTo(container);
			}
		},
		/**
		 * 翻页操作
		 * @param {Number} currentPage
		 */
		selectPage: function() {
			$(this.opt.target).empty();
			if(this.opt.totalPage > 1) {
				var range = this.getRange();
				this.appendRange(range.start, range.end);				
			}
			var that = this;
			this.on($(this.opt.target + " a"), "click",
				function() {
					var className = $(this).attr("class");
					if (className == that.opt.prePageClassName) {
						--that.opt.currentPage;
						that.selectPage();
					} else if (className == that.opt.nextPageClassName) {
						++that.opt.currentPage;
						that.selectPage();
					} else if (className == that.opt.normalPageClassName) {
						that.opt.currentPage = this.innerHTML;
						that.selectPage();
					}
					that.opt.pageChange(that.opt.currentPage);
					return false;
				});
		},
		/**
		 * 更新实例实现，请通过$('.uuiPager').uuiPager({xxxx})调用
		 * @method update
		 * */
		update: function(options) {
			this.processOpt(options);
			this.link = {
				start: this.returnLink(this.opt.prePageClassName, "#", this.opt.prePage),
				end: this.returnLink(this.opt.nextPageClassName, "#", this.opt.nextPage),
				first: this.returnLink(this.opt.normalPageClassName, "#", 1),
				last: this.returnLink(this.opt.normalPageClassName, "#", this.opt.totalPage),
				more: this.returnLink(this.opt.morePageClassName, "", "...")
			};
			// if(this.opt.totalPage > 1) {
				this.selectPage();
			// }			
		},
		/**
		 * @method destroy
		 * */
		destroy: function() {
			$(this.opt.target).empty();
		}
	};
	$.UUIBase.create('uuiPager', uuiPager);
	// 创建css
	$($.UUIBase.init);
})(jQuery);