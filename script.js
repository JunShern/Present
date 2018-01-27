
// When page loads
window.addEventListener("load", function(){

	function createSlides() {
		var editorContent = editor.getValue();
		var contentLines = editorContent.split("\n");
	
		$('#slides').empty(); // Delete all slides to start afresh
	
		for (var i=0; i<contentLines.length; i++) {
			if (/\S/.test(contentLines[i])) { // Ignore empty (all whitespace) lines
				console.log(i);
				// Create new slides with text
				var slideId = 'slide' + i;
				var newSlide = document.createElement("section");
				var t = document.createTextNode(contentLines[i]);
				newSlide.appendChild(t);
				newSlide.setAttribute("data-background-color", "#fff");
				newSlide.setAttribute('id', slideId);
				$('#slides').append(newSlide);
		
				// Add pictures
				console.log("Checking string '" + contentLines[i] + "' for topics: ");
				var topics = nlpGetTopics(contentLines[i]);
				if (topics.length) {
					console.log(topics[0]);
					searchAndSetBackgroundImg(topics[0], slideId);
				} else {
					console.log("No interesting topics found.");
				}
			}
		}
		Reveal.slide(0,0,0); // Return to first slide
	}
	
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
			Reveal.sync();
		});
	}
	
	function nlpGetTopics(strInput) {
		// Given a string, return a list of interesting topics in the string
		var output = nlp(strInput).topics();
		var topicList = output.data().map(function(a) {return a.text;}); 
		return(topicList);
	}


	// Init CodeMirror
	var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
		lineNumbers: true,
		styleActiveLine: true,
		matchBrackets: true,
		theme: "material",
		extraKeys: {  // Keyboard shortcuts
			"Ctrl-Enter": function(){createSlides()}
		}
	});	

	// Init Reveal.js 
	Reveal.initialize({
		// More info https://github.com/hakimel/reveal.js#configuration
		history: true,
		// More info https://github.com/hakimel/reveal.js#dependencies
		dependencies: [
			{ src: 'revealjs/plugin/markdown/marked.js' },
			{ src: 'revealjs/plugin/markdown/markdown.js' },
			{ src: 'revealjs/plugin/notes/notes.js', async: true },
			{ src: 'revealjs/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
		]
	});
	// Printing and PDF exports
	// var link = document.createElement( 'link' );
	// link.rel = 'stylesheet';
	// link.type = 'text/css';
	// link.href = window.location.search.match( /print-pdf/gi ) ? 'revealjs/css/print/pdf.css' : 'revealjs/css/print/paper.css';
	// document.getElementsByTagName( 'head' )[0].appendChild( link );	

	createSlides();
});
