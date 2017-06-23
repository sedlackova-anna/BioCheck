console.log("testing 123");

function htmlreplace(a, b, element) {    
    if (!element) element = document.body;    
    var nodes = element.childNodes;
    for (var n=0; n<nodes.length; n++) {
        if (nodes[n].nodeType == Node.TEXT_NODE) {
            var r = new RegExp(a, 'gi');
            nodes[n].textContent = nodes[n].textContent.replace(r, b);
        } else {
            htmlreplace(a, b, nodes[n]);
        }
    }
}

//htmlreplace('the ', 'le ');

function search(word, element) {
	if (!element) element = document.body;
    var nodes = element.getElementsByTagName("*");
    console.log(nodes.length);
    for (var n=nodes.length-1; n >= 0; n--) {
        console.log(nodes[n].textContent);
        if(nodes[n].textContent.indexOf(word) >= 0){
        	//nodes[n].textContent = "HAHAHA";    // replace any element containing text with /word/ in it with "hahaha"
        }

    }
}

search("a");