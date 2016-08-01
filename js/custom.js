jQuery(document).ready(function () {
    var $logo = $('#logo');
    var $footerStrip = $('#footerStrip');
    $('.tab-resume,.tab-portfolio,.tab-contact,.tab-about,.tab-inquiry').click(function () {
        $logo.fadeIn('slow');
        $footerStrip.fadeIn('slow');
		$('#inquiryCrnrTri').fadeIn('slow');
    });
    $('.tab-profile').click(function () {
        $logo.fadeOut('slow');
        $footerStrip.fadeOut('slow');
		$('#inquiryCrnrTri').fadeIn('slow');
    });
    $('.tab-inquiry').click(function () {
        $('#inquiryCrnrTri').fadeOut('slow');
    });
	$($logo).click(function(){
		clickDynamic('aboutmeIcon');
	});
    $('#photo-slider').flexslider({
        pauseOnHover: true,
		start: function(){
			
		},
        touch: true,
        mousewheel: true,
        animation: "fade",
        controlNav: false
    });
	$('#testimonials').flexslider({
		animation:"fade",
		slideshow : true,
		controlNav : true,
		directionNav: false,
		slideshowSpeed: 3000, //Set the speed of the slideshow cycling, in milliseconds
		animationSpeed: 600 //Set the speed of animations, in milliseconds
	});
    var $content = $("#content");
    $content.easytabs({
        animate: true,
        updateHash: false,
        transitionIn: 'slideDown',
        transitionOut: 'slideUp',
        animationSpeed: 600,
        tabs: "> .menu > ul > li",
        tabActiveClass: 'active',
    });
    $content.find('.tabs li a').hover(function () {
        $(this).stop().animate({
            marginTop: "-7px"
        }, 200);
    }, function () {
        $(this).stop().animate({
            marginTop: "0px"
        }, 300);
    });
    var $container = $('#portfolio-list');
    var $filter = $('#portfolio-filter');
    $container.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear'
        }
    });
    $filter.find('a').click(function () {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false,
            }
        });
        return false;
    });
    $container.find('img').adipoli({
        'startEffect': 'transparent',
        'hoverEffect': 'boxRandom',
        'imageOpacity': 0.6,
        'animSpeed': 100,
    });
    $filter.find('a').click(function () {
        var currentOption = $(this).attr('data-filter');
        $filter.find('a').removeClass('current');
        $(this).addClass('current');
    });
/*    $container.find('a').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 200,
        'speedOut': 200,
        'overlayOpacity': 0.6
    });*/
	$container.find('a').fancybox({
		wrapCSS    : 'fancybox-custom',
		closeClick : true,

		openEffect : 'fade',

		helpers : {
			title : {
				type : 'inside'
			},
			overlay : {
				css : {
					'background' : 'rgba(0,0,0,0.85)'
				}
			}
		}
	});
    var $map = $('#map'),
        $tabContactClass = ('tab-contact'),
        $address = 'Vastral Road, Ahmedabad, Gujarat, India';
    $content.bind('easytabs:after', function (evt, tab, panel) {
        if (tab.hasClass($tabContactClass)) {
            $map.gMap({
                address: $address,
                zoom: 16,
                markers: [{
                    'address': $address
                }]
            });
        }
    });

	// hide #back-top first
	$("#back-top").hide();
	
	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 20) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

/*	$("ul#company-list").simplecarousel({
		width:102,
		height:70,
		visible: 8,
		auto: 5000
	});
*/
	getUserDetails();
});

$(window).load(function() {
});

function clickDynamic(id){
	$('#'+id).click();
}
function validateContactForm(){
	var cf = document.forms['contactform'];
	var cfName = cf.name;
	if(cfName.value == '' || cfName.value == null){
		alert("Please enter your name");cfName.focus();return false;
	}
	if(!cfName.value.match(/^[a-zA-Z ]+$/)){
		alert("Please enter only alphabetics in your name");cfName.focus();return false;
	}
	var cfEmail = cf.email;
	if(cfEmail.value == '' || cfEmail.value == null){
		alert("Please enter your email");cfEmail.focus();return false;
	}
	if(!validateEmail(cfEmail.value)){
		alert("Please enter valid email address");cfEmail.focus();return false;
	}
	var cfMsg = cf.message;
	if(cfMsg.value == '' || cfMsg.value == null){
		alert("Please enter your message");cfMsg.focus();return false;
	}

	var $contactform = $('#contactform'),$success = 'Your message has been sent. Thank you!';

	$('input[type=submit]').attr('disabled', 'disabled');

	$.ajax({
		type: "POST",
		url: "script/contact_form.php",
		data: $('#contactform').serialize(),
		success: function (msg) {
			$('input[type=submit]').removeAttr('disabled');
			if (msg == 'SEND') {
				$('#contactform')[0].reset();
				response = '<div class="success">' + $success + '</div>';
			} else {
				response = '<div class="error">' + msg + '</div>';
			}
			$(".error,.success").remove();
			$contactform.prepend(response);
			setTimeout(function() {
				$(".error,.success").fadeOut('fast');
			}, 5000);
		}
	});
	return false;
}

