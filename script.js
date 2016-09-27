
function search(query) {
	$("#content").empty(); 
	$.get("https://www.googleapis.com/customsearch/v1?cx=006285665057136291577%3A8i6a7ag49hs&filter=0&searchType=image&\
		key=AIzaSyDJG_126BKdh0TquHZ1MmRr6spD5_JPubc&q="+query, function(response) {
		for (var i = 0; i < response.items.length; i++) {
			var item = response.items[i];
			// in production code, item.htmlTitle should have the HTML entities escaped.
			document.getElementById("content").innerHTML += "<img src='" + item.link + "' height=80px>";
		}
	});
}

function createSlides() {
	var editorContent = editor.getValue();
	var contentLines = editorContent.split("\n");

	$('.slides').empty(); // Delete all slides to start afresh
	for (var i=0; i<contentLines.length; i++) {
		var newSlide = document.createElement("SECTION");
		var t = document.createTextNode(contentLines[i]);
		newSlide.appendChild(t); 
		newSlide.setAttribute("data-background-color", "#fff");
		$('.slides').append(newSlide);
	}
	Reveal.slide(0,0,0); // Return to first slide
	var topics = nlpAnalysis(editorContent);

	search(topics[0]);
}

function nlpAnalysis(strInput) {
	nlp = window.nlp_compromise;
	var output = nlp.text(strInput).topics();
	var topicList = output.map(function(a) {return a.text;}); 
	// var lines = strInput.split("\n");
	// for (var i=0; i<lines.length; i++) {
	// 	var line = lines[i];
	// 	getTopic(line);
	// }
	return(topicList);
}

function getTopic(strInput) {
	var tagPriority = {
		Noun:1, 
		Expression:2,
		Determiner:3,
		Copula:4,
		Preposition:5,
		Quotation:6,
		Infinitive:7,
		Conjunction:8,
		PresentTense:9
	};
	var tags = nlp.text(strInput).tags();
	console.log(tags);
	// var words = strInput.split(' ');
	// console.log('');
	// var highestPriority = 100;
	// var selectedTopic = '';
	// for (var j=0; j<tags.length; j++) {
	// 	console.log(tags[j]);
	// 	console.log(words[j]);
	// 	// if (tagPriority[tags[j]] < highestPriority) {
	// 	// 	selectedTopic = words[j]; 
	// 	// 	highestPriority = tagPriority[tags[j]]; // Update leader
	// 	// }
	// }
	// console.log(words);
	//return(selectedTopic);
}
