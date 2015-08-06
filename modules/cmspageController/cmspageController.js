Router.addRules({
    'cmspage/id=:id' : function (type,id) {
        J.Controllers['cmspage'] ? J.Controllers['cmspage'].render(id) : J.Controllers['cmspage'] = new CmspageController(id);
    }
});
var CmspageController = function(id){
	var t = this;

	t.el = $('<div id="cmsPageModule" class="cms_page_module">'+
			    '<h1 id="cmsHead" class="cms_head"></h1>'+
			    '<p class="cms_time"><span>发布时间：</span><span id="cmsTime"></span></p>'+
			    '<div id="cmsContent" class="cms_content"></div>'+
		    '</div>');
    t.cmsHead = t.el.find('#cmsHead');
    t.cmsTime = t.el.find('#cmsTime');
    t.cmsContent = t.el.find('#cmsContent');

	t.init(id);
};
CmspageController.prototype = {
	init: function(id){
		var t = this;
		$('#mainBody').html(t.el);
		t.fetch(id);
		J.Common.matchRoute(location.hash);
	},
	render: function(id){
		var t = this;
		t.init(id);
	},
	fetch:function(id){
       var t = this;
        J.Utils.sendAjax({
        	url:J.Api.cmspage,
        	data:{cmsId:id},
        	callback:function(data){
                t.cmsHead.html(data.title);
                t.cmsTime.html(J.Utils.formatTime(data.time,"Y-M-D"));
                t.cmsContent.html(data.content);
        	}
        });
	}
};

CmspageController.prototype.constructor = CmspageController;

module.exports = CmspageController;