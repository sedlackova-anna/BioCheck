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
    
    if(author == "NONE"){
      console.log("look again for author");
      nodes = document.querySelectorAll("a.byline-column-link");
      for (var n = nodes.length-1; n >= 0; n--) {
        if(nodes[n].textContent != "" && nodes[n].textContent.length < 500){
          author = nodes[n].textContent;
        }
      }
    }
  return author;
}

/*
function findAuthor(){
	var element = document.body;
    var nodes = element.getElementsByTagName("*");
    var author = "";
    for (var n=nodes.length-1; n >= 0; n--) {
        if(nodes[n].textContent.indexOf("@") != -1 && nodes[n].textContent.length < 500){
        	author = nodes[n].textContent.substring( 0, nodes[n].textContent.indexOf("@")-1);
        }
    }
    return author;
}
*/
var author = capitalize(findAuthor());

author = author.trim().replace(" ","%20").replace(" ","%20");

var result = "Loading";

httpGet("https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&user-agent=vincentextensionchromelol&exintro=&explaintext=&titles="+author,function(text){
	text = JSON.parse(text);
	var lol = text.query.pages;
	for (var key in lol) {

  		result = lol[key].extract;

  		console.log(result);

  		author = author.replace("%20", " ").replace("%20", " ");

      if(result == undefined){
        result = "No Wikipedia article for "+author;
      }

  		console.log(author);

  		document.body.innerHTML += result;

  		/*
		chrome.runtime.sendMessage({deets: result, author: author}, function(response){
			console.log("response recieved: "+response);
		});*/
	}
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
      sendResponse({author: author, deets:result});
});
