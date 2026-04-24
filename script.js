let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let layers;
const button = document.getElementById("generate");
const clearButton = document.getElementById("clear");

startingPointX = canvas.width / 2;
startingPointY = canvas.height / 2;

const ratio = 45;

function drawCircle(x, y, ratio) {
  ctx.beginPath();
  ctx.arc(x, y, ratio, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // limpiando el canvas
}

function drawMandala(cx, cy) {
  const capas = [
    { radio: 250, repeticiones: Math.floor(Math.random() * 5) + 8 },
  ];

  for (let i = 1; i <= layers; i++) {
    var radio = Math.floor(Math.random() * 5) * 50; // Radio aleatorio entre 50 y 250
    var repeticiones = Math.floor(Math.random() * 11) + 8; // Repeticiones aleatorias entre 6 y 18
    capas.push({ radio: radio, repeticiones: repeticiones });
  }

  for (const capa of capas) {
    const puntos = [];

    for (let i = 0; i < capa.repeticiones; i++) {
      const angulo = ((2 * Math.PI) / capa.repeticiones) * i;
      const x = cx + capa.radio * Math.cos(angulo);
      const y = cy + capa.radio * Math.sin(angulo);
      puntos.push({ x, y });
      drawCircle(x, y, ratio + (capa.radio / 10) * Math.random()); // Dibujar un círculo con un radio ligeramente aleatorio para cada punto
    }

    for (let i = 0; i < puntos.length; i++) {
      const actual = puntos[i];
      const siguiente = puntos[(i + 1) % puntos.length];
      drawLine(actual.x, actual.y, siguiente.x, siguiente.y);
    }
  }
}

button.addEventListener("click", () => {
  clearCanvas(); // Limpiar el canvas antes de dibujar el nuevo mandala
  layers = Math.floor(Math.random() * 5) + 3; // Número aleatorio de capas entre 3 y 7// Limpiar el canvas antes de dibujar el nuevo mandala
  drawMandala(startingPointX, startingPointY);
});
