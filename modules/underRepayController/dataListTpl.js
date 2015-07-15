var tableTpl = Template(
    '<% if(moduleData.results.length > 0){ %> ' + 
        '<% $.each(moduleData.results, function(i, item) { %>'+
            '<tr  class="<% if(i % 2 == 1){ %> even<% } %>" >' + 
                '<td class="first_tada"><span class="name"><%- item.title %></span><span class="time"><%- item.time %></span></td>' +
                '<td><%- item.repayTime %></td>' +
                '<td><%- item.index %></td>' +
                '<td><%- item.amount %></td>' +
                '<td><%- item.principal %></td>' +
                '<td><%- item.interest %></td>' +
            '</tr>' +
        '<% }) %>' +
    '<%} else { %>' +
            '<tr><td colspan="6">暂无相关数据</td></tr>' +       
    '<% } %>'
);
module.exports = tableTpl;