(function($) {
	var $currentSub = null;
	var $hoverSub = null;
	var $currentElement = null;
	var $subActive = null;

	/*
	 * On click
	 */
	$(".menu").on("click", function(e) {
		var $li = $(e.target).closest("li");
		var $ul = $(e.target).closest("ul");

		// hover obviously comes first, remove active_hov
		$currentElement.removeClass("active_hov");
		$currentSub = null;

		//remove active
		$ul.find("li").each(function(){
			$(this).removeClass("active");
		});

		//add active class to target <li>
		$li.addClass("active");

		//hide other sub
		$($ul.find("ul")).each(function(){
				$(this).hide();
		});

		//show sub menu if exists
		$li.children("ul").show();

		//remove other active found in sub
		$($li.find("li")).each(function(){
			$(this).removeClass("active");	
		});

		$($li.find("li")).each(function(){
			$(this).removeClass("active");	
		});
		//set first element in sub as active
		$li.children("ul").children("li:first-child").addClass("active");
	});

    /*   
	 * On hover
	 */

	$("li").on({ 
	
		mouseenter: function(e) {
			var $li  = $(e.target).closest("li");
			var $ul  = $(e.target).closest("ul");
			var ifSub = $(e.target).closest("ul").hasClass("menu_sub");
			
			$currentElement = $li;
			$currentSub = null;
	        $hoverSub = null;

			//hover on active doesn't affect
			if ($li.hasClass("active")) {
				return;
			}
            
            //hover doesn't affect breadcrumb
			if ($li.closest("div").hasClass("breadcrumb")) {
				return;
			}

			$li.addClass("active_hov");

			if (ifSub) {
				return;
			} 

			// remember sub if exists
			if ($li.children("ul").length) {
				$hoverSub = $li.children("ul");
			}	
			
			//find & hide current sub			
			$($ul.find("ul")).each(function() {	
				
				if ( $(this).css("display") === "block" ) {
					$currentSub = $(this);
					$currentSub.hide();
					//remember active class in sub
					$currentSub.find("li").each(function() {
						if ($(this).hasClass("active")) {
							$subActive =  $(this);
						}
					});
				}
			});
			
			if ($hoverSub != null) {
				//remove active found in sub
				$($hoverSub.children("li")).each(function() {
					$(this).removeClass("active");
				});

				$hoverSub.show();
			}
		},

		mouseleave: function(e) {
			var $li  = $(e.target).closest("li");

			if ($li.hasClass("active")) {
				return;
			}

			if ($li.closest("div").hasClass("breadcrumb")) {
				return;
			}
				
			$li.removeClass("active_hov");
 
			if ($hoverSub != null) {
				$hoverSub.hide();
			}

			if ($currentSub != null) {
				$currentSub.show();
			}

			if ($subActive != null) {
				$subActive.addClass("active");
			}

 		    $hoverSub = null;
		    $currentSub = null;
		    $subActive = null;
		}
	});

})(jQuery);