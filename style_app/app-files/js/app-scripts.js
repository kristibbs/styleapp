
//Search form
$(document).on("click", ".search-form-wrapper span.extended-search", function() {
	$('.search-form-wrapper').toggleClass('active');
	$('.search-form-wrapper .extended-search-group').toggleClass('active');
});

$(document).on("click", ".search-form-wrapper-aside span.extended-search", function() {
	$('.search-form-wrapper-aside').toggleClass('active');
	$('.search-form-wrapper-aside .extended-search-group').toggleClass('active');
});
	  
$(document).on("change", ".form-job-type-switcher", function() {
	if(this.value == 1) {
		// CONTRACT TYPE SELECTED
		$( ".form-item-active" ).removeClass( "form-item-active" );
		$(".form-contract-salary").parent().addClass("form-item-active");
	} else if (this.value == 2) {
		// PERMANENT TYPE SELECTED
		$( ".form-item-active" ).removeClass( "form-item-active" );
		$(".form-permanent-salary").parent().addClass("form-item-active");
	} else {
		// NO SALARY TYPE SELECTED
		$( ".form-item-active" ).removeClass( "form-item-active" );	
	}	
});


// Navigation
$(document).on("click", ('.navbar-toggle'), function() {
	$('.header-wrapper').toggleClass('active');
    $('.nav-wrapper').toggleClass('active');
  });

$(document).on("click", ('.fa-plus'), function() {
$(this).addClass('fa-minus').removeClass('fa-plus');
$(this).next('.nav-child').toggleClass('expanded');

  });
$(document).on("click", ('.fa-minus'), function() {
$(this).addClass('fa-plus').removeClass('fa-minus');
$(this).next('.nav-child').toggleClass('expanded');
  });

$(document).on("click", ('.lang'), function() {
$(this).toggleClass('expanded');
$(this).next('.lang-list').toggleClass('expanded');
$('.nav-wrapper').removeClass('active');
$('.header-wrapper').removeClass('active');
});

$(document).on("click", ('.featured-list-title'), function() {
$(this).toggleClass('expanded');
$('.featured-list-items').toggleClass('expanded');
});


$(document).on("click", ('.navbar-toggle'), function() {
	$('.header-wrapper').toggleClass('active');
    $('.nav-wrapper').toggleClass('active');
  });


$(document).on("click", ('.navbar-toggle'), function() {
	$(this).toggleClass('active');
    $('.navbar-collapse').toggleClass('in');
  });
