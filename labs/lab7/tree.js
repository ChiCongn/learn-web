function toggleFolder(node) {
    if (!node) return;

    if (node.nextSibling.nextSibling.nextSibling.nextSibling.style.display === "") {
        console.log("node: ", node);
        console.log("node.child: ", node.child);
        console.log("node.nextSibling: ", node.nextSibling); // text node \n
        console.log("node.nextSibling.nextSibling: ", node.nextSibling.nextSibling);
        console.log("node.nextSibling.nextSibling.nextSibling: ", node.nextSibling.nextSibling.nextSibling); // text node \n
        node.src = "plus.gif";
        node.nextSibling.nextSibling.nextSibling.nextSibling.style.display = "none";
    } else {
        node.src = "minus.gif";
        node.nextSibling.nextSibling.nextSibling.nextSibling.style.display = "";
    }
}