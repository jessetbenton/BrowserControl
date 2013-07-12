var currentNode = null;
var ctrlDown = false;
$(document).ready(function () {
    var status;
    
    //runs on page load
    chrome.runtime.sendMessage({ message: "getLocalStorage", key: "mode" }, function (response) {
        status = response.value;
        switch(status) {
            case 'On':
                on();
                break;
            case 'Off':
                off();
                break;
            case 'Toggle':
                toggle();
                break;
            default:
                break;
        }
    });

    //runs on state change
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            switch (request.message) {
                case 'turnOn':
                    on();
                    break;
                case 'turnOff':
                    off();
                    break;
                case 'toggle':
                    toggle();
                    break;
                default:
                    break;
            }
            sendResponse();
        }
    );
});

function hover(state){
    var style = document.createElement('style');
    style.type = "text/css";
    
    if (state) {
        style.innerHTML = ".nodeHover:hover { outline: solid 2px #ff0000 };";
    }
    else {
        style.innerHTML = ".nodeHover:hover {outline: solid 0px };";
    }
    document.body.appendChild(style);
}
function mouseMove(event) {
    if(ctrlDown && $(event.target) != currentNode) {
        if (currentNode != null) {
            currentNode.removeClass("nodeHover");
        }
        currentNode = $(event.target);
        currentNode.addClass("nodeHover");
    }
}
function onContextMenu(event) {
    if(ctrlDown) {
        event.preventDefault();
        $(event.target).remove();
    }
}
function keyDown(event) {
    //ctrl key pressed
    if( event.which == 17 ) {
        ctrlDown = true;
    }
}
function keyUp(event) {
    //ctrl key released
    if( event.which == 17) {
        ctrlDown = false;
        currentNode.removeClass("nodeHover");
    }
}
function on() {
    ctrlDown = true;
    $(document).off('keydown keyup');
    $(document).on({
        contextmenu: onContextMenu
    });

    $(document).on({
        mousemove: mouseMove
    }, "*");
    hover(true);
    
    //remove iFrames
    $("iframe").each(function () {
        $(this).remove();
    });
}
function off() {
    ctrlDown = false;
    $(document).off('mousemove contextmenu keydown keyup');
    hover(false);
}
function toggle() {
    ctrlDown = false;
    $(document).on({
        keydown: keyDown,
        keyup: keyUp,
        contextmenu: onContextMenu 
    });
    
    $(document).on({
        mousemove: mouseMove
    }, "*");
    hover(true);
}