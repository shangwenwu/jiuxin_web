var agreement1 = require('pc:agreement/invest');
var agreement2 = require('pc:agreement/refund');
var newTab;

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
	getInfo:function(){
		var t = this;
		J.Utils.sendAjax({
	    	    url:J.Api.getUserInfo,
	        	callback:function(data){
	        		t.setStatus(data);
	        	},
	        	notLoginCallback:function(data){
	        		t.setStatus(data);
	        	}
        });
	},
	setStatus:function(user){
		$('.isRefundAgreement').show();
		$('#argee1').removeAttr('checked');
		$('#argee2').removeAttr('checked');
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
	},
	getUesrInfo:function(){
		var t = this;
		Transceiver.listen('userInfo','accountPandectModule.init',function(data){	
			var user = JSON.parse(data);		
			t.setStatus(user);
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
	openAgreement:function(arr,butName){
		var t = this;
		var butDom = $('#'+butName)
		var params = {
			disabled:{
				on:function(){
					//禁止开启行为
					butDom.removeAttr('id').css({'background':'#666','cursor':'inherit'});
				},
				off:function(){
					//禁止关闭行为
					butDom.attr('id',butName).css({'background':'#00205c','cursor':'pointer'});
				}
			},
			url: J.Api.prepareBindBindAgreement,
			type:'get',
			data: arr,
			callback: function(data) {
				//打开新窗口
				J.Utils.submitForm({
					url:data.url,
					method :'post',
					param: data.param,
					windowTarget: newTab,
					onSubmit: function(){
							//弹出框 
							var obj = {
						 		content: '请在弹出的窗口上进行签署投资协议操作，完成后请确认！',
						 		onSureCallback: function(){
						 			_hmt && _hmt.push(['_trackEvent', 'xieyi', 'kaitong',]);
						 			//location.reload();
						 			t.el = $(t.html);
						 			$('#accountMain').html(t.el);
									t.findEl();
									t.events();
									t.getInfo();
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
	closeAgreement:function(arr,butName){
		var t = this;
		var butDom = $('#'+butName)
		var params = {
			disabled:{
				on:function(){
					//禁止开启行为
					butDom.removeAttr('id').css({'background':'#666','color':'#fff','cursor':'inherit'});
				},
				off:function(){
					//禁止关闭行为
					butDom.attr('id',butName).css({'background':'#fff','color':'#00205c','cursor':'pointer'});
				}
			},
			url: J.Api.removeAgreement,
			type:'get',
			data: arr,
			callback: function(data) {
				//打开新窗口
				J.Utils.submitForm({
					url:data.url,
					method :'post',
					windowTarget: newTab,
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
									t.getInfo();
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
		    		//{isAgreement:obj.isAgreement,isRefundAgreement:obj.isRefundAgreement}
		    		if(obj.isAgreement && obj.isRefundAgreement){
		    			var agreementList = 'ZTBB0G00|ZHKB0H01';
		    		}else if(obj.isAgreement && !obj.isRefundAgreement){
		    			var agreementList = 'ZTBB0G00';
		    		}else if(!obj.isAgreement && obj.isRefundAgreement){
		    			var agreementList = 'ZHKB0H01';
		    		}
		    		newTab = window.open('about:blank');
		    		t.openAgreement({agreementList:agreementList},'confirm');	    		
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
	    			//{isAgreement:true,isRefundAgreement:obj.isRefundAgreement}
	    			newTab = window.open('about:blank');
		    		t.openAgreement({agreementList:'ZTBB0G00'},'confirm1');	    		
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
	    			//{isAgreement:obj.isAgreement,isRefundAgreement:true}
	    			newTab = window.open('about:blank');
		    		t.openAgreement({agreementList:'ZHKB0H01'},'confirm2');	    		
		    }else{
		    	var para = {
					 content: '请阅读并同意签署快速还款协议',
					 okValue: '确 认'
				};
				J.Utils.alert(para);
		    }
	    });
	    t.el.delegate('#remove', 'click', function(e){
	    	//{isAgreement:true,isRefundAgreement:true}
	    	newTab = window.open('about:blank');
    		t.closeAgreement({agreementList:'ZTBB0G00|ZHKB0H01'},'remove');	
	    });

	    t.el.delegate('#remove2', 'click', function(e){ 
	    	var obj = t.getAgreement();
	    	newTab = window.open('about:blank');
	    	//{isAgreement:true,isRefundAgreement:obj.isRefundAgreement}
    		t.closeAgreement({agreementList:'ZTBB0G00'},'remove2');	
	    });
	    t.el.delegate('#remove1', 'click', function(e){ 
	    	var obj = t.getAgreement();
	    	newTab = window.open('about:blank');
	    	//{isAgreement:obj.isAgreement,isRefundAgreement:true}
    		t.closeAgreement({agreementList:'ZHKB0H01'},'remove1');	
	    });

	    $('#agreement1').click(function(){
	    	J.Utils.dialog({
		 		content: agreement1,
		 		width:600,
		 		title:'快速投资协议',
		 		okValue: '已阅读并同意快速投资协议',
		 		ok: function(){
		 			if(!$('#argee1').attr('checked')){
		 				$('#argee1').attr('checked',true);
		 			}
		 		}
		 	}).show();
	    });
	    $('#agreement2').click(function(){
	    	J.Utils.dialog({
		 		content: agreement2,
		 		width:600,
		 		title:'快速还款协议',
		 		okValue: '已阅读并同意快速还款协议',
		 		ok: function(){
		 			if(!$('#argee2').attr('checked')){
		 				$('#argee2').attr('checked',true);
		 			}
		 		}
		 	}).show();
	    });
	    

	}
};

ProtocolController.prototype.constructor = ProtocolController;
module.exports = ProtocolController;