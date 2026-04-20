var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 
var numberOfPetals = document.getElementById("petals");

startingPointX = 300;
startingPointY = 400;

const radio = 45;

var petals = numberOfPetals.value;

function drawCircle(x, y) {
    ctx.beginPath(); 
    ctx.arc(x, y, radio, 0, 2 * Math.PI); 
    ctx.stroke(); 
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}



function rosette(circleX, circleY, currentPetal) {
    pointX = radio * Math.cos((radio * currentPetal)) + circleX;
    pointY = radio * Math.sin((radio * currentPetal)) + circleY; 
}

numberOfPetals.addEventListener("change", function() {
    petals = numberOfPetals.value;
    clearCanvas(); 
    drawCircle(startingPointX, startingPointY);
    for (let i = 0; i < petals; i++) {
        rosette(startingPointX, startingPointY, i);
        drawCircle(pointX, pointY);
    }
})
