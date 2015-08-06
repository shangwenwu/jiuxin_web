var tableTpl = Template(
    '<% if(moduleData.results.length > 0){ %> ' + 
        '<% $.each(moduleData.results, function(i, item) { %>'+
            '<tr  class="<% if(i % 2 == 1){ %> even<% } %>" >' + 
                '<td class="first_tada"><a class="name" href="#investDetail/id=<%- item.id %>" target="_blank"><%- item.title %></a></td>' +
                '<td><%- J.Utils.formatTime(item.repayTime, "Y-M-D") %></td>' +
                '<td><%- item.index %></td>' +
                '<td><%- item.amount %></td>' +
            '</tr>' +
        '<% }) %>' +
    '<%} else { %>' +
            '<tr><td class="no_data" colspan="4">暂无数据</td></tr>' +       
    '<% } %>'
);
module.exports = tableTpl;