function validateInquiryForm(){
	var icf = document.forms['InquiryActForm'];
	var FirstName = icf.FName;
	if(FirstName.value == '' || FirstName.value == null){
		alert("Please enter your first name");FirstName.focus();return false;
	}
	if(!FirstName.value.match(/^[a-zA-Z ]+$/)){
		alert("Please enter only alphabetics in your first name");FirstName.focus();return false;
	}
	var LastName = icf.LName;
	if(LastName.value == '' || LastName.value == null){
		alert("Please enter your last name");LastName.focus();return false;
	}
	if(!LastName.value.match(/^[a-zA-Z ]+$/)){
		alert("Please enter only alphabetics in your last name");LastName.focus();return false;
	}
	var Email = icf.Email;
	if(Email.value == '' || Email.value == null){
		alert("Please enter your email address");Email.focus();return false;
	}
	if(!validateEmail(Email.value)){
		alert("Please enter valid email address");Email.focus();return false;
	}
	var PhoneNumber = icf.PhoneNumber;
	if(PhoneNumber.value == '' || PhoneNumber.value == null){
		alert("Please enter your phone number");PhoneNumber.focus();return false;
	}
	if(!PhoneNumber.value.match(/^[0-9+ ]+$/)){
		alert("Please enter valid phone number");PhoneNumber.focus();return false;
	}
	var ClientService = icf.ClientService;
	if(ClientService.value == '' || ClientService.value == null){
		alert("Please enter services you looking for");ClientService.focus();return false;
	}
	var ProjectType = icf.ProjectType;
	if(!validateRadio(ProjectType)){
		alert("Please choose your project type");ProjectType[0].focus();return false;
	}
	
	var $inquiryForm = $('#InquiryActForm'),$success = 'Your project has been sent. We will be in touch very soon, Thank you!';

	$('input[type=submit]').attr('disabled', 'disabled');

	$.ajax({
		type: "POST",
		url: "script/inquiry_form.php",
		data: $('#InquiryActForm').serialize(),
		success: function (msg) {
			$('input[type=submit]').removeAttr('disabled');
			if (msg == 'SEND') {
				$('#InquiryActForm')[0].reset();
				response = '<div class="success">' + $success + '</div>';
			} else {
				response = '<div class="error">' + msg + '</div>';
			}
			$(".error,.success").remove();
			$inquiryForm.prepend(response);
			setTimeout(function() {
				$(".error,.success").fadeOut('fast');
			}, 10000);
		},
		complete:function(){
			$('body, html').animate({scrollTop:$('#InquiryActForm').offset().top}, 'slow');
		}
	});
	return false;
}
function validateRadio (radios)
{
	for (i = 0; i < radios.length; ++ i)
	{
		if (radios [i].checked) return true;
	}
	return false;
}
function validateEmail(email)
{
    var splitted = email.match("^(.+)@(.+)$");
    if (splitted == null) return false;
    if (splitted[1] != null)
    {
        var regexp_user = /^\"?[\w-_\.]*\"?$/;
        if (splitted[1].match(regexp_user) == null) return false;
    }
    if (splitted[2] != null)
    {
        var regexp_domain = /^[\w-\.]*\.[A-Za-z]{2,4}$/;
        if (splitted[2].match(regexp_domain) == null)
        {
            var regexp_ip = /^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
            if (splitted[2].match(regexp_ip) == null) return false;
        } // if
        return true;
    }
    return false;
}
function getUserDetails(){
	$.ajax({type: "POST",url: "script/userDetect.php"});
}