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
});