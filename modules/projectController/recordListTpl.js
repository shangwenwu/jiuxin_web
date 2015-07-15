var tableTpl = Template(
    '<% if(moduleData.results.length > 0){ %> ' + 
        '<% $.each(moduleData.results, function(i, item) { %>'+
            '<tr>' + 
                '<td>第<%- item.index %>期</td>' +
                '<td><%- item.time %></td>' +
                '<td><%- item.amount %></td>' +
                '<td><%- item.principal %></td>' +
                '<td><%- item.interest %></td>' +
                '<td><%- item.status %></td>' +
            '</tr>' +
        '<% }) %>' +
    '<%} else { %>' +
            '<tr><td colspan="7">暂无相关数据</td></tr>' +       
    '<% } %>'
);
module.exports = tableTpl;