document.getElementById("loadBtn").onclick = function () {
    console.log("load abc.htm");
    this.disabled = true;

    let xmlhttp = getXmlHttpObject();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            document.getElementById("replace").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "abc.htm", true);
    xmlhttp.send(null);
};


function getXmlHttpObject() {
    let xmlhttp = null; // XHR object
    try {
        xmlhttp = new XMLHttpRequest(); 
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); 
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                console.log("Trình duyệt không hỗ trợ AJAX!");
            }
        }
    }
    return xmlhttp;
}