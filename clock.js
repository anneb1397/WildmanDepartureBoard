// JavaScript source code
var c = document.getElementById('clock');
var $ = c.getContext('2d');
var ang = 0;
var secondsColor = 'hsla(180, 85%, 5%, .7)';
var minutesColor = 'hsla(180, 95%, 15%, 1)';
var hoursColor = 'hsla(180, 75%, 25%, 1)';
var currentHr;
var currentMin;
var currentSec;
var currentMillisec;
var t = setInterval('updateTime()', 50);

c.height = c.width;
var w = c.width;
var h = c.height;
var half_h = h / 2;
var half_w = w / 2;
var ten = 0.1 * w;

var d = document.getElementById('date');
setInterval(setDate, 20000000);
setDate();

function setDate() {
    var currentDate = new Date();
    var m = currentDate.getMonth();
    var day = currentDate.getDay();
    var n = currentDate.getDate();
    var year = currentDate.getFullYear();

    d.innerHTML = swapDay(day) + ", " + swapMonth(m) + " " + n + ", " + year;
}

function swapDay(dy) {
    var m = " ";
    switch (dy) {
        case 0:
            m = "Sunday";
            break;
        case 1:
            m = "Monday";
            break;
        case 2:
            m = "Tuesday";
            break;
        case 3:
            m = "Wednesday";
            break;
        case 4:
            m = "Thursday";
            break;
        case 5:
            m = "Friday";
            break;
        case 6:
            m = "Saturday";
            break;
    }

    return m;
}
function swapMonth(n) {
    var m = " ";
    switch (n) {
        case 0:
            m = "January";
            break;
        case 1:
            m = "February";
            break;
        case 2:
            m = "March";
            break;
        case 3:
            m = "April";
            break;
        case 4:
            m = "May";
            break;
        case 5:
            m = "June";
            break;
        case 6:
            m = "July";
            break;
        case 7:
            m = "August";
            break;
        case 8:
            m = "September";
            break;
        case 9:
            m = "October";
            break;
        case 10:
            m = "November";
            break;
        case 11:
            m = "December";
            break;
    }
    return m;
}

function updateTime() {
    var currentDate = new Date();
    var g = $.createRadialGradient(half_w, half_h, .001 * w, half_w, half_h, half_w);
    g.addColorStop(0, 'hsla(180, 55%, 8%, 1)');
    g.addColorStop(1, 'hsla(180, 95%, 15%, 1)');
    $.fillStyle = g;
    $.fillRect(0, 0, w, h);
    currentSec = currentDate.getSeconds();
    currentMillisec = currentDate.getMilliseconds();
    currentMin = currentDate.getMinutes();
    currentHr = currentDate.getHours();
    if (currentHr == 00) {  //if midnight (00 hours) hour = 12
        currentHr = 12;
    }
    else if (currentHr >= 13) {  //convert military hours at and over 1300 (1pm) to regular hours by subtracting 12. 
        currentHr -= 12;
    }
    drawSeconds();
    drawMinutes();
    drawHours();
    var realTime = currentHr + ':' + numPad0(currentMin) + ':' + numPad0(currentSec);

    /*Here is the selected option of creating the text within the pie canvas elemenet */

    //var textPosX = 250 - ($.measureText(realTime).width / 2);
    var textPosX = half_w - ($.measureText(realTime).width / 2);

    $.shadowColor = 'hsla(180, 100%, 5%, 1)';
    $.shadowBlur = 100;
    $.shadowOffsetX = 12;
    $.shadowOffsetY = 0;
    $.fillStyle = 'hsla(255,255%,255%,.7)';
    $.font = "bold 1.6em 'Noto Serif', serif";
    $.fillText(realTime, textPosX, half_h + ten);
    //$.fillText(realTime, textPosX, c.height / 2 + 50);

    /* OR using a div to display the time (#time) where I pre-styled text with a long shadow using css...can't decide which I like better - but since this is a canvas demo....; (comment out the above text settings and uncomment the below) 
    
      document.getElementById('time').innerHTML = realTime;
    */
}

function drawSeconds() {
    ang = 0.006 * ((currentSec * 1000) + currentMillisec);
    $.fillStyle = secondsColor;
    $.beginPath();
    /*$.moveTo(250, 250);
    $.lineTo(250, 50);
    $.arc(250, 250, 200, calcDeg(0), calcDeg(ang), false);
    $.lineTo(250, 250);
    */
    $.moveTo(half_w, half_h);
    $.lineTo(half_w, ten);
    $.arc(half_w, half_h, half_w-ten, calcDeg(0), calcDeg(ang), false);
    $.lineTo(half_w, half_h);
    $.shadowColor = 'hsla(180, 45%, 5%, .4)';
    $.shadowBlur = 15;
    $.shadowOffsetX = 15;
    $.shadowOffsetY = 15;
    $.fill();
}

function drawMinutes() {
    ang = 0.0001 * ((currentMin * 60 * 1000) + (currentSec * 1000) + currentMillisec);
    $.fillStyle = minutesColor;
    $.beginPath();
    /*$.moveTo(250, 250);
    $.lineTo(250, 100);
    $.arc(250, 250, 150, calcDeg(0), calcDeg(ang), false);
    $.lineTo(250, 250);*/
    $.moveTo(half_w, half_h);
    $.lineTo(half_w, ten*2);
    $.arc(half_w, half_h, half_w - ten*2, calcDeg(0), calcDeg(ang), false);
    $.lineTo(half_w, half_h);
    $.shadowColor = 'hsla(180, 25%, 5%, .4)';
    $.shadowBlur = 15;
    $.shadowOffsetX = 15;
    $.shadowOffsetY = 15;
    $.fill();
}

function drawHours() {
    ang = 0.000008333 * ((currentHr * 60 * 60 * 1000) + (currentMin * 60 * 1000) + (currentSec * 1000) + currentMillisec);
    if (ang > 360) {
        ang -= 360;
    }
    $.fillStyle = hoursColor;
    $.beginPath();
    /*$.moveTo(250, 250);
    $.lineTo(250, 150);
    $.arc(250, 250, 100, calcDeg(0), calcDeg(ang), false);
    $.lineTo(250, 250);*/
    $.moveTo(half_w, half_h);
    $.lineTo(half_w, ten * 3);
    $.arc(half_w, half_h, half_w - ten * 3, calcDeg(0), calcDeg(ang), false);
    $.lineTo(half_w, half_h);
    $.shadowColor = 'hsla(180, 45%, 5%, .4)';
    $.shadowBlur = 15;
    $.shadowOffsetX = 15;
    $.shadowOffsetY = 15;
    $.fill();
}


function calcDeg(deg) {
    return (Math.PI / 180) * (deg - 90);
}
//handle zeros for minutes and seconds
function numPad0(str) {
    var cStr = str.toString();
    if (cStr.length < 2) {
        str = 0 + cStr;
    }
    return str;
}