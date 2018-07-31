;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};



	// Carousel Feature Slide
	var testimonialCarousel = function(){
		
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			animateOut: 'fadeOut',
			items: 1,
			loop: true,
			margin: 0,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: false
		});
	};

	var sliderMain = function() {
		
	  	$('#qbootstrap-slider-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};



	// animate-box
	var contentWayPoint = function() {

		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this).hasClass('animated') ) {
			
				$(this.element).addClass('fadeInUp animated');
			
			}

		} , { offset: '75%' } );

	};


	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-qbootstrap-nav-toggle', function(event){

			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');	
			} else {
				$(this).addClass('active');	
			}

			event.preventDefault();
			
		});

	};


	// Parallax
	var parallax = function() {
		if ( !isiPad() || !isiPhone() ) {
			$(window).stellar();
		}
	};



	// Page Nav
	var clickMenu = function() {

		$('a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');
		    $('html, body').animate({
		        scrollTop: $('[data-section="' + section + '"]').offset().top
		    }, 500);

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-qbootstrap-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});

	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};
	var navigationSection = function() {

		var $section = $('div[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		    
		  	}
		}, {
		  	offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#qbootstrap-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top qbootstrap-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top qbootstrap-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top qbootstrap-animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};



	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};


	var inlineSVG = function() {
		$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    $.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');

		});
	};
	

	// Set the date we're counting down to
		var countDownDate = new Date("Aug 18, 2018 07:30:00").getTime();

		// Update the count down every 1 second
		var x = setInterval(function() {

		// Get todays date and time
		var now = new Date().getTime();

		// Find the distance between now an the count down date
		var distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the result in an element with id="demo"
		// document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours "
		// + minutes + "Minutes " + seconds + "Seconds ";

		// Display the result in an element with id="demo"
		document.getElementById("days").innerHTML = days +" <small>days</small>";
		document.getElementById("hours").innerHTML = hours + " <small>hours</small> ";
		document.getElementById("minutes").innerHTML = minutes + " <small>minutes</small> ";
		document.getElementById("seconds").innerHTML = seconds + " <small>seconds</small> ";

		// If the count down is finished, write some text 
		if (distance < 0) {
		 clearInterval(x);
		 document.getElementById("demo").innerHTML = "Resepsi Pernikahan Kami Telah Usai, Terima Kasih!";
		}
		}, 1000);	
	
		
	var bgVideo = function() {
		$('.player').mb_YTPlayer();
	};
        

	// Document on load.
	$(function(){

		burgerMenu();
		testimonialCarousel();
		sliderMain();
		clickMenu();
		parallax();
		// windowScroll();
		navigationSection();
		contentWayPoint();
		inlineSVG();
		bgVideo();
	});


	(function() {
  function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }

  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;

    var fields = Object.keys(elements).filter(function(k) {
          return (elements[k].name !== "honeypot");
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    console.log(formData);
    return formData;
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
	    event.preventDefault();           // we are submitting via xhr below
	    var form = event.target;
	    var data = getFormData(form);         // get the values submitted in the form

	    /* OPTION: Remove this comment to enable SPAM prevention, see README.md
	    if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
	      return false;
	    }
	    */

	    if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
	      var invalidEmail = form.querySelector(".email-invalid");
	      if (invalidEmail) {
	        invalidEmail.style.display = "block";
	        return false;
	      }
	    } else {
	      disableAllButtons(form);
	      var url = form.action;
	      var xhr = new XMLHttpRequest();
	      xhr.open('POST', url);
	      // xhr.withCredentials = true;
	      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	      xhr.onreadystatechange = function() {
	          console.log(xhr.status, xhr.statusText);
	          console.log(xhr.responseText);
	          var formElements = form.querySelector(".form-elements")
	          if (formElements) {
	            formElements.style.display = "none"; // hide form
	          }
	          var thankYouMessage = form.querySelector(".thankyou_message");
	          if (thankYouMessage) {
	            thankYouMessage.style.display = "block";
	          }
	          return;
	      };
	      // url encode form data for sending as post data
	      var encoded = Object.keys(data).map(function(k) {
	          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
	      }).join('&');
	      xhr.send(encoded);
	    }
	  }
	  
	  function loaded() {
	    console.log("Contact form submission handler loaded successfully.");
	    // bind to the submit event of our form
	    var forms = document.querySelectorAll("form.gform");
	    for (var i = 0; i < forms.length; i++) {
	      forms[i].addEventListener("submit", handleFormSubmit, false);
	    }
	  };
	  document.addEventListener("DOMContentLoaded", loaded, false);

	  function disableAllButtons(form) {
	    var buttons = form.querySelectorAll("button");
	    for (var i = 0; i < buttons.length; i++) {
	      buttons[i].disabled = true;
	    }
	  }
	})();


}());