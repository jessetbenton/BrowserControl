$(document).ready(function () {
    console.log("options document ready");
    $("input[name='iFrame']").click(function (event) {
        iFrameToggle(event);
    });
});