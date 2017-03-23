/**
 * 类库名称：Template
 * 实现功能：一个简单的模板函数,实现基本的变量替换
 * 作者主页：http://www.miaoqiyuan.cn/
 * 联系邮箱：mqycn@126.com
*/
var Template = function(template, out){
	
	//初始化
	this.set = function(template, out){
		this.template = $(template).html();
		this.out = out;
	};
	
	//批量替换
	this.replace = function(data, template){
		var template = template || this.template;
		for(var data_item in data){
			template = template.replace(new RegExp('\\{' + data_item + '\\}','g'), data[data_item]);
		}
		return template;
	};
	
	//输出
	this.parse = function(data, template){
		if( typeof this.parseInit == "function" ){
			this.parseInit(data);
		}
		$(this.out).append(this.replace(data, template));
	};
	
	//加载项目
	this.load = function(data){
		if ( !!('resource' in data) && data.resource instanceof Array ){
			var item = data.resource.shift();
			if( !!item ){
				var me = this;
				$.ajax({
					url : item[1],
					success : function(html){
						data[item[0]] = html;
					},
					error : function(html){
						data[item[0]] = 'can\'t load: ' + item[1];
					},
					complete : function(html){
						me.load(data);
					}
				});
				return;
			}
		}
		this.parse(data);
	};
	
	if( !!template && !! out ){
		this.set(template, out);
	}
};