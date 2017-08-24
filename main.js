$("document").ready(function() {

	$searchForm = $("#search-form");
	$checker = $("#checker");
	$jsonChecker = $("#json-checker");

	$checker.hide(); // so that fadeIn() works the first time as well

	$searchForm.submit(function(event) {
		// $checker.hide();
		// var text = document.getElementById("text-input").value;
		var text = document.querySelector("#text-input");
		$checker
			.text("Your searched for: " + text.value)
			.fadeIn(700)
			.fadeOut(700);
		// query(text.value);
		query2(text.value);
		//text.value = "";  // empty the text field
		return false;  // same as event.preventDefault(); NOTE: page reloads when a form is submitted.

	});


	function query(searchTerm) {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='+searchTerm+'&srlimit=3&srprop=snippet&srinfo=Null&format=json&origin=*',
			// url: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles='+searchTerm+'exsentences=3&format=json&origin=*',
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

	function query2(searchTerm) {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: 'https://en.wikipedia.org/w/api.php',
			data: { 'action': 'query',
					prop: 'extracts',
					// pageids: '170570|3066589|38569806',
					generator: 'search',
					gsrsearch: searchTerm,
					exsentences: 1,
					exintro: true,
					format: 'json',
					origin: '*'},
			
			success: function(data) {
				console.log("success");
				var result = data.query.pages;
				var resultArr = Object.values(result);
				var tempStr = "";
				resultArr.forEach(function(item) {
					// tempStr += "<div class='page-links'><a href='https://en.wikipedia.org/?curid=" + item.pageid + "'' target='_blank'>"
					// 		+ "<b>" + item.title + "</b><br>" + stripHTML(item.extract) + "</a></div><br>"
					tempStr += "<a class='a-links' href='https://en.wikipedia.org/?curid=" + item.pageid + "'' target='_blank'>"
							+ "<b>" + item.title + "</b><br>" + stripHTML(item.extract) + "</a><br>"
				});
				$jsonChecker[0].innerHTML = tempStr; //jQuery always returns a HTMLCollection!!!
				// $jsonChecker.html(tempStr);  // This is an alternative using jQuery method
				// $jsonChecker.html(JSON.stringify(Object.values(result)));  //JSON check

			},
			error: function(jqXHR, status, err) {
				alert("error");
				$jsonChecker.html(JSON.stringify(jqXHR) + "\n\n\n" + status + "\n\n\n" + err);
			}
		});
	}

	// Strip HTML tags
	function stripHTML(html) {
		var tmp = document.createElement("div");
		tmp.innerHTML = html;
		return tmp.textContent;
	}



});