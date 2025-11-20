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
    // Defensive: validate that the arrays exist; if not, warn but continue with defaults
    if (typeof msgRetos === 'undefined') { console.warn('msgRetos no definido'); msgRetos = []; }
    if (typeof botonera === 'undefined') { console.warn('botonera no definido'); botonera = []; }
    if (typeof botoneraRespuesta === 'undefined') { console.warn('botoneraRespuesta no definido'); botoneraRespuesta = []; }
    if (typeof videos === 'undefined') { videos = []; }

    // Normalize index
    var idx = parseInt(reto, 10);
    if (isNaN(idx) || idx < 0) idx = 0;
    // clamp to available range (use last available index if requested is too large)
    var maxIndex = Math.max(msgRetos.length, botonera.length, botoneraRespuesta.length) - 1;
    if (maxIndex < 0) maxIndex = 0;
    if (idx > maxIndex) idx = maxIndex;

    // Debug logs to help diagnose UI update issues
    try{
        console.log('[presentacion] actualizar called with reto=', reto, '-> idx=', idx, 'maxIndex=', maxIndex);
        console.log('[presentacion] arrays lengths: msgRetos=', msgRetos.length, 'botonera=', botonera.length, 'botoneraRespuesta=', botoneraRespuesta.length, 'videos=', videos.length);
    }catch(e){ /* ignore logging errors */ }

    // Update global state so the rest of the app can rely on retoActual
    retoActual = idx;

    // Update video safely
    if (myVideo) {
        if (videos[idx]) {
            try{ myVideo.setAttribute('src', videos[idx]); } catch(e){ console.warn('No se pudo setear src del video:', e); }
            try{ myVideo.setAttribute('poster', 'images/' + idx + '.png'); } catch(e){ /* ignore */ }
        } else {
            // No video for this index — remove src to avoid playing stale content
            try{ myVideo.removeAttribute('src'); } catch(e){/*ignore*/}
        }
    }

    // Cache selectors
    var $labelRespuesta = $('#labelRespuesta');
    var $botonera = $('#botonera');
    var $botonerarespuesta = $('#botonerarespuesta');
    var $instrucciones = $('#instrucciones');
    var $msg = $('#msg');

    // Always show input sections on index.html (we removed ultimo.html flow)
    if ($labelRespuesta && $labelRespuesta.show) { $labelRespuesta.show(); }
    if ($botonera && $botonera.show) { $botonera.show(); }

    // Write safe values (use empty string if undefined)
    var safeMsg = (msgRetos[idx] !== undefined) ? msgRetos[idx] : '';
    var safeInstr = (typeof instruccionesRetos !== 'undefined' && instruccionesRetos[idx]) ? instruccionesRetos[idx] : '';
    var safeBotonera = (botonera[idx] !== undefined) ? botonera[idx] : '';
    var safeBotoneraRespuesta = (botoneraRespuesta[idx] !== undefined) ? botoneraRespuesta[idx] : '';

    if ($msg && $msg[0]) { $msg[0].innerHTML = safeMsg; }
    if ($instrucciones && $instrucciones[0]) { $instrucciones[0].innerHTML = safeInstr; }
    if ($botonera && $botonera[0]) { $botonera[0].innerHTML = safeBotonera; }
    if ($botonerarespuesta && $botonerarespuesta[0]) { $botonerarespuesta[0].innerHTML = safeBotoneraRespuesta; }
}
