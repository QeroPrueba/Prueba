$(document).ready(function() {
	$(".fancybox").fancybox();

	$(".fancybox-iframe").fancybox({
		type: 'iframe',
		'width':   738,
		'height':  680,
		'fitToView' : false,
		helpers   : { 
		   overlay : {closeClick: false} // prevents closing when clicking OUTSIDE fancybox 
		}
	});

	$(".fancybox-pagamento").fancybox({
		type: 'iframe',
		'width':   980,
		'height':  680,
		'fitToView' : false,
		helpers   : { 
		   overlay : {closeClick: false} // prevents closing when clicking OUTSIDE fancybox 
		},
		beforeClose: () => {
			let url = window.location.href;

			url += (url.includes('?') ? '&' : '?');

			url += 'act=true';

			setTimeout(() => window.location.href = url, 300);
		}
	});

	
});

function closeFancyboxPagamento() {
	setTimeout(() => $('.fancybox-close').click(), 1000)
};