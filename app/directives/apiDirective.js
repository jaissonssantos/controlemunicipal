'use strict'

app

	.directive('togglebtn', function(){
		return {
			link: function(scope, elem, attrs){
				elem.on("click", function(){
		            var body = $('body');
					var bodyposition = body.css('position');

					if(bodyposition != 'relative') {

					 if(!body.hasClass('sidebar-collapsed')) {
					    body.addClass('sidebar-collapsed');
					    jQuery('.side-navigation ul').attr('style','');

					 } else {
					    body.removeClass('sidebar-collapsed chat-view');
					    jQuery('.side-navigation li.active ul').css({display: 'block'});

					 }
					} else {

					 if(body.hasClass('sidebar-open'))
					    body.removeClass('sidebar-open');
					 else
					    body.addClass('sidebar-open');

					 	// Adjust main content height
					    var docHeight = $(document).height();
					    if(docHeight > $('.body-content').height())
					        $('.body-content').height(docHeight);
					}
				});
			}
		}
	})

	.directive('navsidebar', function(){
		return {
			link: function(scope, elem, attrs){
				elem.on("click", function(){
		            var parent = $(this).parent();
      				var sub = parent.find('> ul');

      				if(!$('body').hasClass('sidebar-collapsed')) {
				        if(sub.is(':visible')) {
					            sub.slideUp(300, function(){
					               	parent.removeClass('nav-active');
					               	$('.body-content').css({height: ''});
					               	// Adjust main content height
								    var docHeight = $(document).height();
								    if(docHeight > $('.body-content').height())
								        $('.body-content').height(docHeight);
					            });
				        } else {
				        
							$('.menu-list').each(function() {
							 var t = $(this);
							 if(t.hasClass('nav-active')) {
							    t.find('> ul').slideUp(300, function(){
							       t.removeClass('nav-active');
							    });
							 }
							});

				            parent.addClass('nav-active');
				            sub.slideDown(300, function(){
				                // Adjust main content height
							    var docHeight = $(document).height();
							    if(docHeight > $('.body-content').height())
							        $('.body-content').height(docHeight);
				            });
				        }
				    }

      				return false;
				});
			}
		}
	})

