
function createSlides() {
	var editorContent = editor.getValue();
	var newSlide = document.createElement("SECTION");
	var t = document.createTextNode(editorContent);
	newSlide.appendChild(t);
	$('.slides').append(newSlide);
}