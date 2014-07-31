var ctrlDown = false;
function disableHover() {
    ctrlDown = false;
    removeClass();
    var elements = document.getElementsByClassName('browserControl-iframe');
    while(elements.length > 0) {
        document.getElementsByClassName('browserControl-iframe')[0].remove();
        elements = document.getElementsByClassName('browserControl-iframe');
    }
}
function init() {
    var status;
    //runs on page load
    chrome.runtime.sendMessage({ message: "getLocalStorage", key: "state" }, function (response) {
        status = response.value;
        switch(status) {
            case 'On':
                on();
                break;
            case 'Off':
                off();
                break;
            default:
                break;
        }
    }); 

    //Add css
    if(document.getElementById('browserControlCss') === null) {
        var css = document.createElement('style');
        css.type = "text/css";
        css.id = "browserControlCss";
        css.innerHTML = ".browserControl {outline: solid 2px #ff0000;} .browserControl-iframe {background: rgba(255,0,0,0.6); z-index: 1000; position: absolute;}";
        document.body.appendChild(css);     
    }
}
document.onreadystatechange = function() {
    if(document.readyState === "complete") {
        init();
    }
}     
function removeClass() {
    var elements = document.getElementsByClassName('browserControl');
    for(var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('browserControl');
    }
}
function hasiFrameDiv(node) {
    if(node !== undefined) {
        for(c in node.children) {
            if(node.children[c].className === 'browserControl-iframe') {
                return true;
            }
        }
    }
    return false;
}
function deleteiFrame(node) {
    if(node !== undefined) {
        for(c in node.children) {
            if(node.children[c].localName === 'iframe') {
                return node.children[c].remove();
            }
        }
    }
    return false;
}
function mouseMove(event) {
    removeClass();
    if(ctrlDown && event.target.className !== undefined && event.target.className.indexOf('browserControl') === -1 ) {
        event.target.classList.add("browserControl");
    }
}
function onContextMenu(event) {
    if(ctrlDown) {
        event.preventDefault();
        if(event.target.className === 'browserControl-iframe') {
            var eventParent = event.target.parentNode;
            deleteiFrame(eventParent);
        }
        event.target.remove();
    }
}
function keyDown(event) {
    //ctrl key pressed
    if(!ctrlDown && event.which === 17) {
        ctrlDown = true;
        var iframes = document.getElementsByTagName('iframe');
        for(i in iframes) {
            var iframe = iframes[i];
            var parent = iframe.parentNode;
            if(parent !== undefined && !hasiFrameDiv(parent) && iframe.clientWidth > 0) {
                var child = document.createElement('div');
                child.className = 'browserControl-iframe';
                child.style.width = iframe.offsetWidth + "px";
                child.style.height = iframe.offsetHeight + "px";
                child.style.top = iframe.offsetTop + "px";
                child.style.left = iframe.offsetLeft + "px";
                parent.insertBefore(child, parent.children[0]);
            }
        }
    }
}
function keyUp(event) {
    //ctrl key released
    if(event.which == 17) {
        ctrlDown = false;
        disableHover();
    }
}
function on() {
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    document.oncontextmenu = onContextMenu;
    document.onmousemove = mouseMove;

    //Make sure the hover is not still active when:
    //The window gains focus
    window.onfocus = disableHover;
    //The window loses focus
    window.onblur = disableHover;
}
function off() {
    document.onkeydown = null;
    document.onkeyup = null;
    document.oncontextmenu = null;
    document.onmousemove = null;
}
init();