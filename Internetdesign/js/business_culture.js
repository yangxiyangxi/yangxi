$('#myCarousel').carousel({
	'interval':2000	
})

$('.title li:eq(0)').addClass('active')
$('.title li').mouseover(function(){
	var a=$(this).index();
	$(this).addClass('active').siblings().removeClass('active');
	$('.opposite li:eq('+a+')').show().siblings().hide();
})
