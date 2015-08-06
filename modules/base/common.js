(function(w){

	var Common = {

		timingFun: function(currentObj, butEle) {
			var t = currentObj;
			var num = 59;
			if (arguments[2] == 'clear') {
				butEle.find('span').html('');
				clearInterval(t.timing);
				butEle.removeAttr("disabled");
				butEle.css({
					"background": '#af985c'
				});
			} else {
				butEle.css({
					"background": '#c2c2c2'
				});
				butEle.attr('disabled', "false");
				t.timing = setInterval(function() {
					butEle.find('span').html('(' + num + ')');

					if (num < 1) {
						butEle.find('span').html('');
						clearInterval(t.timing);
						butEle.css({
							"background": '#af985c'
						});
						butEle.removeAttr("disabled");
					}
					num--;
				}, 1000);
			}
		},

		//正则验证
		regFun: function(obj) {
			if (obj.reg instanceof Function) {
				var reg = obj.reg(obj.regString ? obj.regString : '');
			} else {
				var reg = obj.reg;
			}
			var el = obj.el,
				nullText = obj.nullText,
				errorText = obj.errorText;
			if (!(el.val())) {
				el.parent().addClass('bRed');
				el.siblings('p').html(nullText).show();
				return false;
			} else {
				var reg = el.val().match(reg);
				
				function judge(el, reg, obj) {
					if (reg == null) {
						el.parent().addClass('bRed');
						el.siblings('p').html(obj.errorText).show();
						return false;
					} else {
						if (obj.otherFun) {
							var result = obj.otherFun(obj);
							return result;
						} else {
							el.parent().removeClass('bRed');
							el.siblings('p').hide();
							return true;
						}
					}
				}
				return obj.before ? obj.before(obj, judge) : judge(el, reg, obj);

			}
		},

		//渲染表格
		renderTable: function(obj, callback) {
			if(obj.id){
				var loadingHtml = [
		            '<div class="loading">',
		                '<img src="static/pc/lib/img/loading.gif" width="40" height="40">',
		                '<p style="font-size:16px; margin-top:30px;">正在请求数据，请耐心等待！</p>',
		            '</div>'
		        ].join('');
		        $('.'+obj.id).html(loadingHtml);
	        }

			var th = obj.headTh.name || [],
				widths = obj.headTh.width || [],
				field = obj.headTh.field || [],
				format = obj.format || {},
				className = obj.className || '',
				currentPage = obj.sendData.currentPage || 1,
				pageSize = obj.sendData.pageSize || 10;

			var eachData = function(data) {
				if(!data){
                    J.DEBUG && console.log('没有数据或数据错误');
                    return;
				}
				var total = data.totalSize,
					data = data.results,
					con = '<table pageSize=' + pageSize + ' total=' + total + ' currentPage=' + currentPage + ' class=' + className + '><thead><tr>';
				if (widths.length > 0) {
					th.map(function(item, index) {
						con += '<th width="' + widths[index] + '">' + item + '</th>';
					});
				} else {
					th.map(function(item) {
						con += '<th>' + item + '</th>';
					});
				}
				con += '</tr></thead><tbody>';
				if (data.length) {
					data.map(function(item) {
						con += '<tr>'
						field.map(function(key) {
							if (format[key]) {
								con += '<td>' + format[key](item) + '</td>';
							} else {
								con += '<td>' + item[key] + '</td>';
							}
						});
						con += '</tr>'
					});
				} else {
					con += '<tr><td class="no_data" colspan="' + th.length + '">暂无数据！</td></tr>';
				}
				con += "</tbody></table>"

				callback(con,total);
			}
			if (typeof obj.dataSource == 'string') {
				var params = {
					url: obj.dataSource || '',
					data: obj.sendData ? obj.sendData : {},
					callback: function(data) {
						eachData(data);
					}
				}
				J.Utils.sendAjax(params);
			} else {
				eachData(obj.dataSource);
			};
		},

		renderInput: function(obj) {
			if (!obj.className) {
				obj.className = 'input_class';
			}
			return '<input type="' + obj.textType + '" placeholder="' + obj.placeholder + '" class="' + obj.className + '" id="' + obj.id + '" />';
		},

		renderSelect: function(obj) {
			if (!obj.className) {
				obj.className = 'select_class';
			}
			var con = '<select id="' + obj.id + '" class="' + obj.className + '" >';
			obj.option.map(function(item) {
				con += '<option value ="' + item[0] + '">' + item[1] + '</option>'
			});
			con += '</select>';
			return con;
		},

		//渲染条件筛选
		renderSifting: function(Obj, callback) {
			var data = Obj.data,
				global = Obj.className.global ? Obj.className.global : '',
				borderB = Obj.className.borderB ? Obj.className.borderB : '',
				selected = Obj.className.selected ? Obj.className.selected : '',
				con = '<div class="' + global + '">',
				len = data.length - 1;
			data.map(function(item, index) {
				con += '<div class="' + (index == len ? '' : borderB) + '"><a>' + item[0] + '</a>';
				item[1].map(function(key, index) {
					if (typeof key == 'object') {
						if (key.type == 'input') {
							var input = J.Common.renderInput(key);
							con += input;
						} else if (key.type == 'select') {
							var select = J.Utils.renderSelect(key);
							con += select;
						}
					} else {
						con += '<span index="' + (index + 1) + '" class="' + (index ? '' : selected) + '">' + key + '</span>';
					}
				});
				con += '</div>';
			})
			con += '</div>';
			callback(con);
		},

		//渲染表格分页
		renderTableFooter: function(obj, callback) {
			var currentPage = obj.currentPage || 10,
				total = obj.total,
				pageActive = obj.pageActive,
				pageSize = obj.pageSize,
				totalPage = Math.ceil(total / pageSize),
				fristPage = obj.fristPage,
				lastPage = obj.lastPage,
				prevPage = obj.prevPage,
				nextPage = obj.nextPage,
				disabledClass = obj.disabledClass;

			var start = (Math.ceil(currentPage / 5) - 1) * 5 + 1;

			var frist = currentPage == 1 ? disabledClass : '';
			var con = '<div class="' + obj.className + '">';
			//con += '<strong>总页数：'+totalPage+'</strong>';
			con += '<span  page="1" class="' + fristPage + ' ' + frist + '">首页</span><span  page="' + (currentPage - 1) + '" class="' + prevPage + ' ' + frist + '">上一页</span>';

			for (var i = start; i < start + 5; i++) {
				if (i == totalPage + 1) break;
				(i == currentPage) ? (con += '<a class="' + pageActive + '">' + i + '</a>') : (con += '<a>' + i + '</a>');
			}

			var last = currentPage == totalPage ? disabledClass : '';
			con += '<span  page="' + (Number(currentPage) + 1) + '"  class="' + nextPage + ' ' + last + '">下一页</span><span page="' + totalPage + '" class="' + lastPage + ' ' + last + '">尾页</span>';
			con += '</div>';
			callback(con);
		},
		
		getCountDownTime: function(time, serverDate, dom, one) {
			time = parseInt(time, 10);
			if (!time || time === null) {
				return;
			}

			var checkTime = function(i) {
				if (i < 10) {
					i = "0" + i;
				}
				return i;
			};

			var leftTime = time - serverDate,
				timeout = dom + 1;

			if (leftTime < 0) {
				return;
			}

			var dd = Math.floor(leftTime / 1000 / 60 / 60 / 24);
			leftTime -= dd * 1000 * 60 * 60 * 24;
			var hh = Math.floor(leftTime / 1000 / 60 / 60);
			leftTime -= hh * 1000 * 60 * 60;
			var mm = Math.floor(leftTime / 1000 / 60);
			leftTime -= mm * 1000 * 60;
			var ss = Math.floor(leftTime / 1000);
			leftTime -= ss * 1000;
			hh = checkTime(hh);
			mm = checkTime(mm);
			ss = checkTime(ss);

			var timeStr = dd ? (dd + '日 ' + hh + '时' + mm + '分' + ss + '秒') : (hh + '时' + mm + '分' + ss + '秒');
			$("#" + dom).html(timeStr);

			if (one) {
				return timeStr;
			}
		},

		chartSmallPie: function(Obj) {

			var radius = Obj.radius,
				colors = Obj.colors,
				fontObj = Obj.fontObj,
				val = Obj.val,
				dom = Obj.dom;

			var val1 = 100 - val;

			var labelTop = {
				normal: {
					color: colors[0],
					label: {
						show: true,
						formatter: '{b}'
					},
					labelLine: {
						show: false
					}
				}
			};
			var labelFromatter = {
				normal: {
					label: {
						formatter: function(params) {
							return 100 - params.value + '%'
						},
						textStyle: fontObj
					}
				}
			}
			var labelBottom = {
				normal: {
					color: colors[1],
					label: {
						position: 'center'
					},
					labelLine: {
						show: false
					}
				}
			};

			var option = {
				series: [{
					type: 'pie',
					center: ['50%', '50%'],
					radius: radius,
					x: '0%', // for funnel
					itemStyle: labelFromatter,
					data: [{
						name: 'other',
						value: val1,
						itemStyle: labelBottom
					}, {
						name: '',
						value: val,
						itemStyle: labelTop
					}],
					clockWise: false
				}],
				animation: false
			};
			var myCharts = echarts.init(dom, 'macarons');
			myCharts.setOption(option);
		},

		intervalArray: [],

		matchRoute: function(route) {
			route = route.replace(/.*\#([^/]*).*/, '$1');
			if (route) {
				$("#mainHeader").find('li').removeClass('s__is-selected');
				$("#mainHeader").find('.' + route).addClass('s__is-selected');
			}
		}

	};

	w.J.Common = Common;

})(window);