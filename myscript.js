function httpGet(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function capitalize(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function findAuthor(){
    var nodes = document.querySelectorAll("span.byline-author, .byline-column-link");
    var author = "NONE";
    console.log(nodes.length + " nodes");
    for (var n = nodes.length-1; n >= 0; n--) {
        if(nodes[n].textContent != "" && nodes[n].textContent.length < 500){
          author = nodes[n].textContent;
          console.log(author);
        }
    }
  return author;
}

var author = capitalize(findAuthor());
author = author.trim().replace(" ","%20").replace(" ","%20");
var result = "Loading";

httpGet("https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&user-agent=vincentextensionchromelol&exintro=&explaintext=&titles="+author,function(text){
	text = JSON.parse(text);
	var lol = text.query.pages;
	for (var key in lol) {

  		result = lol[key].extract;

  		author = author.replace("%20", " ").replace("%20", " ");

      if(result == undefined || result == ""){
        result = "No Wikipedia article for "+author;
      }
      console.log(result);
  		console.log(author);
	}
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
      sendResponse({author: author, deets:result});
});
