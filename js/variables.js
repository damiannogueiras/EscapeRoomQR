// ----------------------------------
// Definiciones globales utilizadas por presentacion.js y ultimo.js
// ----------------------------------

// `videos` contiene las rutas relativas a los archivos de video para cada reto.
// El índice del array coincide con `retoActual` (0-based).
var videos = ['videos/repair.mp4','videos/ing.mp4','videos/soci.mp4','videos/comu.mp4','videos/xela.mp4'];

// HTML de la botonera numérica reutilizable (0-9). Cada botón llama a la función
// global `darNumero(valor)` que está definida en `presentacion.js`/`ultimo.js`.
var botonesNumeros =
    '<button type="button" class="btn btn-neon" id="0" value="0" onclick="darNumero(\'0\')">0</button>\n' +
    '<button type="button" class="btn btn-neon" id="1" value="1" onclick="darNumero(\'1\')">1</button>\n' +
    '<button type="button" class="btn btn-neon" id="2" value="2" onclick="darNumero(\'2\')">2</button>\n' +
    '<button type="button" class="btn btn-neon" id="3" value="3" onclick="darNumero(\'3\')">3</button>\n' +
    '<button type="button" class="btn btn-neon" id="4" value="4" onclick="darNumero(\'4\')">4</button>\n' +
    '<button type="button" class="btn btn-neon" id="5" value="5" onclick="darNumero(\'5\')">5</button>\n' +
    '<button type="button" class="btn btn-neon" id="6" value="6" onclick="darNumero(\'6\')">6</button>\n' +
    '<button type="button" class="btn btn-neon" id="7" value="7" onclick="darNumero(\'7\')">7</button>\n' +
    '<button type="button" class="btn btn-neon" id="8" value="8" onclick="darNumero(\'8\')">8</button>\n' +
    '<button type="button" class="btn btn-neon" id="9" value="9" onclick="darNumero(\'9\')">9</button>';

// `botonera` es un array con la HTML de los botones para cada reto. Cada entrada
// corresponde a un reto en el mismo orden que `videos`, `msgRetos`, etc.
// Puedes personalizar los botones por reto (por ejemplo, usar letras o símbolos).
var botonera = [
    botonesNumeros, // reto 0 usa 0-9
    botonesNumeros, // reto 1 usa 0-9
    // reto 2 usa botones con caracteres (caracteres alfanuméricos personalizados)
    '<button type="button" class="btn btn-neon" id="0" onclick="darNumero(\'e\')">e</button>\n' +
    '<button type="button" class="btn btn-neon" id="1" onclick="darNumero(\'o\')">o</button>\n' +
    '<button type="button" class="btn btn-neon" id="2" onclick="darNumero(\'S\')">s</button>\n' +
    '<button type="button" class="btn btn-neon" id="3" onclick="darNumero(\'a\')">a</button>\n' +
    '<button type="button" class="btn btn-neon" id="4" onclick="darNumero(\'P\')">p</button>\n' +
    '<button type="button" class="btn btn-neon" id="5" onclick="darNumero(\'d\')">d</button>\n' +
    '<button type="button" class="btn btn-neon" id="6" onclick="darNumero(\'w\')">w</button>\n' +
    '<button type="button" class="btn btn-neon" id="7" onclick="darNumero(\'s\')">s</button>\n' +
    '<button type="button" class="btn btn-neon" id="8" onclick="darNumero(\'l\')">l</button>\n' +
    '<button type="button" class="btn btn-neon" id="9" onclick="darNumero(\'r\')">r</button>',
    botonesNumeros,
    botonesNumeros
];

// `botoneraRespuesta` define la estructura visual de los campos de respuesta
// (por ejemplo, un span por cada dígito con icono de pregunta). Cada entrada
// corresponde a un reto. Asegúrate de que el número de spans coincide con
// `caracteresRespuesta[índice]` para que el comportamiento sea consistente.
var botoneraRespuesta = [
    // reto 0: 4 campos
    '<span id="respuesta1" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta2" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta3" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta4" class="readout-box"><i class="fas fa-question"></i></span>',
    // reto 1: 4 campos (en este proyecto esperan 7 caracteres, pero hay 4 visuales; cuidado)
    '<span id="respuesta1" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta2" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta3" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta4" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta5" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta6" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta7" class="readout-box"><i class="fas fa-question"></i></span>',
    // reto 2: 10 campos con guiones intermedios
    '<span id="respuesta1" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta2" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta3" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta4" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta5" class="readout-box"><i class="fas fa-question"></i></span>-' +
    '<span id="respuesta6" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta7" class="readout-box"><i class="fas fa-question"></i></span>-' +
    '<span id="respuesta8" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta9" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta10" class="readout-box"><i class="fas fa-question"></i></span>',
    // reto 3: 8 campos (con guiones en algunos lugares)
    '<span id="respuesta1" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta2" class="readout-box"><i class="fas fa-question"></i></span>-' +
    '<span id="respuesta3" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta4" class="readout-box"><i class="fas fa-question"></i></span>-' +
    '<span id="respuesta5" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta6" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta7" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta8" class="readout-box"><i class="fas fa-question"></i></span>',
    // reto 4: 4 campos
    '<span id="respuesta1" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta2" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta3" class="readout-box"><i class="fas fa-question"></i></span>' +
    '<span id="respuesta4" class="readout-box"><i class="fas fa-question"></i></span>',
];

// Mensajes descriptivos para cada reto. Se usan en #msg.
var msgRetos = [
    'Introduce Repair Code System ',
    'Importante! Seguide a orde dos ingredientes... <br>1 Leite - ' +
    '2 chocolate en pó - ' +
    '3 ovos - ' +
    '4 mantequilla - ' +
    '5 azucre - ' +
    '6 fariña de trigo - ' +
    '7 POISON',
    'O calendario AZTECA chámase... ',
    'Data de nacemento do/a autor/a máis novo/a',
    'Cando atopedes a peza do puzzle, vestídevos de pirata,<br> collede a bandeira e dirixídevos á illa Lucernario.<br> O tesouro vos agarda!\n'
];

// Respuestas correctas (string). El índice se corresponde con el reto.
var respuestasCorrectas = [
    '3023',
    '8726351',
    'PedradoSol',
    '15091851',
    '1996'
];

// Número de caracteres esperados por reto (usado para comprobar longitud en darNumero)
var caracteresRespuesta = [4,7,10,8,4];


// -------------------------
// Notas / Buenas prácticas
// -------------------------
// - Asegúrate de que la longitud del HTML en `botoneraRespuesta[i]` coincida con
//   `caracteresRespuesta[i]` (o ajusta la lógica de UI) para evitar inconsistencias.
// - Para añadir un nuevo reto: añadir un elemento en todos los arrays (videos,
//   botonera, botoneraRespuesta, msgRetos, respuestasCorrectas y caracteresRespuesta)
//   manteniendo el mismo índice.
// - Los botones llaman a `darNumero` con valores que pueden ser dígitos o
//   caracteres; `respuestasCorrectas` debe usar el mismo formato (strings).

// Ejemplo mínimo para añadir un nuevo reto (índice 5):
// videos.push('videos/nuevo.mp4');
// botonera.push(botonesNumeros); // o HTML personalizado
// botoneraRespuesta.push('<span id="respuesta1">?</span><span id="respuesta2">?</span>');
// msgRetos.push('Texto del nuevo reto');
// respuestasCorrectas.push('42');
// caracteresRespuesta.push(2);
