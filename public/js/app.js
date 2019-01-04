'use strict';

$(document).ready(function() {
	$("body").on('click', '.top', function() {
		$("nav.menu").toggleClass("menu_show");
  });
  
  $('form').hide();
  $('#show-form').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log($(e.target).parent());
    $(e.target).parent().hide();
    $('form').show();
  })
});