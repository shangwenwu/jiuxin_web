var InvestHome = function(){
	var t = this;

	t.el = $('<div id="investHomeModule" class="invest_home_module">'+

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
		        		return '<div id="'+item.id+'_abc" style="margin:0 auto;width:45px; height:45px;"></div>';
				},
				title:function(item){
					if(item.rookie){
						return '<a href="#investDetail/id='+item.id+'" target="_blank" class="rookieA">'+item.title+'</a><span class="rookie"></span>'
					}else{
						return '<a href="#investDetail/id='+item.id+'" target="_blank">'+item.title+'</a>'
					}
				},
				yield:function(item){
					return '<span class="golden">'+item.yield+'</span>'
				},
				state:function(item){
					if(item.status == 'OPENED'){
						return '<a href="#investDetail/id='+item.id+'" class="btn_gold" >立即投资</a>';
					}else if(item.status == 'SCHEDULED'){
					
						var timeout  = setInterval(function(){
							item.endTime=item.endTime-1000;
							J.Common.getCountDownTime(item.endTime,item.startTime,item.id);
							if ((item.endTime - item.startTime) < 0) {
				            	clearInterval(timeout);
				            	$("#"+item.id).html('<a href="#investDetail/id='+item.id+'" class="btn_gold" >立即投资</a>');
				                return;
				            }
			            },1000);

			            J.Common.intervalArray.push(timeout);

						return '<a id="'+item.id+'">'+J.Common.getCountDownTime(item.endTime,item.startTime,item.id,'one')+'</a>';
					}else if(item.status == 'FINISHED'){
						return '<a class="btn_gray">已满标</a>';
					}else if(item.status == 'SETTLED'){
						return '<a class="btn_gray">还款中</a>';
					}else if(item.status == 'CLEARED'){
						return '<a class="btn_gray">还款结束</a>';
					}
				}
			}
		};
		
	}

};

InvestHome.prototype.constructor = InvestHome;

module.exports = InvestHome;