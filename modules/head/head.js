
var userInfoTpl = Template(
    '<% if(isLogin) {%>' +
        '欢迎您<i class="user_name"><%- realName || username %></i>'+
        '<% if(messageCount > 0) {%>' +
            '<a href="#account/message" class="message">(<%- messageCount %>)</a>' +
        '<% } %>' +
        '<a class="logout" href="#">退出</a>'+
        '<a href="#account" class="usercenter">我的账户</a>' +
    '<% } else {%>' +  
        '<a href="#login" id="dingbudenglu">登录</a>'+ 
        '<a href="#register" class="register" id="dingbuzhuce">注册</a>'+
    '<% } %>'
);

var Head = function(){
  var t = this;
  t.el = $('<div  id="headModule" class="head_module">'+
  				'<div class="head_module-info">'+
  					'<div class="head_module-info-content u-pos-r-center">'+
              '<div id="userInfo" class="user_info">' +
              '</div>' +
  						'<span class="hotline"></span>'+
  						'<span class="weiboIcon">'+
  							'<a href="http://weibo.com/jiuxinfinance" target="_blank"></a>'+
  						'</span>'+
  						'<span class="weixinIcon"></span>'+
  						'<div class="dropdown" ></div>'+
              '<a class="feedback" href="#feedback" title="反馈建议"></a>' +
  						'<a class="help_center" href="#help" title="帮助中心">'+
  							'<span class="why"></span>'+
  						'</a>'+

  					'</div>'+
  				'</div>'+
  				'<div class="head_module-menu">'+
  					'<div class="head_module-menu-content u-pos-r-center">'+
  						'<a href="/" style="float: left;" alt="九信金融" title="九信金融">'+
  							'<span class="s-icon"></span>'+
  						'</a>'+
  						'<ul class="u-nolist-ul">'+
  							'<li class="s__is-selected home">'+
  								'<a  href="#home">首&nbsp;&nbsp;页</a>'+
  							'</li>'+
  							'<li class="invest"><a href="#invest">我要投资</a></li>'+
  							'<li class="safe"><a href="#safe">安全保障</a></li>'+
  							'<li class="guide"><a href="#guide">新手指引</a></li>'+
  							'<li class="about"><a href="#about">关于我们</a></li>'+
  						'</ul>'+
  					'</div>'+
  				'</div>'+
  			'</div>');
  t.userInfoWrapper = t.el.find("#userInfo");
  Transceiver.listen('userInfo','headModule.init',function(data){
    var user = JSON.parse(data);
    t.userInfoWrapper.html(userInfoTpl(user));
    $("#headModule").attr("data-cur", J.cookie.get('userstate') || '');
    // window.userstate = $.cookie('userstate') || '';
  });

  t.init();
};
Head.prototype = {
  
  events: function() {
    var t = this;
    t.el.delegate('.head_module-menu a', 'click', function(e) {
      // var route = $(this).attr('href').replace(/.*\#([^/]*).*/, '$1');
      // if (route) t.matchRoute(route);
      J.Common.matchRoute($(this).attr('href'))
    });
    t.el.delegate('.logout', 'click', function(e) {
      e.preventDefault();
        var options = {
          url: J.Api.logout,
          notLoginCallback: function  () {
            location.href = "/";
            // Router.navigate('home');
          }
        };
        J.Utils.sendAjax(options);        
    });
  },
  
  init:function(){
    var t = this;
     t.events();
     J.Common.matchRoute(location.hash);
  },
	// events : function(){
	//   var t = this;
 //    t.el.delegate('a', 'click', function(e){
 //       J.Common.matchRoute($(this).attr('href'));
 //    });
	// }
 
  matchRoute: function(route) {
    var t = this;
    if (route) {
      t.el.find('li').removeClass('s__is-selected');
      t.el.find('.' + route).addClass('s__is-selected');
    }
  }
};

Head.prototype.constructor = Head;

module.exports = Head;