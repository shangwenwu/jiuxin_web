var wrapperTpl = '<div id="UnderRepayPageModule" class="underRepay_page_module">' +
        '<p class="title">已投项目</p>' +
        '<div class="filer_wrapper">' +
            '<div class="time_filer item">' +
                '<span class="label">交易时间:</span>' +
                '<ul class="nav status fl clear">' +
                    '<li class="active" data-time="0">全部</li>' +
                    '<li class="" data-time="1">近7天</li>' +
                    '<li class="" data-time="3">3个月内</li>' +
                    '<li class="" data-time="6">6个月内</li>' +
                '</ul>' +
                '<div class="time_wrapper">' +
                    '<span>起</span>' +
                    '<input type="text" id="startTime" onclick="WdatePicker({onpicked: J.updateTime})">' +
                '</div>' +
                '<div class="time_wrapper">' +
                    '<span>止</span>' +
                    '<input type="text" id="endTime" onclick="WdatePicker({onpicked: J.updateTime})">' +
                '</div> ' +
            '</div>' +
        '</div>' +
        '<table>' +
           ' <thead>' +
                '<tr>' +
                    '<th width="23%" class="first_tada">项目信息</th>' +
                    '<th width="15%">收款时间</th>' +
                    '<th width="10%">期数</th>' +
                    '<th width="20%">代收总额(元)</th>' +
                    '<th width="15%">待收本金(元)</th>' +
                    '<th width="15%">待收利息(元)</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody id="dataWrapper"></tbody>' +
        '</table>' +
        '<div class="pager_bar clear" id="underRepay_pager"></div>' +
    '</div>';
module.exports = wrapperTpl;