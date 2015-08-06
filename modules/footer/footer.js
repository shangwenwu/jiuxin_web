//var tpl = Template('');

var Footer = function(){
  var t = this;
  t.el = $(
        '<div class="sidebar" id="sidebar">' +
            '<a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001000099&aty=0&a=0&curl=&ty=1" target="_blank" class="nav_item qq" title="在线客服"><span></span></a>' +
            '<a href="#feedback" class="nav_item feedback" title="意见反馈"><span ></span></a>' +
            '<a href="#"  class="nav_item to_top" title="回到顶部"><span></span></a>' +
       ' </div>' +
        '<div id="footerModule" class="footer_module clear">'+

  				'<div class="footerLink">'+
					'<ul class="linkL">'+
						'<li><a href="#about">关于我们</a><a href="#guide">新手指引</a><a href="#help">帮助中心</a><a href="#safe">安全保障</a></li>'+
						'<li><a>关注我们</a><a target="_blank" href="http://weibo.com/jiuxinfinance" class="weibo"></a><a class="weixin"></a><div class="weixinBox"></div></li>'+
						'<li><a>友情链接</a>'+
              '<a target="_blank" href="http://www.jdcapital.com">九鼎投资</a>'+
              '<a href="http://www.jtamc.com/" target="_blank">九泰基金</a>'+
              '<a href="http://www.tyzq.com.cn/" target="_blank">九州证券</a>'+
              '<a href="http://www.chenxingplan.com/" target="_blank">晨星成长计划</a>'+
              '<a href="http://finance.cnr.cn/" target="_blank">央广网财经</a>'+
              '<a href="http://www.cctvfinance.com/" target="_blank">CCTV证券网</a>'+
              '<a href="http://www.xinwangdai.com.cn/" target="_blank">新网贷</a>'+
              '<a href="http://www.creditcloud.com/" target="_blank">云信</a>'+
          '</li>'+
					'</ul>'+
					'<ul class="linkR">'+
						'<li>在线客服<a id="BizQQWPA1"></a></li>'+
						'<li class="tel">400-100-0099</li>'+
						'<li>工作时间：9:00-21:00</li>'+
					'</ul>'+
  				'</div>'+
  			'</div>'+
  		    '<div class="footer_module">'+
  				'<div class="footerInfo">'+
  					'<p><span>京ICP备1500821号</span>Copyright © 2015 jiuxinfinance 九信金融版权所有</p>'+
  					'<div><a class="goodfaith" href="http://www.itrust.org.cn/yz/pjwx.asp?wm=1327124697" target="_blank"></a><a  target="_blank" class="itrust" href="https://search.szfw.org/cert/l/CX20150604010230010356"></a><a class="Norton" href="https://trustsealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.jiuxinfinance.com&lang=zh_cn" target="_blank"></a></div>'+
  				'</div>'+
  		    '</div>');
  t.events();
  t.initTop();
};
Footer.prototype = {
    events : function(){
        var t = this;
      t.el.delegate('a', 'click', function(e){
          J.Common.matchRoute($(this).attr('href'));
      });
      t.el.delegate('.to_top', 'click', function(e){
        e.preventDefault();
        $(window).scrollTop(0);
      });

    },

    initTop: function  () {
      // var $top = $(".to_top");
      // var winH = $(window).height();
      var _setPos = function(){
          var top = $(window).scrollTop();
          if (top > 200){
              $(".to_top").show()
          }else{
              $(".to_top").hide()
          }
      }
      _setPos();
      $(window).on('resize scroll', function() {
          _setPos();
      });      
    }
    
};

Footer.prototype.constructor = Footer;

module.exports = Footer;