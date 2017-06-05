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