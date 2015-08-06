var newsTpl =Template('<li><a href="#cmspage/id=<%-id%>" target="_blank" class="item ellipsis fl"><%-title%></a></li>');

var NewsList = function(){
	var t = this;

	t.el = $('<div id="newsListModule" class="news_list_module">'+
		        '<div class="news_box left fl">'+
		            '<p class="title">'+
		               '<a class="more fr" href="#cmslist/id=bulletin">更多》</a><span class="hint">最新公告</span>'+
		            '</p>'+
		            '<ul class="list" id="bulletin">'+
		            '</ul>'+
		        '</div>'+
		        '<div class="news_box fl">'+
		            '<p class="title">'+
		               '<a class="more fr" href="#cmslist/id=news">更多》</a><span class="hint">媒体报道</span>'+
		            '</p>'+
		            '<ul class="list" id="report">'+
		            '</ul>'+
		        '</div>'+
		    '</div>');
	t.oneNew = $('<div class="one_new_module">'+
                    '<label>最新公告：</label><a class="one_title ellipsis fl"></a><a class="new_more" href="#cmslist/id=bulletin">全部公告</a>'+
		         '</div>');
	t.bulletin = t.el.find('#bulletin');
	t.report = t.el.find('#report');
    
    t.init();
};
NewsList.prototype = {
	init: function(){
		var t = this;
		t.fetch(J.Api.leftnews,t.bulletin,'one');
		t.fetch(J.Api.rightnews,t.report);
	},
	render: function(){
		var t = this;
		t.fetch(J.Api.leftnews,t.bulletin,'one');
		t.fetch(J.Api.rightnews,t.report);
	},
	fetch :function(url,ele,one){
        var t = this;
        J.Utils.sendAjax({
        	url:url,
        	type:'get',
        	callback:function(data){
                t.htmlList(data.results || [],ele);
                if(one){
	               var oneData = data.results[0];
	               t.oneNew.find('.one_title').attr('href','#cmspage/id='+oneData.id).html(oneData.title);
                }
        	}
        });
	},
	htmlList:function(picData,ele){
		var t = this, nwesItem = '';
		$.each(picData, function (index, item) {
			item.index = index;
            nwesItem += newsTpl(item);
        });
        ele.html(nwesItem);
	}

};

NewsList.prototype.constructor = NewsList;

module.exports = NewsList;
