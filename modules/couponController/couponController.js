/**
 * @file 红包页面
 * Created by jinguangguo on 2015/6/24.
 */

var tpl = require('pc:couponController/couponController.tpl');

Router.addRules({
    'coupon': function () {
        J.Controllers['coupon'] ? J.Controllers['coupon'].render() : J.Controllers['coupon'] = new CouponController();
    }
});

var CouponController = function () {
    var t = this;
    t.init();
};

CouponController.TYPE = {
    INTEREST: '加息券',
    PRINCIPAL: '增值券',
    REBATE: '返现券',
    CASH: '现金券' // 暂时不用
};

CouponController.currentPage = 1;
CouponController.PAGE_SIZE = 9;

CouponController.currentType = 'ALL';
CouponController.currentStatus = 'ALL';

CouponController.formatPrice = function(num) {
    if (typeof num === 'string') {
        return num;
    }
    if (num < 10000) {
        return num;
    } else {
        return (num / 10000).toFixed(1) + '万';
    }
};

CouponController.formatTime = function(millisecond) {
    if (millisecond === null || millisecond === undefined) {
        return millisecond;
    }

};

CouponController.prototype = {
    init: function () {
        var t = this;
        t.el = $(tpl.container);
        $('#accountMain').html(t.el);
        t.events();
        t.resetData();
        // 获取数据并且渲染
        t.fetchDataAndRender();
    },
    resetData: function() {
        CouponController.currentPage = 1;
        CouponController.currentType = 'ALL';
        CouponController.currentStatus = 'ALL';
    },
    render: function () {
        var t = this;
        t.init();
    },
    renderLoading: function() {
        var loadingHtml = [
            '<div class="loading">',
                '<img src="static/pc/lib/img/loading.gif" width="40" height="40">',
            '</div>'
        ].join('');
        this.el.find('.list').html(loadingHtml);
    },
    fetchDataAndRender: function() {
        var t = this;
        this.renderLoading();
        this.fetchList({
            currentPage: CouponController.currentPage,
            pageSize: CouponController.PAGE_SIZE,
            type: CouponController.currentType,
            status: CouponController.currentStatus
        }, function(data) {
            t.renderList(data);
        });
    },
    fetchList: function (params, onSuccessCallback) {
        var t = this;
        J.Utils.sendAjax({
            url: J.Api.getCouponList,
            type: 'GET',
            data: params,
            callback: function(data) {
                onSuccessCallback(data);
            }
        });
    },
    events: function () {
        var t = this;

        t.el.delegate('.category_select', 'click', function (e) {
            e.stopPropagation();
            var $categoryList = $('.category_list');
            if ($categoryList.is(':visible') === true) {
                $categoryList.hide();
            } else {
                $categoryList.show();
            }
        });

        // 选择债券类型
        t.el.delegate('.category_item', 'click', function (e) {
            e.stopPropagation();
            var $this = $(this);
            var type = $this.data("type");
            var text = $this.find('.category_item_link').text();
            t.el.find('.category_select').text(text);
            t.el.find('.category_list').hide();
            t.el.find('.operate_date .date_type').removeClass('date_type_active');

            CouponController.currentType = type;
            CouponController.currentStatus = 'ALL';
            CouponController.currentPage = 1;
            t.fetchDataAndRender();
        });

        // select下拉表的阻止事件
        $(document).on('click', function() {
            var $categoryList = $('.category_list');
            if ($categoryList.is(':visible') === true) {
                $categoryList.hide();
            }
        });

        // 点击状态
        t.el.delegate('.operate_date .date_type', 'click', function (e) {
            var $this = $(this);
            $this.siblings('.date_type').removeClass('date_type_active');
            if ($this.hasClass('date_type_active') === true) {
                return;
            }
            $this.addClass('date_type_active');
            CouponController.currentStatus = $this.data('status');
            t.fetchDataAndRender();
        });
    },
    renderList: function(data) {
        var t = this;
        var listTplFunc = Template(tpl.list);

        this.el.find('.list').html(listTplFunc({
            list: data.results,
            formatPrice: CouponController.formatPrice,
            formatTime: J.Utils.formatTime
        }));
        this.el.find('#page').uuiPager({
            currentPage: CouponController.currentPage,
            totalPage: Math.ceil(parseInt(data.totalSize) / CouponController.PAGE_SIZE),
            pageSize: 7,
            prePage: "<",
            nextPage: ">",
            target: '#page',
            prePageClassName: "page_pre",
            nextPageClassName: "page_next",
            currentPageClassName: "on",
            morePageClassName: "page_more",
            normalPageClassName: "page_normal",
            // destroy: false,
            pageChange: function(page) {
                CouponController.currentPage = page;
                t.fetchDataAndRender();
            }
        });
    }
};

CouponController.prototype.constructor = CouponController;

module.exports = CouponController;