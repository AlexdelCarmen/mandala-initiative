let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let layers;
const button = document.getElementById("generate");

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

function clearCanvas() {
  ctx.reset();
  canvas.width = canvas.width; // Esto limpia el canvas
}
const capas = [{ radio: 250, repeticiones: Math.floor(Math.random() * 5) + 5 }];

function drawMandala(cx, cy) {
  for (let i = 1; i <= layers; i++) {
    var radio = Math.floor(Math.random() * 5) * 50; // Radio aleatorio entre 50 y 250
    var repeticiones = Math.floor(Math.random() * 11) + 8; // Repeticiones aleatorias entre 6 y 18
    capas.push({ radio: radio, repeticiones: repeticiones });
  }

  for (const capa of capas) {
    for (let i = 0; i < capa.repeticiones; i++) {
      const angulo = ((2 * Math.PI) / capa.repeticiones) * i;
      const x = cx + capa.radio * Math.cos(angulo);
      const y = cy + capa.radio * Math.sin(angulo);
      drawLine(cx, cy, x, y);
      drawCircle(x, y);
    }
  }
}

drawMandala(startingPointX, startingPointY);

button.addEventListener("click", () => {
  layers = Math.floor(Math.random() * 5) + 3; // Número aleatorio de capas entre 3 y 7// Limpiar el canvas antes de dibujar el nuevo mandala
  clearCanvas();
  drawMandala(startingPointX, startingPointY);
});
