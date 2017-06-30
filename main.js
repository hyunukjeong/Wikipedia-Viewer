$("document").ready(function() {

	$searchForm = $("#search-form");
	$checker = $("#checker");

	$checker.hide(); // so that fadeIn() works the first time as well

	$searchForm.submit(function(event) {
		// $checker.hide();
		$checker
			.text("Your searched for: " + $("input:first")
			.val())
			.fadeIn(1000)
			.fadeOut(1000);
		return false;  // same as event.preventDefault(); NOTE: page reloads when a form is submitted.
	});



});