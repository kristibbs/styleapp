$(document).ready(function(){  

if ($('body').hasClass('activate-cloud')) {
	
		$('body').on('click', '.cva-googledrive-button', function () {
			// GOOGLE DRIVE 
			onApiLoad();
		});

		  // The Browser API key obtained from the Google Developers Console.
		  var developerKey = 'AIzaSyCpUDTsMJbuSkx629rRA_va6b2NM79xs24';
		  // The Client ID obtained from the Google Developers Console.
		  var clientId = "32917156454.apps.googleusercontent.com";
		  // Scope to use to access user's photos.
		  var scope = ['https://www.googleapis.com/auth/drive.readonly'];

		  var pickerApiLoaded = false;
		  var oauthToken;

		  // Use the API Loader script to load google.picker and gapi.auth.
		  function onApiLoad() { 
				gapi.load('auth', {'callback': onAuthApiLoad});
				gapi.load('picker', {'callback': onPickerApiLoad});
		  }

		  function onAuthApiLoad() {
			gapi.auth.authorize(
				{
				  'client_id': clientId,
				  'scope': scope,
				  'immediate': false
				},
				handleAuthResult);
		  }

		  function onPickerApiLoad() { 
			pickerApiLoaded = true;
		  }

		  function handleAuthResult(authResult) {
			if (authResult && !authResult.error) {
				oauthToken = authResult.access_token;
				createPicker();
			} 
		  }

		  // Create and render a Picker object for picking documents from google drive.
		  function createPicker() {
			if (pickerApiLoaded && oauthToken) {
			  var picker = new google.picker.PickerBuilder().
				  addView(google.picker.ViewId.DOCUMENTS).
				  setOAuthToken(oauthToken).
				  setDeveloperKey(developerKey).
				  setCallback(pickerCallback).
				  build();
			  picker.setVisible(true);
			}
		  }

		  function pickerCallback(data) {
		
			var url = ' ';
			if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
			  	var doc = data[google.picker.Response.DOCUMENTS][0];
			  	url = doc[google.picker.Document.URL];
			  	var filename = doc[google.picker.Document.NAME];

			  	// manually pass google drive data to the cva form
			  	$('#cva-googledrive-file-path').val(url);
			  	$('.accessToken').val(oauthToken);
			  	$('.cva-googledrive-title').val(filename);
			  	$('#form_cv_cloudstorage_type').val('googledrive');


			}
			var message = url;
			document.getElementById('form_googledrive_cv-lbl').innerHTML = filename;
		  }	  

		  
	/* end of google drive code */

		// CREATE DROPBOX BUTTON
		var dropboxOptions = { success: function(files) {
											var oHiddenFilePath = $( 'input[data-dropbox-target="0"]' );
											oHiddenFilePath.val( files[0].link ).attr( 'data-dropbox-target', 0 );
											oHiddenFilePath.closest( 'form' ).find( 'input[name="form-cv-cloudstorage-type"]' ).val( 'dropbox');
											//oHiddenFilePath.closest( 'form' ).find( '.accessToken' ).val( '' );
											// outputs name of file for the user once file is selected
											oHiddenFilePath.closest( 'form' ).find( '.fileTitle' ).html( 'Selected file: ' + files[0].name );
										}
							 , cancel: function() {
											var oHiddenFilePath = $( 'input[data-dropbox-target="0"]' );
											oHiddenFilePath.attr( 'data-dropbox-target', 0 );
											oHiddenFilePath.closest( 'form' ).find( 'input[name="form-cv-cloudstorage-type"]' ).val( '');
										 }
							 , linkType: "direct"
							 , extensions: ['.pdf', '.doc', '.docx']
							 }; 
		
		var dropboxButton = Dropbox.createChooseButton( dropboxOptions );
		
		//$(".cva-dropbox-button").html(dropboxButton);
		$( 'select[name="form-cv-selector"]' ).on( 'change', function() {
			
			var oDropboxDiv = $(this).closest( 'form' ).find( '.cva-dropbox-button' );
			oDropboxDiv.html('').append( dropboxButton );
			
			$(oDropboxDiv).on( 'click', function() {
				$(this).next( 'input[type="hidden"]' ).attr( 'data-dropbox-target', 1 );
			});
		});

	/* end of dropbox code */
		
		
	/* end of activate-cloud body conditional statement */	  
	}
});


