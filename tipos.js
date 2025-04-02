pregunta = {
    texto : String,
    respuesta : String,
    opciones : [String],
};

function generador_preguntas () {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    respuestaCorrecta = num1 + num2;
    pregunta.texto = `¿Cuánto es ${num1} + ${num2}?`;
    pregunta.respuesta = respuestaCorrecta.toString();
    
    const opciones = [respuestaCorrecta];
    while (opciones.length < 4) {
        const opcion = Math.floor(Math.random() * 20) + 1;
        if (!opciones.includes(opcion)) {
            opciones.push(opcion);
        }
    }
    opciones.sort(() => Math.random() - 0.5);
    pregunta.opciones = opciones.map(opcion => opcion.toString());
}