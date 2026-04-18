var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 
var slider = document.getElementById("circleMover")


function drawCircle(x) {
    ctx.beginPath(); 
    ctx.arc(95 + x, 50, 40, 0, 2 * Math.PI); 
    ctx.stroke(); 
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

drawCircle(0);

slider.addEventListener("click", () => {
    clearCanvas()
    var sliderValue = parseInt(slider.value)
    drawCircle(sliderValue)
})