$(document).ready(function(){

/* CHRONOFORM VALIDATION */

/*

$("form#chronoform-contact").validate({

    rules:{
        name: "required",
        email: "required",
        message: "required"
    },
  
    messages: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        message: "Please provide details here."
    },

    highlight: function(element) {
        $(element).closest(".form-group").addClass('has-error').removeClass('has-success');
    },
    unhighlight: function(element) {
        $(element).closest(".form-group").removeClass('has-error').addClass('has-success');
    }
});
*/
});


$(document).ready(function(){

/*
	AUTOMATED GEOLOCATION SEARCH
	
	If a user doesn't specify a location, we want to substitute their geolocation data, 
	but only for supported countries. The supported countries list will change depending 
	on the specific brand. 
	
	At the present time, the key/pair list of supported countries 
	needs to be manually written for each brand.
*/

var oSupportedCountries = {
								GB: 10000001
							, 	DE: 37731
							,	FR: 37494
							,	NL: 38524
							,	BE: 37136
							,	US: 99
							,	AU: 35602
							,	SG: 44161
						}
						
var sThisGeolocation = $('#geolocation-data').text();
var iCountryValue = oSupportedCountries[sThisGeolocation]; // unsupported countries return 'undefined'
var ihiddenLocationValue = $('input[name="form-location"]').val();

if (iCountryValue != undefined) {
	if (ihiddenLocationValue == 0){ // if user hasn't already specified a country ...
		$('input[name="form-location"]').val(iCountryValue);
	}
}
 
    
});

$(document).ready(function(){
	
	$("span.extended-search").click(function() {
		$('.form-flyout').toggleClass('active'); 
		
	});
	
	$('#form_job_type').on('change', function() {
		
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
	})
	
	
	
});

  
//SThree Location search
var fGetLocations = function( request, response ) {
	var oElement = $(this.element)
	  , oTarget  = $( oElement.data('target') );
	oTarget.val( '' );
	oElement.addClass( 'unpopulated' ).removeClass( 'populated' );
	$.ajax( { url      : $(this.element).data('serviceUrl')
	        , dataType : 'jsonp'
	        , data     : {	location : request.term
	        	         ,	language : $(this.element).data('language')
	        	         ,  count    : $(this.element).data('count')
                         }
            , crossDomain: true
            , success : function(data) {
	            			if (data.length > 0) {
	            				oElement.addClass( 'valid' ).removeClass( 'inValid' );
	            				response( $.map( data
	     	    						       , function( oLocation ) {
			    									return { label : oLocation.full_location
			    										   , value : oLocation.id
			    										   , name  : oLocation.name
		                                                   };
			    							   }));
	            			} else {
	            				oElement.addClass( 'inValid' ).removeClass( 'valid' );
	            				response( [{ label : oElement.data('noResult').replace( '{location}', oElement.val() )
			    						   , value : -1
			    						   , name  : ''
			    						   }]);
	            			}
		    			}
		    } );
};

var fFocus = function( event, ui ) { 
	return false;
};

var fSelectLocation = function( event, ui ) {
	if(  ui.item.value != -1 ) {
		var oThis   = $(this)
		  , oTarget = $( oThis.data('target') );
		
		oTarget.val( ui.item.value ).data('location', ui.item.name );
		oThis.val( ui.item.name ).addClass( 'populated' ).removeClass( 'unpopulated' );
	}
	return false;
};

