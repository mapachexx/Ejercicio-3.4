const preguntaElem = document.getElementById("pregunta");
const opcionesElem = document.getElementById("opciones");
const aciertosElem = document.getElementById("aciertos");
const erroresElem = document.getElementById("errores");

let aciertos = 0;
let errores = 0;

if (localStorage.getItem("aciertos")) {
  aciertos = parseInt(localStorage.getItem("aciertos"));
  errores = parseInt(localStorage.getItem("errores"));
  actualizarMarcador();
}

function generarPregunta() {
  const a = Math.floor(Math.random() * 50) + 1;
  const b = Math.floor(Math.random() * 50) + 1;
  const operadores = ['+', '-', '*', '/'];
  const operador = operadores[Math.floor(Math.random() * operadores.length)];

  let resultado;
  switch (operador) {
    case '+': resultado = a + b; break;
    case '-': resultado = a - b; break;
    case '*': resultado = a * b; break;
    case '/': resultado = Math.round(a / b); break;
  }

  return {
    expresion: `${a} ${operador} ${b}`,
    respuestaCorrecta: resultado
  };
}

function mostrarPregunta() {
  opcionesElem.innerHTML = "";

  const { expresion, respuestaCorrecta } = generarPregunta();
  preguntaElem.textContent = `¿Cuánto es ${expresion}?`;

  const opciones = [respuestaCorrecta];
  while (opciones.length < 4) {
    const distractor = respuestaCorrecta + Math.floor(Math.random() * 20 - 10);
    if (!opciones.includes(distractor)) {
      opciones.push(distractor);
    }
  }

  opciones.sort(() => Math.random() - 0.5);

  opciones.forEach((opcion) => {
    const btn = document.createElement("button");
    btn.classList.add("opcion");
    btn.textContent = opcion;
    btn.onclick = () => verificarRespuesta(opcion, respuestaCorrecta);
    opcionesElem.appendChild(btn);
  });
}

function verificarRespuesta(seleccionada, correcta) {
  if (seleccionada === correcta) {
    aciertos++;
  } else {
    errores++;
  }

  actualizarMarcador();
  guardarResultados();
  mostrarPregunta();
}

function actualizarMarcador() {
  aciertosElem.textContent = aciertos;
  erroresElem.textContent = errores;
}

function guardarResultados() {
  localStorage.setItem("aciertos", aciertos);
  localStorage.setItem("errores", errores);
}

function reiniciarJuego() {
  aciertos = 0;
  errores = 0;
  actualizarMarcador();
  localStorage.removeItem("aciertos");
  localStorage.removeItem("errores");
  mostrarPregunta();
}

document.getElementById("reiniciar").onclick = reiniciarJuego;

mostrarPregunta();
