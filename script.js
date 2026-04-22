var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 


startingPointX = canvas.width / 2;
startingPointY = canvas.height / 2;

const radio = 45;

function drawCircle(x, y) {
    ctx.beginPath(); 
    ctx.arc(x, y, radio, 0, 2 * Math.PI); 
    ctx.stroke(); 
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath(); 
    ctx.moveTo(x1, y1); 
    ctx.lineTo(x2, y2); 
    ctx.stroke(); 
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawMandala(cx, cy) {
  const capas = [
    { radio: 50,  repeticiones: 6 },
    { radio: 100, repeticiones: 14 },
    { radio: 150, repeticiones: 10  },
    { radio: 200, repeticiones: 8  },
  ];

  for (const capa of capas) {
    for (let i = 0; i < capa.repeticiones; i++) {
      const angulo = (2 * Math.PI / capa.repeticiones) * i;
      const x = cx + capa.radio * Math.cos(angulo);
      const y = cy + capa.radio * Math.sin(angulo);
      drawLine(cx, cy, x, y);
      drawCircle(x, y);
    }
  }
}

drawMandala(startingPointX, startingPointY);