var fRenderItem = function( ul, item ) {
	var oContent = $( "<a>" ).text( item.label );
	if( $(this.element).hasClass( 'inValid' )  ) {
		ul.addClass( 'noResults' );
	} else {
		ul.removeClass( 'noResults' );
		if( item.label.indexOf( '>' ) != -1  ) {
			var sParents = item.label.substr( 0, item.label.lastIndexOf( '>' ) + 2 );
			oContent = $( "<a>" ).text( sParents ).append( $( '<span>').addClass('lsr').text( item.name ) );
		}
	}
	return $( "<li>" ).attr( "data-value", item.value )
					  .append( oContent )
					  .appendTo( ul );
};

var fRenderMenu = function( ul, items ) {
	var that = this;
	$.each( items, 	function( index, item ) {
						that._renderItemData( ul, item );
					});
	$( ul ).addClass( "locationSearch" );
};

var fChangeLocation = function() {
	var oThis   = $(this)
	  , oTarget = $( oThis.data('target') );
	
	if( oThis.val() != oTarget.data( 'location' ) ) {
		oTarget.data( 'location', '' ).val( '' );
		oThis.addClass( ).addClass( 'unpopulated' ).removeClass( 'populated' );
	}
};

$.widget( "custom.sthreeAutocomplete", $.ui.autocomplete, { _renderItem : fRenderItem, _renderMenu : fRenderMenu } );

var fBind = function() {
	var $this   = $(this)
	  , oTarget =  $( $this.data('target') );
	$this.sthreeAutocomplete( { source      : fGetLocations
                              , select      : fSelectLocation
                              , focus       : fFocus
                              , minLength   : 2
                              , appendTo    : $this.parent()
                              } );
	$this.on( 'keyup', fChangeLocation );
	if( oTarget.val().length == 0 ) {
		$this.addClass( 'unpopulated' );
	} else {
		$this.addClass( 'populated' ).addClass( 'valid' );
	}
}

$( function() {
	$( ".LocationService" ).each( fBind );
} );
$(document).ready(function(){

	// WHEN USER CLICKS THE PRIVACY AGREEMENT CHECKBOX, SET HIDDEN MARKETING CHECKBOXES TO ALSO CHECKED.
	// THIS ONLY HAPPENS WHEN USER DOES NOT HAVE A CV IN THE SYSTEM ALREADY
	function autoCheckMarketingPrefs(){
		if( $( 'body' ).hasClass( 'cv-out' ) || !$( 'body' ).hasClass( 'cv-in' ) ){
			// no CV detected, therefore we want to implement this auto-check behaviour on the marketing prefs
			$("#form_consultant_marketing_flag, #form_other_marketing_flag, #form_share_details_flag").prop("checked", true);
		}
	}
	
	// CVA PRIVACY AGREEMENT CHECKBOX
	$('#form_agree').click(function() {    
		autoCheckMarketingPrefs();
	});	
	

});


$(document).ready(function(){
	var $lateral_menu_trigger = $('.primary-nav h3'),
		$content_wrapper = $('.site-wrapper'),
		$navigation = $('.primary-nav > ul');
		$lateral_menu_trigger.on('click', function(event){;
		event.preventDefault();
		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('lateral-menu-is-open');
		$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});
// This will create toggable spans to display deeper menu links
$(".primary-nav .nav.menu li.parent" ).append( $( "<span>" ) );

$('.primary-nav .nav.menu li.parent span').click(function() {
	$(this).toggleClass('btn-active');
	$(this).prev().toggleClass('child-expanded');
 });


//close lateral menu clicking outside the menu itself
	/*$content_wrapper.on('click', function(event){
		if( !$(event.target).is('.primary-nav h3') ) {
			$lateral_menu_trigger.removeClass('is-clicked');
			$navigation.removeClass('lateral-menu-is-open');
			$content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$('#cd-lateral-nav').removeClass('lateral-menu-is-open');
			//check if transitions are not supported
			*//*if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}
		}
	});*/

// Lets look at the child menu items


$('.primary-nav h3').click(function() {
	$('.parent').toggleClass('extended');
 });



// add a span or could be a i,  to the dom. this will be a clickable element to expand the ul

$('.primary-nav h3').click(function(event) {
	//event.preventDefault();
	//if ($('.primary-nav li').hasClass('extended')) {
 	//$(".parent" ).append( $( "<span>" ) );
 });
//});



// when click the span (or whatever) the relevant ul should expand/collapse
//$('.primary-nav li.parent span').click(function() {
	//event.preventDefault();
	//$('.parent ul.nav-child').toggleClass('test');
	//$('.parent ul.nav-child').slideToggle();
//});

//$(".lateral-menu-is-open li.parent" ).append( $( "<span>" ) );

});

