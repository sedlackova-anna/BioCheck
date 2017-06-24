/*
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    document.getElementById("author").innerHTML = request.author;
    document.getElementById("description").innerHTML = request.deets;
    
    sendResponse("succ ess");

  }
);
*/

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, "gimmie", function(response) {
    document.getElementById("author").innerHTML = response.author;
  	document.getElementById("description").innerHTML = response.deets;
  });
});