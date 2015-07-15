var dataListTpl = Template(
    '<% if(moduleData.results.length > 0){ %> ' + 
        '<% $.each(moduleData.results, function(i, item) { %>'+
            '<li class="meassage_wrapper_data <% if(i % 2 == 1){ %> even<% } %>">' + 
                '<div class="data container1">' +
                    '<a class="name" href="#"><%- item.title %></a>' +
                    '<p class="time"><%- item.time %></p>' +
                    '<p><span class="rate">利率: <%- item.rate %>%</span><span class="duretion"><%- item.duretion %></span></p>' +
                '</div>' +
                '<div class="data container2"><%- item.amount %></div>' +
                '<div class="data container3"><%- item.profit %></div>' +
                '<div class="data container4"><%- item.collected %></div>' +
                '<div class="data container5"><%- item.collecting %></div>' +
                '<% if(item.status == 1){ %>' +
                    '<div class="data container6 collecting">' +
                        '<p class="status"><%- item.statusName %></p>' +        
                    '</div>' +
                    '<div class="data container7 collecting">' +
                        // '<a class="agreemengt" href="#" target="_blank">查看协议</a>' +          
                    '</div>' +
                '<% } else { %>' +
                    '<div class="data container6">' +
                        '<p class="status"><%- item.collecting %></p>' +
                        '<p class="current"><%- item.period %></p>' +         
                    '</div>' +
                    '<div class="data container7">' +
                        '<a class="agreemengt" href="#" target="_blank">查看协议</a>' +
                        '<a class="repay_record" href="#" target="_blank" data-id="<%- item.id %>">收款记录</a>' +        
                    '</div>' +                    
                '<% } %>' +              
            '</li>' +
        '<% }) %>' +
    '<%} else { %>' +
            '<li class="no_data">暂无相关数据</li>' +
    '<% } %>'
);
module.exports = dataListTpl;