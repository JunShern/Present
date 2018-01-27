
function searchAndSetBackgroundImg(query, slideId) {
	$("#content").empty(); 
	var slideElement = document.getElementById(slideId);

	// // Test that background setting works
	var imageURL = "https://www.elegantthemes.com/blog/wp-content/uploads/2017/07/404-error.png";// response.items[0].link;
	slideElement.setAttribute("data-background-image", imageURL);
	Reveal.sync(); // Need to sync after changing background properties

	// Search query, asynchronous callback will update image when response is received	
	$.get("https://www.googleapis.com/customsearchAndSetBackgroundImg/v1?cx=006285665057136291577%3A8i6a7ag49hs&filter=0&searchAndSetBackgroundImgType=image&\
	key=AIzaSyDJG_126BKdh0TquHZ1MmRr6spD5_JPubc&q="+query, function(response) {
		// Update
		var responseFirstImgURL = response.items[0].link;
		slideElement.setAttribute("data-background-image", responseFirstImgURL);
		// Also show search results in 'content' div for troubleshooting
		document.getElementById("content").innerHTML += "<p>" + query + "</p>";
		document.getElementById("content").innerHTML += "<img src='" + response.items[0].link + "' height=60px>";
		Reveal.sync(); // Need to sync after changing background properties
	});
}

function createSlides() {
	var editorContent = editor.getValue();
	var contentLines = editorContent.split("\n");

	$('#slides').empty(); // Delete all slides to start afresh
	// Create new slides with text
	for (var i=0; i<contentLines.length; i++) {
		var slideId = 'slide' + i;
		// Create slide
		var newSlide = document.createElement("section");
		var t = document.createTextNode(contentLines[i]);
		newSlide.appendChild(t);
		newSlide.setAttribute("data-background-color", "#fff");
		newSlide.setAttribute('id', slideId);
		$('#slides').append(newSlide);
	}

	// Add pictures; can only do this after slides already exist
	for (var i=0; i<contentLines.length; i++) {
		var slideId = 'slide' + i;
		// Find interesting topics
		console.log("Checking string '" + contentLines[i] + "' for topics: ");
		var topics = nlpGetTopics(contentLines[i]);
		// Assign background image of each slide to be the first interesting topic of the text
		if (topics.length) {
			console.log(topics[0]);
			searchAndSetBackgroundImg(topics[0], slideId);
		} else {
			console.log("No interesting topics found.");
		}
	}
	Reveal.slide(0,0,0); // Return to first slide
}

function nlpGetTopics(strInput) {
	// Given a string, return a list of interesting topics in the string
	var output = nlp(strInput).topics();
	var topicList = output.data().map(function(a) {return a.text;}); 
	return(topicList);
}
