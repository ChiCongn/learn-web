$(document).ready(function(){
	$("img.tree-toggle").click(function(){
		if (this.nextSibling.nextSibling.nextSibling.nextSibling.style.display == "") {
			this.nextSibling.nextSibling.nextSibling.nextSibling.style.display = "none";
			this.src = "./plus.gif";
		} else {
			this.nextSibling.nextSibling.nextSibling.nextSibling.style.display = "";
			this.src = "./minus.gif";
		}
	});
});
		