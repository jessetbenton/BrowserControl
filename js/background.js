var state = localStorage['state'];
var path = "images/iconOn.png";
if(state !== undefined) {
   path = "images/icon" + state + ".png";
   localStorage['state'] = 'On';
}
chrome.browserAction.setIcon({path:path});

chrome.runtime.onMessage.addListener(
   function (request, sender, sendResponse) {
      if (request.message === "getLocalStorage") {
          var value = localStorage[request.key];
          var status = "Got local storage";
          if (value === undefined) {
              localStorage[request.key] = 'On';
              value = 'On';
          }
          // console.log("sending response " + value);
          sendResponse({ value: value, status: status });
      }
   }
);

function updateIcon(tab) {
   state = localStorage['state'];
   if(state === "On") {
      state = 'Off';
   }
   else {
      state = 'On';
   }
   localStorage['state'] = state;
   var path = "images/icon" + state + ".png";

   chrome.browserAction.setIcon({path:"images/icon" + state + ".png"});
   chrome.tabs.executeScript(null, {file: "js/browser_control.js"});
}
chrome.browserAction.onClicked.addListener(updateIcon);