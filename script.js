let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let layers;
const button = document.getElementById("generate");
const clearButton = document.getElementById("clear");

startingPointX = canvas.width / 2;
startingPointY = canvas.height / 2;

const ratio = 45;

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
  const capas = [];

  let radioActual = 50;
  for (let i = 1; i <= layers; i++) {
    radioActual += Math.floor(Math.random() * 40) + 40; // Incremento aleatorio entre 40 y 80
    capas.push({
      radio: radioActual,
      repeticiones: Math.floor(Math.random() * 4) * 2 + 6, // 6, 8, 10 o 12 repeticiones
      tension: Math.random() * 0.2 + 0.4, // Tensión aleatoria entre 0.4 y 0.6
    });
  }

  capas.sort((a, b) => a.radio - b.radio);

  for (const capa of capas) {
    const puntos = [];

    for (let i = 0; i < capa.repeticiones; i++) {
      const anguloBase = -Math.PI / 2; // Comenzar desde la parte superior
      const angulo = anguloBase + ((2 * Math.PI) / capa.repeticiones) * i;
      const x = cx + capa.radio * Math.cos(angulo);
      const y = cy + capa.radio * Math.sin(angulo);
      puntos.push({ x, y });
    }

    for (let i = 0; i < puntos.length; i++) {
      const actual = puntos[i];
      const siguiente = puntos[(i + 1) % puntos.length];
      for (let i = 0; i < puntos.length; i++) {
        const actual = puntos[i];
        const siguiente = puntos[(i + 1) % puntos.length];

        //punto medio entre actual y siguiente
        const mx = (actual.x + siguiente.x) / 2;
        const my = (actual.y + siguiente.y) / 2;

        //punto de control: empuja el medio hacia afuera del centro del mandala
        const cpx = mx + (mx - cx) * capa.tension;
        const cpy = my + (my - cy) * capa.tension;

        ctx.beginPath();
        ctx.moveTo(actual.x, actual.y);
        ctx.quadraticCurveTo(cpx, cpy, siguiente.x, siguiente.y);
        ctx.stroke();
      }
    }
  }
}

button.addEventListener("click", () => {
  clearCanvas(); // Limpiar el canvas antes de dibujar el nuevo mandala
  layers = Math.floor(Math.random() * 3) + 3; // Número aleatorio de capas entre 6 y 12
  drawMandala(startingPointX, startingPointY);
});
