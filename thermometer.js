/*

 * * * Foofurple's HTML5 Simple Fundraising Thermometer * * *

This website / Internet application, comprising the files:

 - index.html
 - thermometer.js
 - style.css

is dedicated to the Public Domain and may be used freely by anyone
for any purpose.

*/



// Canvas dimensions
var canvasWidth = 400;
var canvasHeight = 450;

// Bulb dimensions
var bulbX = 100;    // x-coordinate of the bulb center
var bulbY = 400;    // y-coordinate of the bulb center
var bulbR = 35;     // bulb radius

// Dimensions of the rectangular shaft of the thermometer
var rectX1 = 85;
var rectY1 = 70;
var rectWidth = 30;     // Even number
var rectHeight = 300;
var rectY2 = rectY1 + rectHeight;

// Dimensions of the rounded top of the thermometer shaft
var topCircleX = bulbX;
var topCircleY = rectY1;
var topCircleR = rectWidth/2;

// Tick marks along thermometer shaft
var tickX1 = rectX1+10;
var tickX2 = rectX1+30;
var smallTickX1 = rectX1+20;
var smallTickX2 = rectX1+30;

function getY(fraction) {
    var deltaY = fraction * rectHeight;
    var Y = parseInt(rectY2 - deltaY);
    return Y;
}
function getTarget() {
    return parseFloat(document.getElementById("targetAmount").value);
}
function getAmount() {
    return parseFloat(document.getElementById("amountSoFar").value);
}
function targetLabelReset() {
    var label = "Target: " + document.getElementById('currency').value + document.getElementById("targetAmount").value;
    document.getElementById("targetAmountLabel").value = label;
}
function amountLabelReset() {
    var label = "" + document.getElementById('currency').value + document.getElementById("amountSoFar").value;
    document.getElementById("amountSoFarLabel").value = label;
}

function resetLabels() {
    targetLabelReset();
    amountLabelReset();
}

function addListeners() {

    var obj1 = document.getElementById('targetAmount');
    obj1.addEventListener('change', function() {
        targetLabelReset();
        draw();
    }, false);

    var obj2 = document.getElementById('amountSoFar');
    obj2.addEventListener('change', function() {
        amountLabelReset();
        draw();
    }, false);

    var obj3 = document.getElementById('currency');
    obj3.addEventListener('change', function() {
        resetLabels();
        draw();
    }, false);

    var jscolor = document.getElementById('jscolor');
    jscolor.addEventListener('change', function() {
        draw();
    }, false);

    var obj4 = document.getElementById('targetAmountLabel');
    obj4.addEventListener('change', function() {
        draw();
    }, false);

    var obj5 = document.getElementById('amountSoFarLabel');
    obj5.addEventListener('change', function() {
        draw();
    }, false);
}

function init() {

    // Set canvas dimensions
    var c=document.getElementById("thermometerImage");
    c.setAttribute("width",canvasWidth);
    c.setAttribute("height",canvasHeight);

    // Set final image dimensions
    var i=document.getElementById("finalImage");
    i.setAttribute("width",canvasWidth);
    i.setAttribute("height",canvasHeight);

    notGreyedOut();
    amountLabelReset();
    targetLabelReset();
    draw();
    addListeners();
}

// Hide the canvas, convert the canvas image to a
//dataurl, and create an image with that dataurl
function saveImage() {

    if (document.getElementById("saveImage").innerHTML == "Continue editing") {
        continueEditing();
    }
    else {
        greyedOut();
        var c=document.getElementById("thermometerImage");
        var dataURL = c.toDataURL();
        document.getElementById("saveImage").innerHTML = "Continue editing";
        document.getElementById("thermometerImage").style.display = "none";
        document.getElementById("finalImage").src = dataURL;
        document.getElementById("finalImage").style.display = "block";
        document.getElementById("readyToDownload").style.visibility = "visible";
    }
}

function greyedOut() {
    document.getElementById("targetAmount").setAttribute("disabled","disabled");
    document.getElementById("amountSoFar").setAttribute("disabled","disabled");
    document.getElementById("jscolor").setAttribute("disabled","disabled");
    document.getElementById("currency").setAttribute("disabled","disabled");
    document.getElementById("targetAmountLabel").setAttribute("disabled","disabled");
    document.getElementById("amountSoFarLabel").setAttribute("disabled","disabled");

    var allLabels = document.getElementsByTagName("label");
    for (var i=0; i<allLabels.length; i++) {
        allLabels[i].style.color = "#eee";
    }
}

function notGreyedOut() {
    document.getElementById("targetAmount").removeAttribute("disabled");
    document.getElementById("amountSoFar").removeAttribute("disabled");
    document.getElementById("jscolor").removeAttribute("disabled");
    document.getElementById("currency").removeAttribute("disabled");
    document.getElementById("targetAmountLabel").removeAttribute("disabled");
    document.getElementById("amountSoFarLabel").removeAttribute("disabled");

    var allLabels = document.getElementsByTagName("label");
    for (var i=0; i<allLabels.length; i++) {
        allLabels[i].style.color = "#000";
    }
}