(function ( $ ) {
	 
    $.fn.bindChildrenToASelect = function( options ) {

    	var settings = $.extend( {
		    // These are the defaults.
		    bindParentClassPrefix: "bindTo",
		    bindChildClassPrefix : "boundToValue",
		    hasContainer         : true,
		    containerElement     : 'div',
		    placeholderElement   : 'div',
		    placeholderAttr      : 'data-boundTo',
		}, options );
		
    	return this.each( function() {
    		
			var sClass = $(this).attr('class');
			
			var aChildName = sClass.match( new RegExp( settings.bindParentClassPrefix + "\\[(.+?)\\]" ) ); 
			if ( aChildName == null ) {
				return;
			}
			
			var sChildName = aChildName[1];
			var $oForm = $(this).closest('form');
			var $oChildren = $oForm.find('[name="' + sChildName +'"]' );
			
			$(this).change( function() {       
			    
				var sSelectedValue = $(this).val();
				
				$oChildren.each( function( index ) {
					
					var $oElement = $(this);
					var aBoundValue = $oElement.attr('class').match( new RegExp( settings.bindChildClassPrefix + "\\[(.+?)\\]" ) ); 
					if ( aBoundValue == null ) {
						return;
					}
					
					var sBoundValue = aBoundValue[1];
					
					if(settings.hasContainer) {
						$oElement = $oElement.closest(settings.containerElement);
					} 
					
					if( sBoundValue == sSelectedValue ) {
						var $oPlaceholder = $(settings.placeholderElement + '[' + settings.placeholderAttr + '=' + index + ']', $oForm );
						if( $oPlaceholder.length > 0 ) {
							$oPlaceholder.replaceWith( $oElement );
						} else {
							$oElement.show();
						}
					} else {
						var $oPlaceholder = $('<' + settings.placeholderElement + '></' + settings.placeholderElement + '>').hide().attr( settings.placeholderAttr, index );
						$oElement.replaceWith( $oPlaceholder );
					}
				});
			});
			
			$(this).trigger('change');	
	    } );
    }; 
}( jQuery ));

$(function() {
	//$('select[name="form-job-type"]').bindChildrenToASelect();
	$('select[name="form-cv-selector"]').bindChildrenToASelect();
});
$(document).ready(function(){
$("span.extended-search").click(function() {
 $('.search-form-wrapper').toggleClass('active');
 $('.extended-search-group').toggleClass('active');
});
});
$(document).ready(function(){
	
	// we only want to run this recruitics code on the single job advert pages
	if($('body').hasClass('show-advert')) {
		
	// grab the advert reference from the page,
	// removing white space and unnecessary strings
	var advertRefOriginal = $('.job-ref').text();
	var adRefArray = advertRefOriginal.split(':');
	var advertReference = adRefArray[1];
	advertReference = advertReference.replace(/\s/g, '');
	
		dataLayer.push({  
		  event: 'gtm.dom',
		  eventCallback: function () {
				recruitics('jobview', advertReference);
			}
		});
	}
	

});

  

$(document).ready(function(){
	$('#tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})
});  