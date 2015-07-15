var agreement1 = require('pc:agreement/invest');
var agreement2 = require('pc:agreement/refund');


var ProtocolController = function(){
	var t = this;
	t.html = '<div id="protocolModule" class="protocol_module">'+
				'<p class="statusTitle">无密协议</p>'+
				'<div class="Box">'+
					'<div class="statusBox fl">'+
						'<p class="mt60"><input type="checkbox" id="argee1" value="1" /><span class="f18"> 同意并签署</span><a class="blue uLine f18" id="agreement1">《快速投资协议》</a></p>'+
						'<p class="pl20">请签署此协议，否则无法投资<span></span></p>'+

						'<p class="mt30 isRefundAgreement"><input type="checkbox" id="argee2" value="1" /><span class="f18"> 同意并签署</span><a class="blue uLine f18" id="agreement2">《快速还款协议》</a></p>'+
						'<p class="pl20 isRefundAgreement">如果您是<font color="red">借款人</font>，请签署此协议</p>'+
						
					'</div>'+
					'<div class="fr buttonGather">'+
						'<button id="confirm" class="submit btn_blue" style="margin-top:80px;">签署协议</button>'+
						'<button id="remove" class="submit btn_blue" style="margin-top:80px;">签署协议</button>'+

						'<button id="confirm1" class="submit btn_blue">签署协议</button>'+
						'<button id="remove1" class="submit btn_blue">签署协议</button>'+

						'<button id="remove2" class="submit btn_blue">签署协议</button>'+
						'<button id="confirm2" class="submit btn_blue">签署协议</button>'+
					'</div>'+
				'</div>'+
			'</div>';
	t.el = $(t.html);
    t.init();
    t.getUesrInfo();
};

