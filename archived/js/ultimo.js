// Código específico para la página final (ultimo.html)
// Comentado y adaptado para no depender de Font Awesome.

// Estado local de la entrada de respuesta
var _respuesta = "";
var _contador = 0;
// En esta página trabajamos siempre con el reto 4 (último)
var retoActual = 4;

// Icono/emoji para marcar retos conseguidos (reemplaza Font Awesome)
var checkReto = '✅';

// Aseguramos que la función actualizar se llame cuando el DOM esté listo
if (typeof $ !== 'undefined') {
    $(document).ready(function(){ actualizar(retoActual); });
} else {
    window.addEventListener('load', function(){ if(typeof actualizar==='function') actualizar(retoActual); });
}

/**
 * sleep asíncrono usando Promise + setTimeout (no bloqueante)
 * @param {number} ms - milisegundos a esperar
 * @returns {Promise<void>}
 */
function sleepAsync(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Función que recoge dígitos/caracteres y, si coincide con la respuesta correcta,
 * realiza una secuencia de acciones que incluyen comandos MQTT.
 * Nota: requiere un objeto `client` válido (MQTT) y la librería Messaging si se
 * quiere activar la secuencia MQTT. Si `client` no existe se salta esa parte.
 * @param {string} numero - dígito o caracter introducido
 */
async function darNumero(numero){
    _respuesta = _respuesta + numero;
    _contador++;
    // rellenamos la respuesta segun vayan pulsando los botones
    var $elem = (typeof $ !== 'undefined') ? $('#respuesta'+_contador) : document.getElementById('respuesta'+_contador);
    if ($elem && $elem[0]) { $elem[0].innerText = numero; }
    else if ($elem && $elem.innerText !== undefined) { $elem.innerText = numero; }

    // Valida que las variables globales existen
    if (typeof caracteresRespuesta === 'undefined' || typeof respuestasCorrectas === 'undefined') {
        console.warn('Faltan variables globales: caracteresRespuesta o respuestasCorrectas');
        return;
    }

    // Comparaciones estrictas para evitar coerción
    if (_contador >= caracteresRespuesta[retoActual] && _respuesta === respuestasCorrectas[retoActual]) {

        // Respuesta Correcta: mostramos modal de acierto si existe jQuery/Bootstrap
        if (typeof $ !== 'undefined' && typeof $.fn.modal === 'function') {
            $('#feito').modal('show');
        } else {
            alert('¡Correcto!');
        }

        // Marcamos visualmente el reto como conseguido
        var $retoEl = (typeof $ !== 'undefined') ? $('#reto'+retoActual) : document.getElementById('reto'+retoActual);
        if ($retoEl && $retoEl[0]) { $retoEl[0].innerHTML = checkReto; }
        else if ($retoEl && $retoEl.innerHTML !== undefined) { $retoEl.innerHTML = checkReto; }

    } else if (_contador >= caracteresRespuesta[retoActual] && _respuesta !== respuestasCorrectas[retoActual]){
        // Respuesta incorrecta
        if (typeof $ !== 'undefined' && typeof $.fn.modal === 'function') {
            $('#nonfeito').modal('show');
        } else {
            alert('Respuesta incorrecta');
        }
        // contador y respuesta a cero
        _contador=0;
        _respuesta="";
        // reseteamos la respuesta con '?'
        for(let i=1; i<caracteresRespuesta[retoActual]+1; i++) {
            var el = (typeof $ !== 'undefined') ? $('#respuesta'+i) : document.getElementById('respuesta'+i);
            if (el && el[0]) { el[0].innerHTML='?'; }
            else if (el && el.innerHTML !== undefined) { el.innerHTML='?'; }
        }
    }
}

/**
 * Actualiza la vista del último reto: no hay video en esta página, sólo texto,
 * botonera y marcamos los retos anteriores como completados.
 * @param {number} reto - índice del reto a mostrar
 */
function actualizar(reto){
    // texto del reto (mensaje fijo para la última página)
    var $msg = (typeof $ !== 'undefined') ? $('#msg') : document.getElementById('msg');
    if ($msg && $msg[0]) { $msg[0].innerHTML = 'Ano da publicación:'; }
    else if ($msg && $msg.innerHTML !== undefined) { $msg.innerHTML = 'Ano da publicación:'; }

    // botonera del reto
    var $botonera = (typeof $ !== 'undefined') ? $('#botonera') : document.getElementById('botonera');
    if ($botonera && $botonera[0]) { $botonera[0].innerHTML = botonera[reto]; }
    else if ($botonera && $botonera.innerHTML !== undefined) { $botonera.innerHTML = botonera[reto]; }

    // contador y respuesta a cero (representación visual)
    var $botonerarespuesta = (typeof $ !== 'undefined') ? $('#botonerarespuesta') : document.getElementById('botonerarespuesta');
    if ($botonerarespuesta && $botonerarespuesta[0]) { $botonerarespuesta[0].innerHTML = botoneraRespuesta[reto]; }
    else if ($botonerarespuesta && $botonerarespuesta.innerHTML !== undefined) { $botonerarespuesta.innerHTML = botoneraRespuesta[reto]; }

    // Marcamos todos los retos previos como completados (visual)
    for(let i=0; i<4; i++) {
        var $r = (typeof $ !== 'undefined') ? $('#reto'+i) : document.getElementById('reto'+i);
        if ($r && $r[0]) { $r[0].innerHTML = checkReto; }
        else if ($r && $r.innerHTML !== undefined) { $r.innerHTML = checkReto; }
    }
}
