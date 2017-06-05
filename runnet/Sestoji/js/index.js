

//自动播放
$('#myCarousel').carousel({
	interval:3000
})
 function scroll_style() {
          var window_top = $(window).scrollTop();
          if(window_top > 2){
            $(".navbar").addClass("change");
            $(".navbar-brand img").attr("src", "img/logo.png");
          }else{
             $(".navbar").removeClass( "change" );
             $(".navbar-brand img").attr("src", "img/logo2.png");
          }
        }

$(window).scroll(function(){
	scroll_style();
})
//折叠
$('.panel-collapse').on('show.bs.collapse', function () {
	$(this).prev().children('h4').removeClass('accordion-toggle');
	$(this).prev().children('h4').addClass('accordion-toggle1');
	$(this).prev().addClass('te2');
})
$('.panel-collapse').on('hide.bs.collapse', function () {
   $(this).prev().children('h4').removeClass('accordion-toggle1');
   $(this).prev().children('h4').addClass('accordion-toggle');
   $(this).prev().removeClass('te2');
})
//跑马灯
 $('.newsSlidder').easyTicker({
          direction: 'up',
          easing: 'swing',
          visible: 3
});


