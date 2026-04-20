var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 

const radio = 45;

var petals = 6;

function drawCircle(x, y) {
    ctx.beginPath(); 
    ctx.arc(x, y, radio, 0, 2 * Math.PI); 
    ctx.stroke(); 
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

drawCircle(200, 100);

function rosette(circleX, circleY, currentPetal) {
    pointX = radio * Math.cos((radio * currentPetal)) + circleX;
    pointY = radio * Math.sin((radio * currentPetal)) + circleY; 
}

for (let i = 0; i < petals; i++) {
    rosette(200, 100, i);
    drawCircle(pointX, pointY);
}
