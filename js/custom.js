 /*-----------------------------------------------------------------------------------
/* Custom Scripts
-----------------------------------------------------------------------------------*/

/*----------------------------------------------------*/
/*	Carousel
/*----------------------------------------------------*/

// Add classes for other carousels

var $carousel;
var scrollCount;


function galleryCarouselItemLoadCallback(carousel, state){
	for (var i = carousel.first; i <= carousel.last; i++) {
		if (carousel.has(i)) {
			continue;
		}

		if (i > galleryImages.length) {
			break;
		}

		carousel.add(i, galleryCarouselItemHTML(galleryImages[i-1]));
	}
}

/**
 * Item html creation helper.
 */
function galleryCarouselItemHTML(item){
	// return '<li class="four columns"><a href="images/gallery/' + item.name + '" title="' + item.title + '" class="gallery-item lightbox-photo"><img src="images/gallery/thumbnails/' + item.name +'" alt="' + item.title + '"></a></li>';
	return '<li class="four columns"><a href="images/gallery/' + item.name + '" title="' + item.title + '" class="gallery-item lightbox-photo"><img class="lazy-load" src="images/paper.png" data-src="images/gallery/thumbnails/' + item.name +'" alt="' + item.title + '"></a></li>';
};
function loadImages(){
	galleryImages.forEach(function(item){
		$('#jc-gallery ul').append(galleryCarouselItemHTML(item));
	});
}

 function adjustScrollCount() {
	if( $(window).width() < 768 ) {
		scrollCount = 1;
	} else {
		scrollCount = 3;
	}

 }

function adjustCarouselHeight() {
	$carousel.each(function() {
		var $this    = $(this);
		var maxHeight = -1;
		$this.find('li').each(function() {
			maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
		});
		$this.height(maxHeight);
	});
}

function initCarousel() {
	$carousel = $('.gallery-jc');
	adjustCarouselHeight();
	adjustScrollCount();
	var i = 0;
	var g = {};
	$carousel.each(function() {
		i++;

		var $this = $(this);
		g[i] = $this.jcarousel({
			animation           : 400,
			transitions: Modernizr.csstransitions ? {
		        transforms:   Modernizr.csstransforms,
		        transforms3d: Modernizr.csstransforms3d,
		        easing:       'ease-in-out'
		    } : false,
			scroll              : scrollCount,
			size				: galleryImages.length,
		});
		$this.jcarousel('scroll', 0);
		g[i].on('scroll.jcarousel', function(event, carousel, target, animate) {
		    // "this" refers to the root element
		    // "carousel" is the jCarousel instance
		    // "target" is the target argument passed to the `scroll` method
		    // "animate" is the animate argument passed to the `scroll` method
		    //      indicating whether jCarousel was requested to do an animation
		    lazyLoader.throttledLoad();
		});
		$('#gallery-prev').bind('active.jcarouselcontrol', function() {
			$(this).addClass('active');
		}).bind('inactive.jcarouselcontrol', function() {
			$(this).removeClass('active');
		}).jcarouselControl({
			target: '-='+scrollCount,
			carousel: g[i]
		});

		$('#gallery-next').bind('active.jcarouselcontrol', function() {
			$(this).addClass('active');
		}).bind('inactive.jcarouselcontrol', function() {
			$(this).removeClass('active');
		}).jcarouselControl({
			target: '+='+scrollCount,
			carousel: g[i]
		});

		$this.touchwipe({
			wipeLeft: function() {
				$this.jcarousel('scroll','+='+scrollCount);
			},
			wipeRight: function() {
				$this.jcarousel('scroll','-='+scrollCount);
			}
		});

	});
}

 $(window).resize(function () {
	$carousel.each(function() {
		var $this = $(this);
		$this.jcarousel('destroy');
	});
	initCarousel();
 });


var loginradiusoptions={};      
loginradiusoptions.login=true;  

function Successfullylogin() {
	LoginRadiusSDK.getUserprofile(function (data) {
			  //just display to a html element 
			  console.log(JSON.stringify(data));
			  authenticated(data);
		  });
	return false;
};
LoginRadiusSDK.onlogin = Successfullylogin;
LoginRadius_SocialLogin.util.ready(function () { 
	$ui = LoginRadius_SocialLogin.lr_login_settings;
	$ui.interfacesize = "";
	$ui.apikey = "7a297d1e-30c4-41ac-ae1f-7daf798fd96b";
	$ui.callback=""; 
	$ui.lrinterfacecontainer ="interfacecontainerdiv"; 
	LoginRadius_SocialLogin.init(loginradiusoptions);  
}); 


function goToByScroll(dataslide) {
	htmlbody.animate({
		scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top -60
	}, 900, 'easeInOutQuint');
}
 /*----------------------------------------------------*/
/*	Scrolling window
/*----------------------------------------------------*/

$(window).load(function () {
	var addEventListener =  window.addEventListener || function(n,f) { window.attachEvent('on'+n, f); },
      	removeEventListener = window.removeEventListener || function(n,f,b) { window.detachEvent('on'+n, f); };  
	loadImages();
	initCarousel();
	lazyLoader.init(document.querySelector('#jc-gallery ul'));
	
	$(window).stellar();

	var links = $('.navigation').find('li');
	slide = $('.slide');
	button = $('.button');
	htmlbody = $('html,body');

	links.click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		if( $(window).width() < 768 )
			$('#toggle').trigger('click');
		goToByScroll(dataslide);
	});

	button.click(function (e) {
		e.preventDefault();
		dataslide = $(this).attr('data-slide');
		goToByScroll(dataslide);

	});

	/*----------------------------------------------------*/
	/*	Lightbox
	/*----------------------------------------------------*/	

	// $( ".lightbox-photo" ).rlightbox();
	if( $(window).width() >= 768 ) {
		var lightboxOptions = {
			delegate: 'a',
			type:'image',
			disableOn: function() {
			  if( $(window).width() < 600 ) {
			    return false;
			  } 
			  return true;
			},
			closeBtnInside: true,
			removalDelay: 300,
	  		mainClass: 'mfp-fade',
			gallery: {
				enabled: true, // set to true to enable gallery
				preload: [0,2], // read about this option in next Lazy-loading section
				navigateByImgClick: true,
				arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
				tPrev: 'Previous (Left arrow key)', // title for left button
				tNext: 'Next (Right arrow key)', // title for right button
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title');
				}
			}
		};
		$('#about').magnificPopup(lightboxOptions);
		$('#jc-gallery').magnificPopup(lightboxOptions);
	} else {
		$('#about a').attr('href', 'javascript: void(0)');
		$('#jc-gallery a').attr('href', 'javascript: void(0)');
	}

});

/*
/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch, iPad, and Android mobile phones
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 */
 (function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);


