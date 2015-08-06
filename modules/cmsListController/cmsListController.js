Router.addRules({
    'cmslist/id=:id' : function (type,id) {
        J.Controllers['cmslist'] ? J.Controllers['cmslist'].render(id) : J.Controllers['cmslist'] = new CmsListController(id);
    }
});
var CmsListController = function(id){
	var t = this;
	t.el = $('<div id="cmsListModule" class="cms_list_module">'+
			    '<h1 id="cmsHead" class="cms_title"></h1>'+
			    '<div id="cmsGrid" class="cms_grid"></div>'+
			    '<div class="pager_bar clear" id="messagePager"></div>' +
		    '</div>');
    t.cmsHead = t.el.find('#cmsHead');
    t.cmsGrid = t.el.find('#cmsGrid');
	t.render(id)
};
CmsListController.prototype = {
	render: function(id){
		var t = this;
		t.id = id;
    	t.config();
		$('#mainBody').html(t.el);
    	t.cmsHead.html(id == 'news' ? '媒体报道' : '最新公告');
		t.fetchGrid(id);
		t.events();
		J.Common.matchRoute(location.hash);
	},
	fetchGrid: function(){
		var t = this;
		J.Common.renderTable(t.grid,function(con){
		    t.cmsGrid.html(con);
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
	                    t.fetchGrid();
	                    //t.runTable();
	                }
	            });
			}
		});
	},
	config:function(){
		var t = this;
        t.grid = {
        	id:'cms_grid',
			dataSource:J.Api.cmslist,
			sendData:{
				pageSize:10,
				currentPage:1,
				type:t.id
			},
			footer:true,
			headTh:{
				field:['name','time'],
				name:['名称','时间']
			},
			className:'cms_table',
			format:{
				name:function(item){
					return '<a class="name ellipsis fl" target="_blank" href="#cmspage/id='+item.id+'">'+item.name+'</a>';
				},
				time:function(item){
                    return '<span class="time">'+J.Utils.formatTime(item.time,"Y-M-D")+'</span>';
				}
			}
		};
		
	},
	events: function(){
       var t = this;
	   //点击页码
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
	    });
	}
};

CmsListController.prototype.constructor = CmsListController;

module.exports = CmsListController;