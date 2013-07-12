chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      if (request.message == "getLocalStorage") {
          var value = localStorage[request.key];
          var status = "Got local storage";
          if (value == undefined) {
              localStorage[request.key] = 'Off';
              value = 'Off';
          }
          sendResponse({ value: value, status: status });
      }
      else if (request.message == "setLocalStorage") {
          localStorage[request.key] = request.value;
          sendResponse({ status: requesat.key + "[" + request.value + "] saved successfully" });
      }
  });
document.addEventListener('DOMContentLoaded', restore_options);
$('#switch').change(function () {
    var off = $('#switch')[0][0];
    var on = $('#switch')[0][1];
    var toggle = $('#switch')[0][2];
    var message;
    if (off.selected) {
        message = 'turnOff';
    }
    else if(on.selected) {
        message = 'turnOn';
    }
    else if( toggle.selected) {
        message = 'toggle';
    }
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendMessage(tab.id, { message: message }, function (response) {
            save_options();
        });
    });
});
