function iFrameToggle(event) {
    chrome.runtime.sendMessage({ message: "setLocalStorage", key: "iFrame", value: event.target.value }, function (response) {
//        console.log(response.status);
    });
}
function save_options() {
    var select = document.getElementById("switch");
    var value = select.children[select.selectedIndex].value;

    chrome.runtime.sendMessage({ message: "setLocalStorage", key: "mode", value: value }, function (response) {
        //console.log(response.status);
    });

    // Update status to let user know options were saved.
    var status = $('body');
    status.css({backgroundColor: 'red'});
    setTimeout(function () {
        status.css({ backgroundColor: 'white' });
        window.close();
    }, 750);
}
// Restores select box state to saved value from localStorage.
function restore_options() {
    var status;
    chrome.runtime.sendMessage({ message: "getLocalStorage", key: "mode" }, function (response) {
        status = response.value;
        var select = document.getElementById("switch");
        if (!status) {
            return;
        }

        for (var i = 0; i < select.children.length; i++) {
            var child = select.children[i];
            if (child.value == status) {
                child.selected = "true";
                break;
            }
        }
    });
}
