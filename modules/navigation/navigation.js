var Navigation = function() {
  var t = this;
  t.el = $('<div id="navigationModule" class="navigation_module"></div>');
  t.creatNav();
  t.events();
  t.hasSelectd();
};
Navigation.prototype = {
  creatNav: function() {
    var t = this;

    //导航配置
    var navConfig = {
      text: [ //导航文本
        ['账户总览'],
        ['投资管理', '我的投资', '待收款'],
        ['资金管理', '充值', '提现', '资金记录'],
        ['账户管理', '修改密码', '账户托管', '无密协议', '银行卡'],
        ['我的红包'],
        ['我的消息']
      ],
      url: [ //导航链接
        ['accountPandect'],
        ['project', 'project', 'underRepay'], //investManage
        ['recharge', 'recharge', 'withdraw', 'fundsRecord'],
        ['modifyPwd', 'modifyPwd', 'trusteeship', 'protocol', 'bankCard'],
        ['coupon'],
        ['message']
      ],
      insertToClass: t.el, //导航插入到该DOM内
      navStyleClass: 'menuNav' //导航最外层样式
    }

    //创建导航菜单类
    var createMenu = function(obj) {
      this.text = obj.text;
      this.url = obj.url;
      this.insertToClass = obj.insertToClass;
      this.navStyleClass = obj.navStyleClass;
    };
    createMenu.prototype = {
      init: function() {
        var url = this.url,
          navStyleClass = this.navStyleClass,
          con = '<ul class="' + this.navStyleClass + '">';
        this.text.map(function(item, i) {
          if (item.length > 1) {
            item.map(function(key, index) {
              if (index) {
                con += '<li class="' + url[i][index] + '"><div></div><a href="#account/' + url[i][index] + '">' + key + '</a></li>';
              } else {
                con += '<li class="openSubMenu ' + url[i][index] + '"><a href="#account/' + url[i][index] + '">' + key + '</a><div class="triangle"></div><ul class="subMenu">';
              }
            });
            con += '<li></ul>';
          } else {
            con += '<li class="' + url[i][0] + '"><a href="#account/' + url[i][0] + '">' + item[0] + '</a><div class="triangle"></div></li>';
          }
        });
        con += '</url>';
        this.insertToClass.html(con);
      }
    };

    //实例
    var initNav = new createMenu(navConfig);
    initNav.init();
  },
  events: function() {
    var t = this;
  },
  hasSelectd: function() {
    var t = this;
    if (location.hash.split('/').length == 1) {
      t.el.find('.accountPandect').addClass('menuSelected');
    } else {
      var route = location.hash.split('/')[1];

      if (t.el.find('.' + route).length == 2) {
        t.el.find('.' + route).eq(0).addClass('menuSelected');
        t.el.find('.' + route + ' div').eq(1).addClass('circle');
      } else {
        if (t.el.find('.' + route).closest('ul').attr('class') == 'subMenu') {
          t.el.find('.' + route).closest('.openSubMenu').addClass('menuSelected');
          t.el.find('.' + route + ' div').addClass('circle');
        } else {
          t.el.find('.' + route).addClass('menuSelected');
        }
      }

    }

  }
};

Navigation.prototype.constructor = Navigation;

module.exports = Navigation;