function continueEditing() {
    document.getElementById("readyToDownload").style.visibility = "hidden";
    document.getElementById("finalImage").style.display = "none";
    document.getElementById("saveImage").innerHTML = "SAVE IMAGE";
    document.getElementById("thermometerImage").style.display = "block";
    draw();
    notGreyedOut();
}



// Draw canvas
function draw() {

    // Get canvas object and canvas context
    var c=document.getElementById("thermometerImage");
    var ctx=c.getContext("2d");

    // Clear existing image
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    ctx.textAlign = 'left';

    // Get colour
    var color = "#" + document.getElementById("jscolor").value;

    // Thermometer bulb
    ctx.beginPath();
    ctx.arc(bulbX, bulbY, bulbR, 0, 2*Math.PI, false);
    ctx.fillStyle= color;
    ctx.fill();
    ctx.strokeStyle='#000';
    ctx.lineWidth=4;
    ctx.stroke();

    // Thermometer shaft (white background)
    ctx.beginPath();
    ctx.rect(rectX1, rectY1, rectWidth, rectHeight);
    ctx.fillStyle= '#fff';
    ctx.fill();

    // Curved bit at top of thermometer shaft
    ctx.beginPath();
    ctx.arc(topCircleX, topCircleY, topCircleR, Math.PI, 2.0 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    // Thermometer outline - left
    ctx.moveTo(rectX1,rectY1);
    ctx.lineTo(rectX1,rectY1+rectHeight);
    ctx.stroke();

    // Thermometer outline - right
    ctx.moveTo(rectX1+rectWidth,rectY1);
    ctx.lineTo(rectX1+rectWidth,rectY1+rectHeight);
    ctx.stroke();

    // The coloured bar indicating the 'temperature'
    var amountSoFar = getAmount();
    var targetAmount = getTarget();
    var fractionOfTotal = amountSoFar / targetAmount;
    var y = getY(fractionOfTotal);
    var colorRectHeight = parseInt(fractionOfTotal * rectHeight);
    ctx.beginPath();

    // Stroke is 4px, 2px of which covers up what's underneath,
    // And rect is a little longer than it needs to be, going into bulb
    ctx.rect(rectX1+2, y, rectWidth-4, colorRectHeight+5);
    ctx.fillStyle = color;
    ctx.fill();

    // Tick markers
    ctx.beginPath();    
    ctx.moveTo(tickX1,rectY1);
    ctx.lineTo(tickX2,rectY1);
    ctx.stroke();

    var tick8Y = getY(0.8);
    ctx.moveTo(tickX1,tick8Y);
    ctx.lineTo(tickX2,tick8Y);
    ctx.stroke();

    var tick6Y = getY(0.6);
    ctx.moveTo(tickX1,tick6Y);
    ctx.lineTo(tickX2,tick6Y);
    ctx.stroke();

    var tick4Y = getY(0.4);
    ctx.moveTo(tickX1,tick4Y);
    ctx.lineTo(tickX2,tick4Y);
    ctx.stroke();

    var tick2Y = getY(0.2);
    ctx.moveTo(tickX1,tick2Y);
    ctx.lineTo(tickX2,tick2Y);
    ctx.stroke();

    // Small ticks
    var smallTick9Y = getY(0.9);
    ctx.moveTo(smallTickX1,smallTick9Y);
    ctx.lineTo(smallTickX2,smallTick9Y);
    ctx.lineWidth=2;
    ctx.stroke();

    var smallTick7Y = getY(0.7);
    ctx.moveTo(smallTickX1,smallTick7Y);
    ctx.lineTo(smallTickX2,smallTick7Y);
    ctx.stroke();

    var smallTick5Y = getY(0.5);
    ctx.moveTo(smallTickX1,smallTick5Y);
    ctx.lineTo(smallTickX2,smallTick5Y);
    ctx.stroke();

    var smallTick3Y = getY(0.3);
    ctx.moveTo(smallTickX1,smallTick3Y);
    ctx.lineTo(smallTickX2,smallTick3Y);
    ctx.stroke();

    var smallTick1Y = getY(0.1);
    ctx.moveTo(smallTickX1,smallTick1Y);
    ctx.lineTo(smallTickX2,smallTick1Y);
    ctx.stroke();

    // Write out the 'temperature'
    ctx.font = "18px Arial";
    ctx.fillStyle="#000";
    var label = document.getElementById("amountSoFarLabel").value;
    ctx.fillText(label, 130, y); 

    // Write out the target amount
    var label2 = document.getElementById("targetAmountLabel").value;
    ctx.textAlign = 'center';
    ctx.fillText(label2, bulbX, 30);
}

