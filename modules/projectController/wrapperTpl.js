// var min = '#F{$dp.$D("d4322",{d:1})';
// var maxDate = '#F{$dp.$D(\'d4322\',{d:-3});}';
var wrapperTpl = '<div id="ProjectPageModule" class="project_page_module">' +
        '<p class="title">已投项目</p>' +
        '<div class="filer_wrapper">' +
            '<div class="status_filter item">' +
                '<span class="label fl">项目状态:</span>' +
                '<ul class="nav status clear fl">' +
                    '<li class="active" data-status="0">不限</li>' +
                    '<li class="" data-status="1">融资中</li>' +
                    '<li class="" data-status="2">还款中</li>' +
                    '<li class="" data-status="3">还款完成</li>' +
                '</ul>' +
            '</div>' +
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
                    '<input type="text" id="startTime" onclick="WdatePicker({onpicked: J.checkTime})">' +
                '</div>' +
                '<div class="time_wrapper">' +
                    '<span>止</span>' +
                    '<input type="text" id="endTime" onclick="WdatePicker({onpicked: J.checkTime})">' +
                '</div> ' +
            '</div>' +
        '</div>' +
        '<div class="project_wrapper_header">' +
            '<span class="container1">项目信息</span>' +
            '<span class="container2">投资金额(元)</span>' +
            '<span class="container3">预期收益(元)</span>' +
            '<span class="container4">已收款(元)</span>' +
            '<span class="container5">待收款(元)</span>' +
            '<span class="container6">状态</span>' +
            '<span class="container7">操作</span>' +
        '</div>' +
        '<ul class="project_wrapper" id="projectWrapper"></ul>' +
        '<div class="pager_bar" id="project_pager"></div>' +
        '<div class="repay_recordlist_wrapper">'+
            '<a class="close_recordlist_wrapper" href="#" title="关闭"></a>' +
            '<span class="triangle"></span>' +
            '<table>' +
               ' <thead>' +
                    '<tr>' +
                        '<th width="10%">期数</th>' +
                        '<th width="20%">收款时间</th>' +
                        '<th width="20%">收款金额(元)</th>' +
                        '<th width="15%">本金(元)</th>' +
                        '<th width="15%">利息(元)</th>' +
                        '<th width="20%">状态</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody id="repayRecordWrapper"></tbody>' +
            '</table>' +
            '<div class="pager_bar" id="repay_record_pager"></div>' +
        '</div>' +
    '</div>';
module.exports = wrapperTpl;