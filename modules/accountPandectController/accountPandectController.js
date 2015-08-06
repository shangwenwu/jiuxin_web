
var AccountPandectController = function(){
	var t = this;

	t.el = $('<div id="accountPandectModule" class="accountPandect_module">'+
				'<div class="userInfo color1 f14 bg5">'+
					'<div class="fl">'+
						'<p>上次登录：<span id="lastLoginTime">2015年05月15日 21:34</span></p>'+
						'<div><div>账户安全级别</div><div class="rank bg3"><div class="bg1" id="safeLevel"></div></div><div id="Level">低</div></div>'+
						'<ul><li class="nomobile" id="isBindPone"></li><li class="nopay" id="isAccount"></li><li id="isBindCard" class="nocard"></li></ul>'+
					'</div>'+
					'<div class="fr tar" style="margin-right:75px;">'+
						'<p>可用余额（元）：<span class="color3 f30" id="leftMoney">99,999,999.00</span></p>'+
						'<a class="bg1" href="#account/recharge">充&nbsp;&nbsp;值</a><a class="bg2" href="#account/withdraw">提&nbsp;&nbsp;现</a>'+
					'</div>'+
				'</div>'+
				'<div class="pie_calendar mt20 bg5 f14 color1">'+
					'<div class="pie">'+
						'<p><span>总资产：<font class="f18 color2 totalAmount">10,000</font>元</span><span class="fr" style="width:155px;">累计收益：<font class="f18 color2 totalEarnings">10,000</font>元</span></p>'+
						'<div class="pie_block mt20" style="width:100px; height:100px;"></div>'+
						'<div class="pie_description">'+
							'<div class="f12"><div class="bg1"></div>可用余额：<span class="availableBalance">10,000</span>元</div>'+
							'<div class="f12"><div class="bg4"></div>待收本息：<span class="dueinInterest">10,000</span>元</div>'+
							'<div class="f12"><div class="bg2"></div>冻结资金：<span class="frozenAmount">10,000</span>元</div>'+
						'</div>'+
					'</div>'+
					'<!--div class="calendar fr"></div-->'+
				'</div>'+
				'<div class="curve mt20 bg5 fl">'+
					'<p class="f20 color3">收&nbsp;&nbsp;益</p>'+
					'<div class="color1 mt10 f14">累计收益(元)<br>￥<span class="f18 color3 totalEarnings">220.80</span></div>'+
					'<div class="color1 mt10 f14">近一个月收益(元)<br>￥<span class="f18 color3 lastMonth">10.20</span></div>'+
					'<div class="color1 mt10 f14">待收收益(元)<br>￥<span class="f18 color3 dueinEarnings">510.20</span></div>'+
					'<a class="f14 bg1" index="pic1_0">待收收益</a><a index="pic1_1"  class="f14 bg3">累计收益</a>'+
					'<div id="pic1" class="pic pic1 mt20"></div>'+
					'<div id="pic2" class="pic pic1 mt20" style=" display:none;"></div>'+
				'</div>'+
				'<div class="curve mt20 bg5 fr">'+
					'<p class="f20 color3">投&nbsp;&nbsp;资</p>'+
					'<div class="color1 mt10 f14">累计投资(元)<br>￥<span class="f18 color3 totalInvest">220.80</span></div>'+
					'<div class="color1 mt10 f14">在投项目(个)<br><span class="f18 color3 investProject">10</span></div>'+
					'<div class="color1 mt10 f14">待收本金(元)<br>￥<span class="f18 color3 dueinPrincipal">510.20</span></div>'+
					'<a class="f14 bg1" index="pic2_0">待收本金</a><a index="pic2_1"  class="f14 bg3">累计本金</a>'+
					'<div id="pic3" class="pic pic2 mt20"></div>'+
					'<div id="pic4" class="pic pic2 mt20" style=" display:none;"></div>'+
				'</div>'+
			'</div>');
    t.init();
    t.getUesrInfo();
};
AccountPandectController.prototype = {
	init: function(){
		var t = this;
		
		$('#accountMain').html(t.el);

		//获取资金金额信息
		var params = {
				url: J.Api.getInvestEarnings,
				data: {},
				callback: function(data) {
					var i=0,indexArr=[],sole;
					//var totalVal = Number(data.availableBalance)+Number(data.dueinInterest)+Number(data.frozenAmount);
					var numArr = [Number(data.availableBalance),Number(data.dueinInterest),Number(data.frozenAmount)];
					var totalVal = numArr[0] + numArr[1] + numArr[2],
					    colorArr = ['#ac955a','#9aa3c6','#00205c'];

					numArr.map(function(item,index){
						if(item){
							i++;
							sole = item;
							indexArr.push(index);
						}
					});

					function percentage(current,total){
						 var num = current/total,
						     num1=num.toFixed(4),
						     val=num1.slice(2,4)+"."+num1.slice(4,6);
						 return val;
					}
					
		    		var option = {
			    			radius  : [30, 50],//饼图半径19，边框22-19
			    			colors  : ['#ac955a','#9aa3c6','#00205c'],//边框数值边色，边框底色
			    			val     : [percentage(numArr[0],totalVal),percentage(numArr[1],totalVal),percentage(numArr[2],totalVal)], //文字百分比，如80
			    			dom     : t.el.find('.pie_block')[0]
		    		};

		    		if(i==1){
		    			var soleData = [0.000000001,0.000000001,0.000000001];
		    			soleData[indexArr[0]] = sole;
		    			var option = {
			    			radius  : [30, 50],//饼图半径19，边框22-19
			    			colors  : colorArr,//边框数值边色，边框底色
			    			val     : soleData, //文字百分比，如80
			    			dom     : t.el.find('.pie_block')[0]
		    			};
						t.chartPie(option);
					}else if(i==0){
						var soleData = [0.000000001,99,0.000000001];
		    			var colorArr = ['#c2c2c2','#c2c2c2','#c2c2c2'];
		    			var option = {
			    			radius  : [30, 50],//饼图半径19，边框22-19
			    			colors  : colorArr,//边框数值边色，边框底色
			    			val     : soleData, //文字百分比，如80
			    			dom     : t.el.find('.pie_block')[0]
		    			};
						t.chartPie(option);
					}else{
						var option = {
			    			radius  : [30, 50],//饼图半径19，边框22-19
			    			colors  : colorArr,//边框数值边色，边框底色
			    			val     : [percentage(numArr[0],totalVal),percentage(numArr[1],totalVal),percentage(numArr[2],totalVal)], //文字百分比，如80
			    			dom     : t.el.find('.pie_block')[0]
		    			};
						t.chartPie(option);
					}
					
					
					$('.totalEarnings').html(data.totalEarnings);
					$('.lastMonth').html(data.lastMonth);
					$('.dueinEarnings').html(data.dueinEarnings);

					$('.totalInvest').html(data.totalInvest);
					$('.investProject').html(data.investProject);
					$('.dueinPrincipal').html(data.dueinPrincipal);

					$('.availableBalance').html(data.availableBalance);
					$('.dueinInterest').html(data.dueinInterest);
					$('.frozenAmount').html(data.frozenAmount);
					$('.totalAmount').html(data.totalAmount);
				}
		}
		J.Utils.sendAjax(params);

		t.requestCurve(1);
		t.requestCurve(3);
    	t.events();
	},
	render: function(){
		var t = this;
		t.init();
	},
	getUesrInfo:function(){
		//更改账户总览用户信息
		Transceiver.listen('userInfo','accountPandectModule.init',function(data){
			var user         = JSON.parse(data),
			    safeLevel    = user.safeLevel,
			    safeLevelDom = $('#safeLevel'),
			    levelDom     = $("#Level");
			$('#leftMoney').html(new Number(user.leftMoney).toFixed(2));
			$('#lastLoginTime').html(J.Utils.formatTime(user.lastLoginTime));
			if(safeLevel == 1){
				safeLevelDom.css({"width":'30%'});
				levelDom.html('低').css({'color':'red'});
			}else if(safeLevel == 2){
				safeLevelDom.css({"width":'60%'});
				levelDom.html('中').css({'color':'orange'});
			}else if(safeLevel == 3){
				safeLevelDom.css({"width":'100%'});
				levelDom.html('高').css({'color':'green'});
			}
			user.isBindPone && $('#isBindPone').addClass('mobile');
			user.isBindCard && $('#isBindCard').addClass('card');
			user.isAccount && $('#isAccount').addClass('pay');
		});
	},
	tooltipConfig:[
		{
			name:'tooltip1',
			dom:'.nomobile.mobile',
			width:'70',
			text:'已绑定手机'
		},
		{
			name:'tooltip2',
			dom:'.nomobile',
			width:'70',
			text:'未绑定手机'
		},
		{
			name:'tooltip3',
			dom:'.nopay.pay',
			width:'120',
			text:'已绑定第三方支付'
		},
		{
			name:'tooltip4',
			dom:'.nopay',
			width:'120',
			text:'未绑定第三方支付'
		},
		{
			name:'tooltip5',
			dom:'.nocard.card',
			width:'90',
			text:'已绑定银行卡'
		},
		{
			name:'tooltip6',
			dom:'.nocard',
			width:'90',
			text:'未绑定银行卡'
		}
	],
	createTooltip:function(obj){
		var t = this;
	    t.el.delegate(obj.dom, 'mouseenter', function(e){
			obj.name = J.Utils.tooltip({
				element: $(obj.dom)[0],
				position: 'top',
				width: obj.width,
				content: '<div style="text-align:center;">'+obj.text+'</div>'
			});
	    });
	    t.el.delegate(obj.dom, 'mouseleave', function(e){
			obj.name.remove();
		});
	},
	events : function(){
	    var t = this;

	    t.tooltipConfig.map(function(item){
			t.createTooltip(item);
		});

	    t.el.delegate('.curve a', 'click', function(e){
	    	var arr = $(this).attr('index').split('_');
	    	if(arr[0] == 'pic1'){
	    		var tab = t.el.find('.curve a');
	    		var con = t.el.find('.pic1');
		    	t.tabCurve(tab,con,1,0,arr);
		    }else{
		    	var tab = t.el.find('.curve a');
	    		var con = t.el.find('.pic2');
		    	t.tabCurve(tab,con,3,2,arr);
		    }
	    });

	},
	requestCurve:function(type){
		var t=this;
		var params = {
				url: J.Api.getCurveInfo,
				data: {type:type},
				callback: function(data) {
					if(data.result.length == 1){
						data.result.push(0);
						t.chartCurve('pic'+type,[['01月','02月'],data.result]);
					}else{
						var key = [];
						$.each(data.result,function(index,item){
							key.push((index+1)+'月');
						});
						t.chartCurve('pic'+type,[key,data.result]);
					}
				}
			}
		J.Utils.sendAjax(params);
	},
	tabCurve:function(tab,con,index1,index2,arr){
		var t = this;
			if(Number(arr[1])){
	    		tab.eq(index1).addClass('bg1').removeClass('bg3');
	    		tab.eq(index2).addClass('bg3').removeClass('bg1');
	    		con.eq(1).show();
	    		con.eq(0).hide();
	    	}else{
	    		tab.eq(index2).addClass('bg1').removeClass('bg3');
	    		tab.eq(index1).addClass('bg3').removeClass('bg1');
	    		con.eq(0).show();
	    		con.eq(1).hide();
	    	}
	    	if(arr[0] == 'pic1'&& arr[1]  == 1){
	    		t.requestCurve(2);
	    	}else if(arr[0] == 'pic1'&& arr[1]  == 0){
	    		t.requestCurve(1);
	    	}else if(arr[0] == 'pic2'&& arr[1]  == 1){
	    		t.requestCurve(4);
	    	}else if(arr[0] == 'pic2'&& arr[1]  == 0){
	    		t.requestCurve(3);
	    	}
	},
	chartCurve:function(id,data){
		
		var t = this;
		option = {

		    tooltip : {
		        trigger: 'axis',
      			backgroundColor:'#ac955a',
		        axisPointer:{
                	lineStyle: {
				        color: '#ac955a',
				        width: 2,
				        type: 'solid'
				    }
                }
		    },
		    xAxis:[{
		            type : 'category',
		            boundaryGap : false,
		            data : data[0],
		            axisLine:{
			            lineStyle:{
			          		color: '#c2c2c2',
			    			width: 1,
			    			type: 'solid'
			    		}
			        },
			        axisLabel:{
						/*textStyle:{
							color:"red", //刻度颜色
							fontSize:16  //刻度大小
						}*/
					}
			    }],
			    yAxis : [{
			        type : 'value',
			        axisLine:{
			            lineStyle:{
			            	color: '#c2c2c2',
			    			width: 1,
			    			type:'solid'
			    		}
			        }
			    }],
			    series : [{
		            name:'成交',
		            type:'line',
		            smooth:false,
		            itemStyle: {
			            	normal: {
			            		color:'#00205c',
			            		lineStyle:{
							    color:'#00205c',
							    width:2
							},
							areaStyle:{
								color:'#9aa3c6'
							}
						}
					},
			        data:data[1]
			    }]
		};
		var myCharts = echarts.init(t.el.find('#'+id)[0],'macarons');
		myCharts.setOption(option,true);
	},
	chartPie: function(Obj) {

			var radius = Obj.radius,
				colors = Obj.colors,
				val = Obj.val,
				dom = Obj.dom;

			

			var labelTop = {
				normal: {
					color: colors[0],
					labelLine: {
						show: false
					}
				}
			};
			 
			var labelMiddle = {
				normal: {
					color: colors[1],
					labelLine: {
						show: false
					}
				}
			};

			var labelBottom = {
				normal: {
					color: colors[2],
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
					x: 'center', // for funnel
					y:'center',
					itemGap: 10,
					data: [{
						value: val[0],
						itemStyle: labelBottom
					},{
						value: val[1],
						itemStyle:labelMiddle
					}, {
						value: val[2],
						itemStyle: labelTop
					}],
					clockWise: false
				}],
				animation: true
			};
			var myCharts = echarts.init(dom, 'macarons');
			myCharts.setOption(option);
		}
};

AccountPandectController.prototype.constructor = AccountPandectController;
module.exports = AccountPandectController;