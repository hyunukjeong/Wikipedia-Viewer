$("document").ready(function() {

	$searchForm = $("#search-form");
	$checker = $("#checker");
	$jsonChecker = $("#json-checker");

	$checker.hide(); // so that fadeIn() works the first time as well

	$searchForm.submit(function(event) {
		// $checker.hide();
		// var text = document.getElementById("text-input").value;
		var text = document.querySelector("#text-input").value;
		$checker
			.text("Your searched for: " + text)
			.fadeIn(700)
			.fadeOut(700);
		query(text);
		return false;  // same as event.preventDefault(); NOTE: page reloads when a form is submitted.

	});


	function query(searchTerm) {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='+searchTerm+'&srlimit=3&srprop=snippet&srinfo=Null&format=json&origin=*',
			success: function(data) {
				alert("success");
				var searches = data.query.search;
				var tempStr = "";
				// searches.forEach(function(item) {
				// 	tempStr += item.title + "<br>" + item.snippet + "<br>";
				// });
				// $jsonChecker.html(tempStr);
				$jsonChecker.html(JSON.stringify(searches));
			},
			error: function(jqXHR, status, err) {
				alert("error");
				$jsonChecker.html(JSON.stringify(jqXHR) + "\n\n\n" + status + "\n\n\n" + err);
			}
		});
	}



});