// '<button id="confirm" class="submit btn_blue">签署协议</button>'+
// 						'<button id="remove" class="submit btn_blue">签署协议</button>'+
ProtocolController.prototype = {
	init: function(){
		var t = this;
		$('#accountMain').html(t.el);
		t.findEl();
    	t.events();
	},
	render: function(){
		var t = this;
		t.init();
	},
	getUesrInfo:function(){
		Transceiver.listen('userInfo','accountPandectModule.init',function(data){
			var user         = JSON.parse(data);
			$('.buttonGather button').hide();
			if(!user.isAgreement && !user.isRefundAgreement && user.isBorrower){
				$('#confirm').show();
			}else if(user.isAgreement && user.isRefundAgreement && user.isBorrower){
				$('input#argee1').attr("checked",'true').attr("disabled",'true');
				$('input#argee2').attr("checked",'true').attr("disabled",'true');
				$('#remove').show().html('解除协议');;
			}else{
				if(user.isAgreement){
					$('input#argee1').attr("checked",'true').attr("disabled",'true');
					$('#remove2').show().html('解除协议');
				}else{
					$('#confirm1').show();
				}

				if(user.isBorrower){
					if(user.isRefundAgreement){
						$('input#argee2').attr("checked",'true').attr("disabled",'true');
						$('#remove1').show().html('解除协议');
					}else{
						$('#confirm2').show();
					}
				}else{
					$('.isRefundAgreement').hide();
				}
			}
			
		});
	},
	findEl :function(){
		var t = this;
		t.argee1 = t.el.find('#argee1');
		t.argee2 = t.el.find('#argee2');

		t.regEleInfo = {
			argee1:{
				el:t.argee1,
				info:"请阅读并同意快速投资协议",
				otherFun:function(obj){
					if(!obj.el.attr('checked')){
			    		return false;
			    	}else{
			    		return true;
			    	}
				}
			},
			argee2:{
				el:t.argee2,
				info:"请阅读并同意快速还款协议",
				otherFun:function(obj){
					if(!obj.el.attr('checked')){
			    		return false;
			    	}else{
			    		return true;
			    	}
				}
			}
		};
	},
	openAgreement:function(arr){
		var t = this;
		var params = {
			url: J.Api.prepareBindBindAgreement,
			data: arr,
			callback: function(data) {
				//打开新窗口
				J.Utils.submitForm({
					url:data.url,
					method :'post',
					param: data.param,
					onSubmit: function(){
							//弹出框 
							var obj = {
						 		content: '请在弹出的窗口上进行签署投资协议操作，完成后请确认！',
						 		onSureCallback: function(){
						 			//location.reload();
						 			t.el = $(t.html);
						 			$('#accountMain').html(t.el);
									t.findEl();
									t.events();
									t.getUesrInfo();
						 		},
						 		okValue: '确 认',
						 		cancelValue: '取消'
						 	};
							J.Utils.confirm(obj);
					}
				})
			}
		}
		J.Utils.sendAjax(params);
	},
	closeAgreement:function(arr){
		var t = this;
		var params = {
			url: J.Api.removeAgreement,
			data: arr,
			callback: function(data) {
				//打开新窗口
				J.Utils.submitForm({
					url:data.url,
					method :'post',
					param: data.param,
					onSubmit: function(){
							//弹出框 
							var obj = {
						 		content: '请在弹出的窗口上进行解锁投资协议操作，完成后请确认！',
						 		onSureCallback: function(){
						 			//location.reload();
						 			t.el = $(t.html);
						 			$('#accountMain').html(t.el);
									t.findEl();
									t.events();
									t.getUesrInfo();
						 		},
						 		okValue: '确 认',
						 		cancelValue: '取消'
						 	};
							J.Utils.confirm(obj);
					}
				})
			}
		}
		J.Utils.sendAjax(params);
	},
	getAgreement:function(){
		var t = this;
		return {
				isAgreement : t.argee1.attr("checked") == 'checked' ? true : false,
			    isRefundAgreement : t.argee2.attr("checked") == 'checked' ? true : false
		    }
	},
	events : function(){
	    var t = this;

	    t.el.delegate('#confirm', 'click', function(e){ 
	    	var obj = t.getAgreement();
	    	if(t.regEleInfo.argee1.otherFun(t.regEleInfo.argee1) || t.regEleInfo.argee2.otherFun(t.regEleInfo.argee2)){
		    		t.openAgreement({isAgreement:obj.isAgreement,isRefundAgreement:obj.isRefundAgreement});	    		
		    }else{
		    	var para = {
					 content: '请阅读并同意签署至少一种协议',
					 okValue: '确 认'
				};
				J.Utils.alert(para);
		    }
	    });
	     t.el.delegate('#confirm1', 'click', function(e){ 
	     	var obj = t.getAgreement();
	    	if(t.regEleInfo.argee1.otherFun(t.regEleInfo.argee1)){
		    		t.openAgreement({isAgreement:true,isRefundAgreement:obj.isRefundAgreement});	    		
		    }else{
		    	var para = {
					 content: '请阅读并同意签署快速投资协议',
					 okValue: '确 认'
				};
				J.Utils.alert(para);
		    }
	    });
	     t.el.delegate('#confirm2', 'click', function(e){ 
	     	var obj = t.getAgreement();
	    	if(t.regEleInfo.argee2.otherFun(t.regEleInfo.argee2)){
		    		t.openAgreement({isAgreement:obj.isAgreement,isRefundAgreement:true});	    		
		    }else{
		    	var para = {
					 content: '请阅读并同意签署快速还款协议',
					 okValue: '确 认'
				};
				J.Utils.alert(para);
		    }
	    });
	    t.el.delegate('#remove', 'click', function(e){
    		t.closeAgreement({isAgreement:true,isRefundAgreement:true});	
	    });

	    t.el.delegate('#remove2', 'click', function(e){ 
	    	var obj = t.getAgreement();
    		t.closeAgreement({isAgreement:true,isRefundAgreement:obj.isRefundAgreement});	
	    });
	    t.el.delegate('#remove1', 'click', function(e){ 
	    	var obj = t.getAgreement();
    		t.closeAgreement({isAgreement:obj.isAgreement,isRefundAgreement:true});	
	    });

	    $('#agreement1').click(function(){
	    	J.Utils.dialog({
		 		content: agreement1,
		 		width:600,
		 		title:'快速投资协议',
		 		okValue: '已阅读并同意快速投资协议',
		 		ok: true
		 	}).show();
	    });
	    $('#agreement2').click(function(){
	    	J.Utils.dialog({
		 		content: agreement2,
		 		width:600,
		 		title:'快速还款协议',
		 		okValue: '已阅读并同意快速还款协议',
		 		ok: true
		 	}).show();
	    });
	    

	}
};

ProtocolController.prototype.constructor = ProtocolController;
module.exports = ProtocolController;