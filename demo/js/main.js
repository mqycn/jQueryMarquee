$(function(){
	$('.navbar-nav>li>a').click(function(){
		if( !$(this).hasClass('dropdown-toggle') ){
			$(this).parent().addClass('active').siblings().removeClass('active');
		}
	});
	$('.dropdown-menu>li>a').click(function(){
		$(this).parent().addClass('active').siblings().removeClass('active').parent().parent().addClass('active').siblings().removeClass('active');
	});
	$('.navbar-nav li>a').click(function(){
		if( $(this).attr('href').substr(0, 1) == '#' ){
			$target = $($(this).attr('href'));
			if( $target.length > 0 ){
				$target.addClass('panel-primary').siblings().removeClass('panel-primary');
				var scrollTop = parseInt($target.offset().top) - parseInt($('body').css('padding-top'));
				setTimeout(function(){
					$(document).scrollTop(scrollTop);
				}, 10);
			}
		}
	});
	var tpl = {
		set : function(t, o){
			this.template = $(t).html();
			this.out = o;
		},
		parse : function(data, template){
			template = template || this.template;
			for(var data_item in data){
				template = template.replace(new RegExp('\\{' + data_item + '\\}','g'), data[data_item]);
			}
			template = template.replace(/\$\(function/, 'setTimeout(function').replace(/\}, #TIME#\);/, '}, 100);').replace(/\}, #TIME#\);/, '});');
			$(this.out).append(template);
		},
		load : function(data){
			if ( !!('resource' in data) && data.resource instanceof Array ){
				var item = data.resource.shift();
				if( !!item ){
					$.ajax({
						url : item[1],
						success : function(html){
							data[item[0]] = html;
						},
						error : function(html){
							data[item[0]] = 'can\'t load: ' + item[1];
						},
						complete : function(html){
							tpl.load(data);
						}
					});
					return;
				}
			}
			this.parse(data);
		},
		add : function(id, title){
			this.load({
				id : id,
				title : title,
				resource : [
					['code', 'demo/resource/' + id + '.html']
				]
			});
		}
	}
	tpl.set('#template', '.container-body');
	tpl.add('basic', '基本演示');
	tpl.add('direction_top', '自定义方向：向上');
	tpl.add('direction_bottom', '自定义方向：向下');
	tpl.add('direction_left', '自定义方向：向左');
	tpl.add('direction_right', '自定义方向：向右');
	tpl.add('speed', '移动速度');
	tpl.add('pixels', '移动像素数');
	tpl.add('callback', '回掉函数');
	tpl.add('advanced', '综合演示');
});