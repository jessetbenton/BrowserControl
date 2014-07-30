var state = localStorage['state'];
chrome.browserAction.setIcon({path:"images/icon" + state + ".png"});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      if (request.message === "getLocalStorage") {
          var value = localStorage[request.key];
          var status = "Got local storage";
          if (value === undefined) {
              localStorage[request.key] = 'Off';
              value = 'Off';
          }
          console.log("sending response " + value);
          sendResponse({ value: value, status: status });
      }
  });


function updateIcon() {
   state = localStorage['state'];
   if(state == undefined || state === "On") {
      localStorage['state'] = 'Off';
   }
   else {
      localStorage['state'] = 'On';
   }
   console.log("updating icon " + state);

   chrome.browserAction.setIcon({path:"images/icon" + state + ".png"});

   //reload page
   //chrome.tabs.getSelected(null, function(tab) {
   // chrome.tabs.reload(tab.id);
   //});
}
chrome.browserAction.onClicked.addListener(updateIcon);
