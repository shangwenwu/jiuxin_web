
var InvestHome = function(){
	var t = this;
	// var loadingImg = __inline('./images/jiuxinjinrong-02.jpg'),
	t.el = $('<div id="investHomeModule" class="invest_home_module">'+
				'<div class="loading">'+
			                '<img src="static/pc/lib/img/loading.gif" width="40" height="40">'+
			                '<p style="font-size:16px; margin-top:30px;">正在请求数据，请耐心等待！</p>'+
            	'</div>'+
		    '</div>');
    t.config();
    t.init();
};

InvestHome.prototype = {
	init: function(){
		var t = this;
		t.fetchGrid();
	},
	render: function(){
		var t = this;
		t.clearTime();
		t.fetchGrid();
	},
	fetchGrid: function(){
		var t = this;
		J.Common.renderTable(t.grid,function(con){
		    t.el.html(con);
		});
	},
    clearTime: function(){
    	if(J.Common.intervalArray.length){
			J.Common.intervalArray.map(function(item){
				clearInterval(item);
			});
			J.Common.intervalArray = [];
		}
	},
	config:function(){
		var t = this;
        t.grid = {
			dataSource:J.Api.investHomeData,
			sendData:{
				pageSize:6,
				status:'ALL'
			},
			footer:false,
			headTh:{
				field:['title','yield','deadline','money','progress','state'],
				name:['项目','年化收益率','期限','金额','进度','状态/操作']
			},
			className:'invest_table',
			format:{
				deadline:function(item){
					return '<div style="width:200px;">'+item.deadline+'</div>';
				},
				money:function(item){
					return '<div style="width:80px; padding-right:40px; text-align:right;">'+item.money+'</div>';
				},
				progress:function(item){
	    				var option = {
		        			radius  : [19, 22],//饼图半径19，边框22-19
		        			colors  : ['#b5a16b','lightgrey'],//边框数值边色，边框底色
		        			fontObj : {color: '#333',fontSize:'14'},//文字颜色，字号
		        			val     : item.progress //文字百分比，如80
		        		}
						var timeClear = item.id+'_abc';
		        		timeClear = setTimeout(function(){
		        			option.dom  = t.el.find('#'+item.id+'_abc')[0];
		        			J.Common.chartSmallPie(option);
		        			clearTimeout(timeClear);
		        		},50);
		        		return '<div style="width:160px;"><div id="'+item.id+'_abc" style="margin:0 auto;width:45px; height:45px;"></div></div>';
				},
				title:function(item){
					if(item.rookie){
						return '<div style="width:240px;padding-left:60px;text-align:left;"><a href="#investDetail/id='+item.id+'" target="_blank" class="rookieA">'+item.title+'</a><span class="rookie"></span></div>'
					}else{
						return '<div style="width:240px;padding-left:60px;text-align:left;"><a href="#investDetail/id='+item.id+'" target="_blank">'+item.title+'</a></div>'
					}
				},
				yield:function(item){
					return '<div style="width:200px;"><span class="golden">'+item.yield+'</span></div>'
				},
				state:function(item){
					if(item.status == 'OPENED'){
						return '<div style="width:220px; text-align:center;"><a href="#investDetail/id='+item.id+'" class="btn_gold" >立即投资</a></div>';
					}else if(item.status == 'SCHEDULED'){
					
						var timeout  = setInterval(function(){
							item.startTime=item.startTime-1000;
							J.Common.getCountDownTime(item.startTime,item.serverTime,item.id);
							if ((item.startTime - item.serverTime) < 0) {
				            	clearInterval(timeout);
				            	$("#"+item.id).html('<a href="#investDetail/id='+item.id+'" class="btn_gold" >立即投资</a>');
				                return;
				            }
			            },1000);

			            J.Common.intervalArray.push(timeout);

						return '<div style="width:220px; text-align:center;"><a id="'+item.id+'">'+J.Common.getCountDownTime(item.startTime,item.serverTime,item.id,'one')+'</a></div>';
					}else if(item.status == 'FINISHED'){
						return '<div style="width:220px; text-align:center;"><a class="btn_gray">已满标</a></div>';
					}else if(item.status == 'SETTLED'){
						return '<div style="width:220px; text-align:center;"><a class="btn_gray">还款中</a></div>';
					}else if(item.status == 'CLEARED'){
						return '<div style="width:220px; text-align:center;"><a class="btn_gray">还款结束</a></div>';
					}
				}
			}
		};
	}
};

InvestHome.prototype.constructor = InvestHome;

module.exports = InvestHome;