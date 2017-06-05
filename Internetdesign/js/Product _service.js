$('#myCarousel').carousel({
	'interval':2000	
})
$('.title').mouseover(function(){
	var index=$(this).index();
	$(this).stop().animate({
		'height':'100px',
		'line-height':'100px'
	}).siblings().stop().animate({
		'height':'50px',
		'line-height':'50px'
	})
	$('.detailed:eq('+index+')').show().siblings().hide();
})
