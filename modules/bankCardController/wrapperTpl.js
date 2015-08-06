var wrapperTpl = Template(
	'<% if(!moduleData.last4BankCardNo && moduleData.status != 1){ %> ' + 
	    '<h1 class="hd">绑定提现银行卡</h1>'+
	    '<div id="step1" class="card_box">'+
	    	'<p class="hint">请务必本人绑卡，请选择换开户银行卡</p>'+
	        '<div id="cardList" class="card_list">'+
	            '<span class="card_item gs on fl" data-name="ICBC"></span>'+ 
	            '<span class="card_item ny fl" data-name="ABC"></span>'+ 
	            '<span class="card_item zg fl" data-name="BOC"></span>'+ 
	            '<span class="card_item js fl" data-name="CCB"></span>'+ 
	            '<span class="card_item xy fl" data-name="CIB"></span>'+ 
	            '<span class="card_item ms fl" data-name="CMBC"></span>'+ 
	            '<span class="card_item yz fl" data-name="PSBC"></span>'+ 
	            '<span class="card_item zs fl" data-name="CMB"></span>'+ 
	            '<span class="card_item gd fl" data-name="CEB"></span>'+ 
	        '</div>'+
	        '<p class="card_number">'+
	        	'<label class="label">银行卡号：</label><input id="cardInput" class="card_input" type="text" placeholder="请输入储蓄卡"></input>'+
	        '</p>'+
	        '<p class="card_hint"></p>'+
	        '<button id="submit" class="btn_blue submit">确&nbsp;&nbsp;&nbsp;&nbsp;认</button>'+
	    '</div>'+
    '<%} else if (moduleData.status == 1) { %>' +
    	'<h1 class="hd">银行卡绑定处理中</h1>' +
	    '<div id="step2" class="card_box">'+
	        '<div id="cardImg" class="card_img <%- moduleData.bankCode %>">'+
	            '<span class="card_txt fl">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;</span>'+
	            '<span id="cardNu" class="card_nu fl"><%- moduleData.last4BankCardNo %></span>'+
	        '</div>'+
	        '<div class="bind_txt" style="display:none;">'+
	        	'<p>您的提现银行卡由账户托管方进行维护管理。</p>'+
	        	'<p>账户托管方将在工作日11:00、14:00、16:00，每天三次处理您的提现请求。</p>'+
	        '</div>'+
	    '</div>' +
    '<%} else if (moduleData.status == 2) { %>' +
    	'<h1 class="hd">已绑定银行卡</h1>' +
	    '<div id="step2" class="card_box">'+
	        '<div id="cardImg" class="card_img <%- moduleData.bankCode %>">'+
	            '<span class="card_txt fl">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;</span>'+
	            '<span id="cardNu" class="card_nu fl"><%- moduleData.last4BankCardNo %></span>'+
	        '</div>'+
	        '<div class="bind_txt" style="display:none;">'+
	        	'<p>您的提现银行卡由账户托管方进行维护管理。</p>'+
	        	'<p>账户托管方将在工作日11:00、14:00、16:00，每天三次处理您的提现请求。</p>'+
	        '</div>'+
	    '</div>' +
    	'<h1 class="hd">换卡处理中</h1>' +
	    '<div class="card_box">'+
	        '<div id="cardImg" class="card_img <%- moduleData.newBankCode %>">'+
	            '<span class="card_txt fl">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;</span>'+
	            '<span id="cardNu" class="card_nu fl"><%- moduleData.newLast4BankCardNo %></span>'+
	        '</div>'+
	        '<div class="bind_txt">'+
	        	'<p>当前银行卡由移动端提交换卡请求，托管方正在认证处理中。</p>'+
	        	'<p>认证成功将替换原卡进行提现、移动端充值。</p>'+
	        	'<p>认证失败可通过移动端再次发起换卡请求。</p>'+
	        '</div>'+
	    '</div>' +
    '<%} else { %>' +
    	'<h1 class="hd">已绑定银行卡</h1>' +
	    '<div id="step2" class="card_box">'+
	        '<div id="cardImg" class="card_img <%- moduleData.bankCode %>">'+
	            '<span class="card_txt fl">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;</span>'+
	            '<span id="cardNu" class="card_nu fl"><%- moduleData.last4BankCardNo %></span>'+
	        '</div>'+
	        '<div class="bind_txt" style="display:none;">'+
	        	'<p>您的提现银行卡由账户托管方进行维护管理。</p>'+
	        	'<p>账户托管方将在工作日11:00、14:00、16:00，每天三次处理您的提现请求。</p>'+
	        '</div>'+
	    '</div>' +
    '<% } %>'
);
module.exports = wrapperTpl;