
var SubnavController = function(){
	var t = this;
	t.el = $('<div id="SubnavModule" class="Subnav_module">'+
				'wewfafsafsdfdsfe2342421421412424234wfafsad'+
			'</div>');
    t.init();
};
SubnavController.prototype = {
	init: function(){
		var t = this;
		$('#accountMain').html(t.el);
		t.events();
	},
	render: function(){
		var t = this;
		t.init();
	},
	events : function(){
	    var t = this;

	}
};

SubnavController.prototype.constructor = SubnavController;
module.exports = SubnavController;