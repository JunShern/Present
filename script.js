
function createSlides() {
	var editorContent = editor.getValue();
	var contentLines = editorContent.split("\n");
	for (var i=0; i<contentLines.length; i++) {
		var newSlide = document.createElement("SECTION");
		var t = document.createTextNode(contentLines[i]);
		newSlide.appendChild(t);
		$('.slides').append(newSlide);
	}
}