Router.addRules({
    'invest' : function () {
        J.Controllers['invest'] ? J.Controllers['invest'].render() : J.Controllers['invest'] = new InvestController();
    }
});
var InvestController = function(){
	var t = this;
	t.el = $('<div id="investModule" class="invest_module">'+
				'<div class="tableHead"></div>'+
				'<div class="tableCon"></div>'+
				'<div class="pager_bar clear" id="messagePager"></div>' +
			'</div>');
    t.init();
};
InvestController.prototype = {
	init: function(){
		var t = this;
		$('#mainBody').html(t.el);
		t.clearTime();
		t.config();
		t.events();

        J.Common.matchRoute(location.hash);

	    J.Common.renderSifting(t.sifting,function(con){
	    	t.el.find('.tableHead').html('');
	    	t.el.find('.tableHead').append(con);
	    });
	    t.runTable();
	},
	render: function(){
		var t = this;
		t.init();
	},
	clearTime: function(){
		if(J.Common.intervalArray.length){
			J.Common.intervalArray.map(function(item){
				clearInterval(item);
			});
			J.Common.intervalArray = [];
		}
	},
	runTable:function(){
		var t = this;
		J.Common.renderTable(t.grid,function(con){
			t.el.find('.tableCon').html('');
	    	t.el.find('.tableCon').append(con);
	    	if(t.grid.footer){
	    		var getPara = t.el.find('table');


	    		$('#messagePager').uuiPager({
	                currentPage: getPara.attr('currentPage'),
	                totalPage: Math.ceil(getPara.attr('total') / getPara.attr('pageSize')) || 1,
	                pageSize:getPara.attr('pageSize'),
	                nextPage: ">",
	                prePage: "<",
	                target: '#messagePager',
	                prePageClassName: "page_pre",
	                nextPageClassName: "pager_next",
	                currentPageClassName: "on",
	                morePageClassName: "pager_more",
	                normalPageClassName: "pager_normal",
	                // destroy: false,
	                pageChange: function(page) {
	                    t.grid.sendData.currentPage = page;
	                    //t.fetchTable();
	                    t.runTable();
	                }
	            });


	    		
		    	/*var footerConfig = {
					total:getPara.attr('total'),
					currentPage:getPara.attr('currentPage'),
					pageActive:'pageactive',
					className:'tableFooter',
					fristPage:'fristPage',
					lastPage:'lastPage',
					prevPage:'prevPage',
					nextPage:'nextPage',
					disabledClass:'disabledClass',
					appendAfter:getPara.attr('class'),
					pageSize:getPara.attr('pageSize')
				}
				J.Common.renderTableFooter(footerConfig,function(con){
					$('.'+footerConfig.appendAfter).after(con);
				});*/

			}
	    });
	},//ARCHIVED 归档 不显示 ，SCHEDULED 倒记时 

	/*
	   {type:'input',placeholder:'输入文字信息',textType:'text',id:'inputId'},
	   {type:'select',id:'selectId',option:[['key','val'],['key1','val1'],['key2','val2'],['key3','val3'],['key4','val4'],['key5','val5']]}
    */

    /*fetchTable: function(){
        var t = this;
        J.Common.renderTable(t.grid,function(con,totalSize){
            t.tableBox.html(con);
            t.totalSize = totalSize;
            t.setPages();
        });
    },*/

	config:function(){
		var t = this;
		t.sifting = {
			data:[
				['年化收益：',['不限','8%以下','8%-10%','10%-12%','12%以上']],
				['借贷期限：',['不限','0-1个月','1-3个月','3-6个月','6-12个月','一年以上']],
				['投标状态：',['不限','融资中','还款中','还款结束']]
			],
			sendField:[
				['minRate-maxRate','0-100','0-8','8-10','10-12','12-100'],
				['minDuration-maxDuration','0-100','0-1','1-3','3-6','6-12','12-100'],
				['status','ALL','OPENED','SETTLED','CLEARED']
			],
			className:{
				global:'sifting',//筛选最外层样式
				borderB:'borderB',//下边框样式
				selected:'selected'//选中的样式
			}
		};
		t.grid = {
			id:'tableCon',
			dataSource:J.Api.investData,
			sendData:{
				pageSize:10,
				status:'ALL',
				minDuration:0,
				maxDuration:100,
				minRate:0,
				maxRate:100,
				currentPage:1
			},
			footer:true,
			headTh:{
				field:['title','yield','deadline','money','progress','state'],
				name:['项目','年化收益率','期限','金额','进度','状态/操作']
			},
			className:'investTable',
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
						return '<div style="width:220px; text-align:center;"><a href="#investDetail/id='+item.id+'" class="btn_gold" target="_blank">立即投资</a></div>';
					}else if(item.status == 'SCHEDULED'){
					
						var timeout  = setInterval(function(){
							item.startTime=item.startTime-1000;
							J.Common.getCountDownTime(item.startTime,item.serverTime,item.id);
							if ((item.startTime - item.serverTime) < 0) {
				            	clearInterval(timeout);
				            	$("#"+item.id).html('<a href="#investDescribe/id='+item.id+'" class="btn_gold" >立即投资</a>');
				                return;
				            }
			            },1000);

			            J.Common.intervalArray.push(timeout);
			            var myTime = J.Common.getCountDownTime(item.startTime,item.serverTime,item.id,'one') || '';
						return '<div style="width:220px; text-align:center;"><a id="'+item.id+'">'+myTime+'</a></div>';
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
	},
	events : function(){
	    var t = this;
	    t.el.delegate('.investBut', 'click', function(e){
	    	J.Utils.alert({
                content: $(this).attr('name')
            });
	    });
	    //筛选
	    t.el.delegate('.sifting span', 'click', function(e){
	    	$(this).addClass('selected').siblings('span').removeClass();
	    	t.grid.sendData.currentPage = 1;
	    	var selectedSpan = $('.sifting .selected');
	    	selectedSpan.map(function(item){
	    		var index   = selectedSpan[item].getAttribute('index'),
	    		    variate = t.sifting.sendField[item][0].split('-'),
	    		    val     = t.sifting.sendField[item][index].split('-');
	    		variate.map(function(k,index){
	    			t.grid.sendData[k] = val[index];
	    		});
	    	});

	    	t.clearTime();

	    	t.runTable();
	    });
	    /*//点击页码
	    t.el.delegate('.tableFooter a', 'click', function(e){
	    	t.grid.sendData.currentPage = $(this).html();
	    	t.clearTime();
	    	t.runTable();
	    });
	    //点击上一页下一页首页尾页
	    t.el.delegate('.tableFooter span', 'click', function(e){
	    	if(!$(this).hasClass("disabledClass")){
		    	t.grid.sendData.currentPage = $(this).attr('page');
		    	t.clearTime();
		    	t.runTable();
	    	}
	    });*/

	}
};

InvestController.prototype.constructor = InvestController;
module.exports = InvestController;