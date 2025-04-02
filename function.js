let aciertos = 0;
let errores = 0;

const preguntaElem = document.getElementById("pregunta");
const botones = [
    document.getElementById("boton1"),
    document.getElementById("boton2"),
    document.getElementById("boton3"),
    document.getElementById("boton4"),
];
const continuarBtn = document.getElementById("continuar");
const aciertosElem = document.getElementById("aciertos");
const erroresElem = document.getElementById("errores");

let respuestaCorrecta;

function nuevaPregunta() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    respuestaCorrecta = num1 + num2;

    preguntaElem.textContent = `¿Cuánto es ${num1} + ${num2}?`;

    const opciones = [respuestaCorrecta];
    while (opciones.length < 4) {
        const opcion = Math.floor(Math.random() * 20) + 1;
        if (!opciones.includes(opcion)) {
            opciones.push(opcion);
        }
    }

    // Mezclar opciones
    opciones.sort(() => Math.random() - 0.5);

    // Asignar opciones a los botones
    for (let i = 0; i < botones.length; i++) {
        botones[i].textContent = opciones[i];
        botones[i].onclick = () => verificarRespuesta(opciones[i]);
    }
}

function verificarRespuesta(opcionSeleccionada) {
    if (opcionSeleccionada === respuestaCorrecta) {
        aciertos++;
    } else {
        errores++;
    }
    actualizarContadores();
}

function actualizarContadores() {
    aciertosElem.textContent = aciertos;
    erroresElem.textContent = errores;
}

continuarBtn.onclick = nuevaPregunta;


nuevaPregunta();