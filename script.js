
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
}