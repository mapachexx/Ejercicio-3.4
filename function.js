const preguntaElem = document.getElementById("pregunta");
const opcionesElem = document.getElementById("opciones");
const aciertosElem = document.getElementById("aciertos");
const erroresElem = document.getElementById("errores");
const listaBitacora = document.getElementById("lista-bitacora");

let aciertos = 0;
let errores = 0;
let bitacora = [];

if (localStorage.getItem("aciertos")) {
  aciertos = parseInt(localStorage.getItem("aciertos"));
  errores = parseInt(localStorage.getItem("errores"));
  actualizarMarcador();
}

function generarPregunta() {
  const dificultad = 10 + aciertos * 5;

  const a = Math.floor(Math.random() * dificultad) + 1;
  const b = Math.floor(Math.random() * dificultad) + 1;
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
    btn.onclick = () => verificarRespuesta(opcion, respuestaCorrecta, expresion, opciones);
    opcionesElem.appendChild(btn);
  });
}

function verificarRespuesta(seleccionada, correcta, expresion, opciones) {
  const esCorrecta = seleccionada === correcta;

  if (esCorrecta) {
    aciertos++;
  } else {
    errores++;
  }

  actualizarMarcador();
  guardarResultados();

  const respuesta = {
    question: expresion,
    options: opciones,
    selected: seleccionada,
    correct: esCorrecta
  };

  bitacora.push(respuesta);
  guardarEnServidor(respuesta);
  agregarABitacoraVisual(respuesta);

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
  bitacora = [];
  actualizarMarcador();
  localStorage.removeItem("aciertos");
  localStorage.removeItem("errores");
  listaBitacora.innerHTML = "";

  fetch("http://localhost:3000/respuestas", {
    method: "DELETE"
  });

  mostrarPregunta();
}

document.getElementById("reiniciar").onclick = reiniciarJuego;

function agregarABitacoraVisual(respuesta) {
  const item = document.createElement("li");
  item.className = respuesta.correct ? "correcta" : "incorrecta";
  item.textContent = `P: ${respuesta.question} → Elegiste: ${respuesta.selected}`;

  // Crear botón de cerrar
  const botonCerrar = document.createElement("boton");
  botonCerrar.textContent = "x"; // ícono de cerrar
  botonCerrar.style.contain="1px";
  botonCerrar.style.cursor = "pointer";
  botonCerrar.onclick = function () {
    item.remove(); // Elimina el <li> del DOM
  };

  // Agregar el botón al item
  item.appendChild(botonCerrar);

  // Agregar item a la lista
  listaBitacora.prepend(item);
}


function guardarEnServidor(respuesta) {
  fetch("http://localhost:3000/respuestas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(respuesta)
  });
}

function cargarHistorialDesdeServidor() {
  fetch("http://localhost:3000/respuestas")
    .then(res => res.json())
    .then(data => {
      data.forEach(respuesta => agregarABitacoraVisual(respuesta));
    });
}

cargarHistorialDesdeServidor();
mostrarPregunta();
