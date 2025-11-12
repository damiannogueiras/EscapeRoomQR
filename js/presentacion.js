// js/presentacion.js
// Control de la presentación interactiva por retos.
// - Maneja la reproducción del video por reto
// - Gestión de la entrada numérica (botonera) y comprobación de respuestas
// - Avance entre retos y visualización de modales de acierto/fallo

// Variables de estado
var _respuesta = ""; // acumulador de dígitos/caracteres introducidos
var _contador = 0;     // número de dígitos introducidos en el reto actual
var retoActual = 0;    // índice (0-based) del reto actualmente activo

// Icono HTML para marcar retos superados
var checkReto = '<i class="fas fa-skull-crossbones"></i>';

// Referencia al elemento <video id="my-video"> (puede ser null si no existe)
var myVideo = document.getElementById('my-video');

// Inicialización al cargar el DOM: cargar el reto inicial
$(document).ready(function(){
    try { actualizar(retoActual); }
    catch(e){ console.warn('Error inicializando presentación:', e); }
});

/**
 * Añade un dígito/caracter a la respuesta actual y comprueba si se ha completado.
 * Si la respuesta es correcta se muestra el modal de acierto y se avanza al próximo reto.
 * Si es incorrecta se muestra el modal de fallo y se reinician los campos visuales.
 *
 * @param {string|number} numero - valor introducido por el usuario (p. ej. '1' o 'A')
 */
function darNumero(numero){
    _respuesta = _respuesta + numero;
    _contador++;

    // Actualizar campo visual correspondiente: #respuesta1, #respuesta2, ...
    var $cell = $('#respuesta' + _contador);
    if ($cell && $cell[0]) { $cell[0].innerText = numero; }

    console.log('Respuesta: ' + _respuesta + ' contador: ' + _contador);

    // Comprobaciones defensivas: asegurar que variables globales requeridas existen
    if (typeof caracteresRespuesta === 'undefined' || typeof respuestasCorrectas === 'undefined') {
        console.warn('Faltan variables globales: caracteresRespuesta o respuestasCorrectas');
        return;
    }

    var longitudEsperada = caracteresRespuesta[retoActual];
    var respuestaCorrecta = respuestasCorrectas[retoActual];

    if (_contador >= longitudEsperada && _respuesta === respuestaCorrecta) {
        // Respuesta correcta
        $('#feito').modal('show');
        var $retoEl = $('#reto' + retoActual);
        if ($retoEl && $retoEl[0]) { $retoEl[0].innerHTML = checkReto; }

        // Avanzar al siguiente reto
        retoActual = retoActual + 1;
        actualizar(retoActual);

        // Reset para el nuevo reto
        _contador = 0;
        _respuesta = '';

    } else if (_contador >= longitudEsperada && _respuesta !== respuestaCorrecta) {
        // Respuesta incorrecta
        $('#nonfeito').modal('show');
        _contador = 0;
        _respuesta = '';
        // Reset visual a iconos de pregunta
        for (var i = 1; i <= longitudEsperada; i++) {
            var $r = $('#respuesta' + i);
            if ($r && $r[0]) { $r[0].innerHTML = '<i class="fas fa-question"></i>'; }
        }
    }
}

/**
 * Actualiza la vista para mostrar el reto indicado.
 * - Cambia el video (src/poster), el mensaje y las botoneras.
 * - Si es el reto final (índice 4) oculta la sección de respuesta en esta pantalla.
 *
 * @param {number} reto - índice del reto a mostrar
 */
function actualizar(reto){
    // Comprobaciones defensivas sobre variables externas
    if (typeof videos === 'undefined' || typeof msgRetos === 'undefined' || typeof botonera === 'undefined' || typeof botoneraRespuesta === 'undefined') {
        console.warn('Faltan variables globales necesarias (videos, msgRetos, botonera, botoneraRespuesta)');
        return;
    }

    // Actualizar video si existe y hay una entrada válida
    if (myVideo && videos[reto]) {
        myVideo.setAttribute('src', videos[reto]);
        myVideo.setAttribute('poster', 'images/' + reto + '.png');
    }

    // Cachear selectores usados varias veces
    var $labelRespuesta = $('#labelRespuesta');
    var $botonera = $('#botonera');
    var $botonerarespuesta = $('#botonerarespuesta');
    var $msg = $('#msg');

    // Si estamos en el último reto (por convención el índice 4), ocultar la sección de respuesta
    if (reto === 4) {
        if ($labelRespuesta && $labelRespuesta.hide) { $labelRespuesta.hide(); }
        if ($botonera && $botonera.hide) { $botonera.hide(); }
    } else {
        if ($labelRespuesta && $labelRespuesta.show) { $labelRespuesta.show(); }
        if ($botonera && $botonera.show) { $botonera.show(); }
    }

    // Escribir mensaje y botoneras
    if ($msg && $msg[0]) { $msg[0].innerHTML = msgRetos[reto]; }
    if ($botonera && $botonera[0]) { $botonera[0].innerHTML = botonera[reto]; }
    if ($botonerarespuesta && $botonerarespuesta[0]) { $botonerarespuesta[0].innerHTML = botoneraRespuesta[reto]; }
}
