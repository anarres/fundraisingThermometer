/*

 * * * Foofurple's HTML5 Simple Fundraising Thermometer * * *

This website / Internet application, comprising the files:

 - index.html
 - thermometer.js
 - style.css

is dedicated to the Public Domain and may be used by anyone
for any purpose.

*/


var canvasWidth = 300;
var canvasHeight = 400;

var bulbX = 100;
var bulbY = 350;
var bulbR = 35;
var bulbStartAngle =  0;                    
var bulbFinishAngle = 2.0 * Math.PI         

var rectX1 = 85;
var rectY1 = 20;
var rectWidth = 30;
var rectHeight = 300;
var rectY2 = rectY1 + rectHeight;

var topCircleX = 100;
var topCircleY = 20;
var topCircleR = 15;

// Takes a fraction like 0.6 and returns y coordinate
// for top of rect, fraction is a float
function getY(fraction) {
    var deltaY = fraction * rectHeight;
    var Y = parseInt(rectY2 - deltaY);
    return Y;
}

function save() {
    var dataUrl = document.getElementById("thermometerImage").toDataURL();
    document.getElementById('download').style.visibility = "visible";
    document.getElementById("downloadLink").setAttribute('href', dataUrl);
}

function draw() {

    // Get rid of any old dataUrl that might have been generated
    document.getElementById("downloadLink").removeAttribute('href');
    document.getElementById('download').style.visibility = "hidden";

    // Get canvas object and canvas context
    var c=document.getElementById("thermometerImage");
    var ctx=c.getContext("2d");

    // Clear existing image
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    // Thermometer bulb
    ctx.beginPath();
    ctx.arc(bulbX, bulbY, bulbR, bulbStartAngle, bulbFinishAngle, false);
    ctx.fillStyle= 'red';
    ctx.fill();
    ctx.strokeStyle='black';
    ctx.lineWidth=4;
    ctx.stroke();

    // Thermometer shaft (white background)
    ctx.beginPath();
    ctx.rect(rectX1, rectY1, rectWidth, rectHeight);
    ctx.fillStyle= 'white';
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

    // Coloured rect that shows 'temperature'
    var amountSoFar = parseFloat( document.getElementById("amountSoFar").value );
    var goalAmount = parseFloat( document.getElementById("goalAmount").value );
    var fractionOfTotal = amountSoFar / goalAmount;
    var y = getY(fractionOfTotal);
    var colorRectHeight = parseInt(fractionOfTotal * rectHeight);
    ctx.beginPath();
    ctx.rect(rectX1+2, y, rectWidth-4, colorRectHeight+5);
    ctx.fillStyle= 'red';
    ctx.fill();

    // Tick markers
    ctx.beginPath();    
    ctx.moveTo(rectX1+10,rectY1);
    ctx.lineTo(rectX1+30,rectY1);
    ctx.stroke();

    var tick8Y = getY(0.8);
    ctx.moveTo(rectX1+10,tick8Y);
    ctx.lineTo(rectX1+30,tick8Y);
    ctx.stroke();

    var tick6Y = getY(0.6);
    ctx.moveTo(rectX1+10,tick6Y);
    ctx.lineTo(rectX1+30,tick6Y);
    ctx.stroke();

    var tick4Y = getY(0.4);
    ctx.moveTo(rectX1+10,tick4Y);
    ctx.lineTo(rectX1+30,tick4Y);
    ctx.stroke();

    var tick2Y = getY(0.2);
    ctx.moveTo(rectX1+10,tick2Y);
    ctx.lineTo(rectX1+30,tick2Y);
    ctx.stroke();

    // Small ticks
    var smallTick9Y = getY(0.9);
    ctx.moveTo(rectX1+20,smallTick9Y);
    ctx.lineTo(rectX1+30,smallTick9Y);
    ctx.lineWidth=2;
    ctx.stroke();

    var smallTick7Y = getY(0.7);
    ctx.moveTo(rectX1+20,smallTick7Y);
    ctx.lineTo(rectX1+30,smallTick7Y);
    ctx.stroke();

    var smallTick5Y = getY(0.5);
    ctx.moveTo(rectX1+20,smallTick5Y);
    ctx.lineTo(rectX1+30,smallTick5Y);
    ctx.stroke();

    var smallTick3Y = getY(0.3);
    ctx.moveTo(rectX1+20,smallTick3Y);
    ctx.lineTo(rectX1+30,smallTick3Y);
    ctx.stroke();

    var smallTick1Y = getY(0.1);
    ctx.moveTo(rectX1+20,smallTick1Y);
    ctx.lineTo(rectX1+30,smallTick1Y);
    ctx.stroke();

    // Write out the 'temperature'
    ctx.font = "22px Arial";
    ctx.fillStyle="#000";

    var label = "" + document.getElementById('currency').value + document.getElementById("amountSoFar").value;
    ctx.fillText(label, 130, y); 
}

function init() {
    var c=document.getElementById("thermometerImage");
    c.setAttribute("width",canvasWidth);
    c.setAttribute("height",canvasHeight);
    draw();
}
