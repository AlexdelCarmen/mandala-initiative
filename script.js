let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let layers;
const button = document.getElementById("generate");
const exportButton = document.getElementById("export");
const exportPDF = document.getElementById("export-pdf");
const exportCover = document.getElementById("export-cover");

startingPointX = canvas.width / 2;
startingPointY = canvas.height / 2;

const ratio = 25;

function circleCenter(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, ratio, 0, 2 * Math.PI);
  ctx.stroke();
}

function clearCanvas() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // resetea cualquier transformación activa
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// generador de capas del mandala, cada capa es un círculo con puntos equidistantes, luego se conectan con curvas cuadráticas para formar el diseño del mandala
function drawLayer(cx, cy, ctx, capa, scale = 1) {
  const puntos = [];
  const useOrnaments = capa.radio > 120 && Math.random() > 0.35;
  for (let i = 0; i < capa.repeticiones; i++) {
    const anguloBase = -Math.PI / 2;
    const angulo = anguloBase + ((2 * Math.PI) / capa.repeticiones) * i;

    const radio = capa.radio * scale;

    const x = cx + radio * Math.cos(angulo);
    const y = cy + radio * Math.sin(angulo);

    puntos.push({ x, y });
  }

  for (let i = 0; i < puntos.length; i++) {
    const actual = puntos[i];
    const siguiente = puntos[(i + 1) % puntos.length];

    const mx = (actual.x + siguiente.x) / 2;
    const my = (actual.y + siguiente.y) / 2;
    const dx = mx - cx;
    const dy = my - cy;

    const length = Math.sqrt(dx * dx + dy * dy);

    const ornamentOffset = 10;

    const ox = mx + (dx / length) * ornamentOffset;
    const oy = my + (dy / length) * ornamentOffset;

    if (useOrnaments) {
      ctx.beginPath();
      ctx.arc(ox, oy, 3 + capa.radio / 80, 0, Math.PI * 2);
      ctx.stroke();
    }

    const cpx = mx + (mx - cx) * capa.tension;
    const cpy = my + (my - cy) * capa.tension;

    ctx.beginPath();
    ctx.lineWidth = 0.5 + capa.radio / 150;

    ctx.moveTo(actual.x, actual.y);
    ctx.quadraticCurveTo(cpx, cpy, siguiente.x, siguiente.y);

    ctx.stroke();
  }
}

// ornamento central del mandala, con 8 pétalos alrededor de un círculo central, para darle un punto focal al diseño
function drawCenterOrnament(cx, cy, ctx) {
  ctx.lineWidth = 1;
  const petalos = 8;
  const radio = 18;

  for (let i = 0; i < petalos; i++) {
    const angulo = ((Math.PI * 2) / petalos) * i;

    const x = cx + Math.cos(angulo) * radio;
    const y = cy + Math.sin(angulo) * radio;

    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, Math.PI * 2);
  ctx.stroke();
}

function drawMandala(cx, cy, ctx, canvasWidth, canvasHeight) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight); // Fondo blanco para el mandala
  layers = Math.floor(Math.random() * 6) + 6; // Número aleatorio de capas entre 6 y 12

  const capas = [];
  let radioActual = 30;
  const radioMaximo = 280;
  for (let i = 1; i <= layers; i++) {
    const repeticionesBase = [6, 8, 10, 12][Math.floor(Math.random() * 4)];
    const spacing = 45 + repeticionesBase * 2;
    radioActual += spacing + Math.random() * 10;
    if (radioActual > radioMaximo) break; // Detener si el radio supera el máximo permitido

    capas.push({
      radio: radioActual,
      repeticiones: repeticionesBase + (Math.random() > 0.7 ? 2 : 0), // variaciones ligeras en repeticiones
      tension: Math.random() * 0.12 + 0.42, // Tensión aleatoria entre 0.42 y 0.58
    });
  }

  capas.sort((a, b) => a.radio - b.radio);

  for (const capa of capas) {
    drawLayer(cx, cy, ctx, capa, 1);

    if (capa.radio > 40) {
      drawLayer(cx, cy, ctx, capa, 0.92);
    }
  }
  drawCenterOrnament(cx, cy, ctx);
}

