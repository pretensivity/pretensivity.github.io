g(".audio-control__volume-container .slider-container").onmousedown = function(e) {
    volumeFun(e, "down")
};
g(".audio-control__volume-container .slider-container").onmousemove = function(e) {
    volumeFun(e, "move")
};
g(".audio-control__volume-container .slider-container").onmouseup = function(e) {
    volumeFun(e, "up")
};
var mousedownonaudio = false;

function setVolume(e, value) {
    if (e == null && !isNaN(value)) {
        var percentagescrolled = (value * 100);
        var percentagescrolledinverted = 100 - percentagescrolled;
        gA(".now-fill")[0].style.cssText = "stroke-dashoffset: " + percentagescrolledinverted;
        g(".slider-handle-container.from-bottom").style.height = percentagescrolled + "%";
        video.volume = value;
    } else {
        var posX = e.clientX - 21;
        var posY = e.clientY - g(".audio-control__volume-container .slider-container").getBoundingClientRect().y;
        var percentagescrolledinverted = ((posY / (g(".audio-control__volume-container .slider-container").clientHeight - 2)) * 100);
        var percentagescrolled = 100 - percentagescrolledinverted;
        if (percentagescrolled < 0 || percentagescrolled == 0) {
            percentagescrolled = 0;
        } else if (percentagescrolled > 100) {
            percentagescrolled = 100;
        }
        gA(".now-fill")[0].style.cssText = "stroke-dashoffset: " + percentagescrolledinverted;
        g(".slider-handle-container.from-bottom").style.height = percentagescrolled + "%";
        video.volume = percentagescrolled * 0.01;
    }
}
g(".progress-bar").onmousemove = function(e) {
    if (mousedownonprogress) {
        lolsetCurrTime(e);
    }
    var posX = e.clientX - 21;
    var posY = e.clientY;
    g(".progress-bar-preview").style.opacity = 1;
    g(".slider-tick-hover").style.opacity = 1;
    g(".progress-bar-preview").style.left = (posX - 32) + "px";
    g(".slider-tick-hover").style.left = posX + "px";
    var percentagescrolled = ((posX / (g(".progress-bar").clientWidth - 2)) * 100);
    if (percentagescrolled < 0) {
        percentagescrolled = 0;
    } else if (percentagescrolled > 100) {
        percentagescrolled = 100;
    }
    var scrolledtimeseconds = video.duration * (percentagescrolled / 100);
    var scrolledtimemins = Math.floor(scrolledtimeseconds / 60) + ":" + n(Math.floor(scrolledtimeseconds - (Math.floor(scrolledtimeseconds / 60) * 60)));
    if (!scrolledtimemins.includes("NaN")) {
        g(".preview-time").innerHTML = scrolledtimemins;
    }
}

function lolsetCurrTime(e) {
    var posX = e.clientX - 21;
    var posY = e.clientY;
    var percentagescrolled = ((posX / (g(".progress-bar").clientWidth - 2)) * 100);
    if (percentagescrolled < 0) {
        percentagescrolled = 0;
    } else if (percentagescrolled > 100) {
        percentagescrolled = 100;
    };
    var scrolledtimeseconds = video.duration * (percentagescrolled / 100);
    video.currentTime = scrolledtimeseconds;
}
g(".progress-bar").onmousedown = function(e) {
    mousedownonprogress = true;
    lolsetCurrTime(e);
};
g(".progress-bar").onmouseup = function(e) {
    mousedownonprogress = false;
    lolsetCurrTime(e);
};
g(".progress-bar").onmouseout = function() {
    g(".progress-bar-preview").style.opacity = 0;
    g(".slider-tick-hover").style.opacity = 0;
    mousedownonprogress = false;
};
var rewind10=function(){video.currentTime = (Math.max(0, video.currentTime - 10))};
var forwards10 = function(){video.currentTime = (video.currentTime + 10)};
document.body.addEventListener('keydown', function(e) {
    // console.log(e.keyCode)
    switch (e.keyCode) {
        case 13:
        case 32:
        case 65:
        case 37:
        case 68:
        case 39:
        case 70:
        case 77:
            showControls();
            break;
    }
    switch (e.keyCode) {
        case 13:
        case 32:
            playPause();
            break;
        case 65:
        case 37:
            rewind10();
            break;
        case 68:
        case 39:
            forwards10();
            break;
        case 70:
            toggleFullScreen();
            break;
        case 77:
            if (video.muted == true) {
                unmute();
            } else {
                mute();
            }
    }
});
