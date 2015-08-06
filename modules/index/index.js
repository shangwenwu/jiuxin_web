var hashchange = 'hashchange',  DOC = document,  documentMode = DOC.documentMode,
    supportHashChange = ('on' + hashchange in window) && ( documentMode === void 0 || documentMode > 7 );
/*浏览器版本过低时，提示升级 */
if(!supportHashChange) {
    location.href = '/upload_browser.html';
}
require('pc:base/bootinit');
require('pc:base/router');
require('pc:base/storage');
require('pc:base/template');
require('pc:base/transceiver');
require('pc:base/utils');
require('pc:base/common');


J.Api = require('pc:api');
// var Rewrite = require('pc:rewrite');
// J.Api = new Rewrite();

require('pc:accountController');
require('pc:helpController');
require('pc:loginController');
require('pc:registerController');
require('pc:aboutController');
require('pc:findpwController');
require('pc:safeController');
require('pc:guideController');
require('pc:feedbackController');
require('pc:investController');
require('pc:investDetailController');
require('pc:cmspageController');
require('pc:cmsListController');

var Head = require('pc:head');
var Footer = require('pc:footer');
var HomeController = require('pc:homeController');
// new Head();
$('#mainHeader').html(new Head().el);
$('#mainFooter').html(new Footer().el);

Router.init({
            indexType : 'home',
            index : function (type) {
            	//页面路由首次要执行的对象；
                J.Controllers['home'] ? J.Controllers['home'].init() : J.Controllers['home'] = new HomeController();
            },
            rules : {

            	//有可能首次打开的页面路由
                /*'redirect/from=passport/' : function () {
                    var t = this;
                    // 正式用户登录转跳方式
                    // 如果没有lastHash，说明是由外部域进入app
                    // 如果lastHash是home，说明是点击了浏览器的回退
                    if (!t.lastHash.length || t.lastHash === 'home') {
                        t.navigate('home');
                    }
                }*/
                
                
            },
            onValid : function () {
            	//路由跳转检测的事件
                /*if (BL.global.isTempUser && preventRouterType.indexOf(this.currentType) != -1) {
                    Router.navigate('bindAccountIntro', {
                        replace : true
                    });
                    return false;
                } */               
            },
            onRoute : function () {
                //清除弹框
                J.Utils.closeDialog();
                //获取用户信息
                var getUserInfo =  function  () {
                    var t = this, user = {};
                    window['user'] = {};
                    J.Utils.getUserInfo({
                        scopt: t,
                        callback: function (data) { 
                            user = data;
                            user.isLogin = true;
                            Transceiver.trigger('userInfo',[JSON.stringify(user)]);
                        },
                        notLoginCallback: function  () {
                            user.isLogin = false;
                            Transceiver.trigger('userInfo',[JSON.stringify(user)]);
                        }
                    })
                }();
            }
        });
