// Código específico para la página final (ultimo.html)
// Aquí `retoActual` está fijado al índice final (4) y existen acciones MQTT

var _respuesta = "";
var _contador = 0;
// En esta página trabajamos siempre con el reto 4 (último)
var retoActual = 4;

// Icono para marcar retos conseguidos
var checkReto = '<i class="fas fa-skull-crossbones"></i>';

// Inicialización segura al cargar el DOM
$(document).ready(function(){ actualizar(retoActual); });

/**
 * sleep bloqueante (NO recomendado en navegadores: detiene el hilo principal).
 * Actualmente se usa para espaciar envíos MQTT en este código, pero es mejor
 * usar temporizadores asíncronos (setTimeout/Promises) para no bloquear la UI.
 *
 * @param {number} milliseconds - tiempo a esperar en ms
 */
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e8; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

/**
 * Función que recoge dígitos/caracteres y, si coincide con la respuesta correcta,
 * realiza una secuencia de acciones que incluyen comandos MQTT.
 * Nota: requiere un objeto `client` válido (MQTT) y la librería Messaging.
 */
function darNumero(numero){
    _respuesta = _respuesta + numero;
    _contador++;
    // rellenamos la respuesta segun vayan pulsando los botones
    var $elem = $('#respuesta'+_contador);
    if ($elem && $elem[0]) { $elem[0].innerText = numero; }

    // Valida que las variables globales existen
    if (typeof caracteresRespuesta === 'undefined' || typeof respuestasCorrectas === 'undefined') {
        console.warn('Faltan variables globales: caracteresRespuesta o respuestasCorrectas');
        return;
    }

    // Comparaciones estrictas para evitar coerción
    if (_contador >= caracteresRespuesta[retoActual] && _respuesta === respuestasCorrectas[retoActual]) {

        // ======= Bloque MQTT =======
        // En este proyecto se usa la librería MQTT (Messaging) para enviar comandos
        // a dispositivos tasmota. `client` debe estar inicializado y conectado.
        // Se envían ON y OFF alternados a POWER1..POWER7 con pausas.
        // IMPORTANTE: `sleep` es bloqueante — mejor reescribir con setTimeout/promises.

        // debug
        console.log("Respuesta: " + _respuesta + " contador: " + _contador);

        if (typeof client !== 'undefined' && typeof Messaging !== 'undefined') {
            for (let i=1; i<8; i++) {
                // mqtt - encender
                var message = new Messaging.Message("ON");
                message.destinationName = "cmnd/tasmota/POWER" + i;
                client.send(message);
                // pausa (bloqueante actualmente)
                sleep(2000);
                // mqtt - apagar
                message = new Messaging.Message("OFF");
                message.destinationName = "cmnd/tasmota/POWER" + i;
                client.send(message);
            }
        } else {
            console.warn('MQTT client o Messaging no definidos; se omiten comandos MQTT');
        }
        // ======= fin MQTT =======

        // Respuesta Correcta: mostramos modal de acierto
        $('#feito').modal('show');

        // Marcamos visualmente el reto como conseguido
        var $retoEl = $('#reto'+retoActual);
        if ($retoEl && $retoEl[0]) { $retoEl[0].innerHTML = checkReto; }

        // Aquí se puede añadir lógica extra (animaciones, engranajes, etc.)
        // por ejemplo: disparar una animación CSS o rotación de elementos.

    } else if (_contador >= caracteresRespuesta[retoActual] && _respuesta !== respuestasCorrectas[retoActual]){
        // Respuesta incorrecta
        $('#nonfeito').modal('show');
        // contador y respuesta a cero
        _contador=0;
        _respuesta="";
        // reseteamos la respuesta con '?'
        for(let i=1; i<caracteresRespuesta[retoActual]+1; i++) {
            var $cell = $('#respuesta'+i);
            if ($cell && $cell[0]) { $cell[0].innerHTML='<i class="fas fa-question"></i>'; }
        }
    }
}

/**
 * Actualiza la vista del último reto: no hay video en esta página, sólo texto,
 * botonera y marcamos los retos anteriores como completados.
 */
function actualizar(reto){
    // no hay video en la vista final (si existiera, se podría asignar como en presentacion.js)

    // texto del reto (mensaje fijo para la última página)
    var $msg = $('#msg');
    if ($msg && $msg[0]) { $msg[0].innerHTML = 'Ano da publicación:'; }

    // botonera del reto
    var $botonera = $('#botonera');
    if ($botonera && $botonera[0]) { $botonera[0].innerHTML = botonera[reto]; }

    // contador y respuesta a cero (representación visual)
    var $botonerarespuesta = $('#botonerarespuesta');
    if ($botonerarespuesta && $botonerarespuesta[0]) { $botonerarespuesta[0].innerHTML = botoneraRespuesta[reto]; }

    // Marcamos todos los retos previos como completados (visual)
    for(let i=0; i<4; i++) {
        var $r = $('#reto'+i);
        if ($r && $r[0]) { $r[0].innerHTML = checkReto; }
    }
}