function drawCover(cx, cy, ctx, canvasWidth, canvasHeight) {
  // Fondo oscuro
  ctx.fillStyle = "#0a0a1a";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  layers = Math.floor(Math.random() * 6) + 6;
  const capas = [
    { radio: Math.floor(Math.random() * 15) + 10, repeticiones: 6, tension: 1 },
  ];

  let radioActual = 30;
  const radioMaximo = 280;
  for (let i = 1; i <= layers; i++) {
    radioActual += Math.floor(Math.random() * 40) + 40;
    if (radioActual > radioMaximo) break;
    capas.push({
      radio: radioActual,
      repeticiones: Math.floor(Math.random() * 4) * 2 + 6,
      tension: Math.random() * 0.12 + 0.42,
    });
  }

  capas.sort((a, b) => a.radio - b.radio);

  const capasInvertidas = [...capas].reverse();

  capasInvertidas.forEach((capa, index) => {
    const invertedIndex = capas.length - 1 - index;
    const hue = 170 + (invertedIndex / capas.length) * 30; // 170-200: cyan a turquesa
    const lightness = 55 + (invertedIndex / capas.length) * 20; // más claro hacia afuera

    const puntos = [];
    for (let i = 0; i < capa.repeticiones; i++) {
      const anguloBase = -Math.PI / 2;
      const angulo = anguloBase + ((2 * Math.PI) / capa.repeticiones) * i;
      puntos.push({
        x: cx + capa.radio * Math.cos(angulo),
        y: cy + capa.radio * Math.sin(angulo),
      });
    }

    // Dibujar el path completo primero para el fill
    ctx.beginPath();
    for (let i = 0; i < puntos.length; i++) {
      const actual = puntos[i];
      const siguiente = puntos[(i + 1) % puntos.length];
      const mx = (actual.x + siguiente.x) / 2;
      const my = (actual.y + siguiente.y) / 2;
      const cpx = mx + (mx - cx) * capa.tension;
      const cpy = my + (my - cy) * capa.tension;
      if (i === 0) ctx.moveTo(actual.x, actual.y);
      ctx.quadraticCurveTo(cpx, cpy, siguiente.x, siguiente.y);
    }
    ctx.fillStyle = `hsl(${hue}, 70%, ${lightness}%)`;
    ctx.fill();

    // Trazo blanco encima
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.lineWidth = 0.5 + capa.radio / 150;
    ctx.stroke();
  });
}

button.addEventListener("click", () => {
  clearCanvas(); // Limpiar el canvas antes de dibujar el nuevo mandala
  drawMandala(
    canvas.width / 2,
    canvas.height / 2,
    ctx,
    canvas.width,
    canvas.height,
  );
});

exportButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "mandala.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

exportPDF.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [8.5, 11], // tamaño carta
  });

  const margin = 0.75;
  const size = 8.5 - margin * 2;
  const xOffset = margin;
  const yOffset = (11 - size) / 2;
  const totalPages =
    parseInt(document.getElementById("page-count").value) || 10;

  for (let i = 0; i < totalPages; i++) {
    // Reset completo del canvas
    const SCALE = 3;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 750 * SCALE;
    tempCanvas.height = 750 * SCALE;
    const tempCtx = tempCanvas.getContext("2d");

    tempCtx.scale(SCALE, SCALE);

    tempCtx.fillStyle = "#ffffff";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.strokeStyle = "#000000";

    // Dibuja en el canvas temporal en lugar del canvas principal
    drawMandala(
      tempCanvas.width / 2 / SCALE,
      tempCanvas.height / 2 / SCALE,
      tempCtx,
      750,
      750,
    );

    const imgData = tempCanvas.toDataURL("image/jpeg", 1.0);
    if (i > 0) doc.addPage();
    doc.addImage(imgData, "JPEG", xOffset, yOffset, size, size);
  }

  doc.save("mandala.pdf");
});

exportCover.addEventListener("click", () => {
  const tempCanvas = document.createElement("canvas");
  const SCALE = 3;
  tempCanvas.width = 750 * SCALE;
  tempCanvas.height = 750 * SCALE;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.scale(SCALE, SCALE);

  drawCover(375, 375, tempCtx, 750, 750);

  const link = document.createElement("a");
  link.download = "mandala_cover.png";
  link.href = tempCanvas.toDataURL("image/png");
  link.click();
});
