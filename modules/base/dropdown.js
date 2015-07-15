/*
文件名:jquery.select.js
功能说明:本js文件为jquery类库的一个插件,主要实现对select的操作.
作者:laibin jia
编写日期:2014/9/5
*/
//生成一个select

(function($){
	$.fn.dropdown = function(method){
	    if ( methods[method] ) {  
		    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));  
		} else if ( typeof method === 'object') {  
		    return methods.init.apply( this, arguments );  
		} else {  
		    $.error( 'Method ' +  method + ' does not exist on jQuery.select' );  
		}
		
	};
	var methods = {
	    init : function(config){
		    var t = methods,$this = $(this), $select = $('<select class="'+config.className+'"></select>');
		    if(config.data && config.data.length){
				$select.html(t.optionsHtml(config.data,config.valueField,config.textField));
			}else{
				$.ajax({
					url: config.url || '',
					type: config.method || 'GET',
					data: t.ajaxData,
					dataType:'json',
					success: function(res){
						if (res.status == 200) {
							$select.html(t.optionsHtml(res.data.results,config.valueField,config.textField));
							$this.html($select);
						}else{
							J.DEBUG && console.log('没有数据或数据错误');
                    		return;
						}
					}
				});
			}
		},
		optionsHtml : function(data,valueField,textField){
			var options = '';
			$.each(data,function(i, item){
				var isSel = item.selected ? 'selected="selected"' : '';
				options += '<option value="'+ item[valueField]+'" '+ isSel +'>'+ item[textField] +'</option>';
			});
			return options;
		},
	    //获得select的value
	    getValue : function(){
		    return $(this).val();
		},
		//得到select项的个数
		size : function(){
		    return $(this).children().length;
		},
		//获得选中项的索引
        getSelectedIndex : function(){
			return $(this).get(0).selectedIndex;
		},
		//获得当前选中项的文本
		getSelectedText : function(){
		    var t = methods;
			if(t.size.call(this) == 0){
				return "下拉框中无选项";
			}else{
				var index = t.getSelectedIndex.call(this);      
				return $(this).get(0).options[index].text;
			}
		},
		//获得当前选中项的值
		getSelectedValue : function(){  
            var t = methods;		
			if(t.size.call(this) == 0){
				return "下拉框中无选中值";
			}else{
				return $(this).val();
			}
		},
		//设置select中值为value的项被选中
		setSelectedValue : function(value){
			$(this).get(0).value = value;
		},
		//设置select中文本为text的项被选中
		setSelectedText : function(text){
		    var t = methods, isExist = false, count = t.size.call(this);
			for(var i=0;i<count;i++){
				if($(this).get(0).options[i].text == text){
					$(this).get(0).options[i].selected = true;
					isExist = true;
					break;
				}
			}
			if(!isExist){
				alert("下拉框中不存在该项");
			}
		},
		//设置选中指定索引项
		setSelectedIndex : function(index){
		    var t = methods, count = t.size.call(this);    
			if(index >= count || index < 0){
				alert("选中项索引超出范围");
			}else{
				$(this).get(0).selectedIndex = index;
			}
		},
		//判断select项中是否存在值为value的项
		isExistItem : function(value){
		    var t = methods, isExist = false, count = t.size.call(this);
			for(var i=0;i<count;i++){
				if($(this).get(0).options[i].value == value){
					isExist = true;
					break;
				}
			}
			return isExist;
		},
		//向select中添加一项，显示内容为text，值为value,如果该项值已存在，则提示
		addOption: function(text,value){
		    var t = methods;
			if(t.isExistItem.call(this,value)){
				alert("待添加项的值已存在");
			}else{
				$(this).get(0).options.add(new Option(text,value));
			}
		},
		//删除select中值为value的项，如果该项不存在，则提示
		removeOption : function(value){ 
            var t = methods;		
			if(t.isExistItem.call(this,value)){
				var count = t.size.call(this);        
				for(var i=0;i<count;i++)
				{
					if($(this).get(0).options[i].value == value)
					{
						$(this).get(0).remove(i);
						break;
					}
				}        
			}else{
				alert("待删除的项不存在!");
			}
		},
		//删除select中指定索引的项
		removeIndex : function(index){
			var t = methods, count = t.size.call(this);
			if(index >= count || index < 0){
				alert("待删除项索引超出范围");
			}else{
				$(this).get(0).remove(index);
			}
		},
		//删除select中选定的项
		removeSelected : function(){
			var t = methods, index = t.getSelectedIndex.call(this);
			t.removeIndex.call(this,index);
		},
		//清除select中的所有项
		clearAll : function(){
			$(this).get(0).options.length = 0;
		}
	};
})(jQuery);


