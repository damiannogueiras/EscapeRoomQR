// ----------------------------------
// Definiciones globales utilizadas por presentacion.js y ultimo.js
// Comentado y adaptado para no depender de Font Awesome ni clases no definidas
// ----------------------------------

// `videos` contiene las rutas relativas a los archivos de video para cada reto.
// El índice del array coincide con `retoActual` (0-based).
var videos = ['videos/repair.mp4','videos/ing.mp4','videos/soci.mp4','videos/comu.mp4','videos/xela.mp4'];

// ------------------------------------------------------------------
// Botonera: HTML de los botones reutilizables. Antes usaba clase `btn-neon` y
// Font Awesome; ahora usamos clases de Bootstrap (btn btn-outline-light) y
// texto/emoji para los iconos para evitar dependencias externas.
// ------------------------------------------------------------------

// Generador simple de botones numéricos (0-9) como string HTML.
function generarBotonesNumeros(btnClass = 'btn btn-outline-light btn-sm'){
    var out = '';
    for(var i=0;i<=9;i++){
        out += '<button type="button" class="'+btnClass+' mx-1" id="num'+i+'" value="'+i+'" onclick="darNumero(\''+i+'\')">'+i+'</button>';
    }
    return out;
}

var botonesNumeros = generarBotonesNumeros();

// `botonera` es un array con la HTML de los botones para cada reto. Cada entrada
// corresponde a un reto en el mismo orden que `videos`, `msgRetos`, etc.
var botonera = [
    botonesNumeros, // reto 0 usa 0-9
    botonesNumeros, // reto 1 usa 0-9
    // reto 2 usa botones con caracteres (alfanuméricos personalizados)
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'e\')">e</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'o\')">o</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'S\')">S</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'a\')">a</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'P\')">P</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'d\')">d</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'w\')">w</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'s\')">s</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'l\')">l</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'r\')">r</button>',
    botonesNumeros,
    botonesNumeros
];

// `botoneraRespuesta` define la estructura visual de los campos de respuesta
// Antes usaba iconos Font Awesome; ahora se usa un símbolo de interrogación simple
// o un guion para separadores. Cada entrada corresponde a un reto.
var botoneraRespuesta = [
    // reto 0: 4 campos
    '<span id="respuesta1" class="readout-box">?</span>' +
    '<span id="respuesta2" class="readout-box">?</span>' +
    '<span id="respuesta3" class="readout-box">?</span>' +
    '<span id="respuesta4" class="readout-box">?</span>',
    // reto 1: 7 campos (se actualizaron para coincidir con caracteresRespuesta)
    '<span id="respuesta1" class="readout-box">?</span>' +
    '<span id="respuesta2" class="readout-box">?</span>' +
    '<span id="respuesta3" class="readout-box">?</span>' +
    '<span id="respuesta4" class="readout-box">?</span>' +
    '<span id="respuesta5" class="readout-box">?</span>' +
    '<span id="respuesta6" class="readout-box">?</span>' +
    '<span id="respuesta7" class="readout-box">?</span>',
    // reto 2: 10 campos con guiones intermedios
    '<span id="respuesta1" class="readout-box">?</span>' +
    '<span id="respuesta2" class="readout-box">?</span>' +
    '<span id="respuesta3" class="readout-box">?</span>' +
    '<span id="respuesta4" class="readout-box">?</span>' +
    '<span id="respuesta5" class="readout-box">?</span>-'+
    '<span id="respuesta6" class="readout-box">?</span>' +
    '<span id="respuesta7" class="readout-box">?</span>-'+
    '<span id="respuesta8" class="readout-box">?</span>' +
    '<span id="respuesta9" class="readout-box">?</span>' +
    '<span id="respuesta10" class="readout-box">?</span>',
    // reto 3: 8 campos (con guiones en algunos lugares)
    '<span id="respuesta1" class="readout-box">?</span>' +
    '<span id="respuesta2" class="readout-box">?</span>-'+
    '<span id="respuesta3" class="readout-box">?</span>' +
    '<span id="respuesta4" class="readout-box">?</span>-'+
    '<span id="respuesta5" class="readout-box">?</span>' +
    '<span id="respuesta6" class="readout-box">?</span>' +
    '<span id="respuesta7" class="readout-box">?</span>' +
    '<span id="respuesta8" class="readout-box">?</span>',
    // reto 4: 4 campos
    '<span id="respuesta1" class="readout-box">?</span>' +
    '<span id="respuesta2" class="readout-box">?</span>' +
    '<span id="respuesta3" class="readout-box">?</span>' +
    '<span id="respuesta4" class="readout-box">?</span>',
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

3023// Instrucciones breves para cada reto (string array). Se mostrarán en
// el elemento con id="instrucciones" (insertado en el HTML) y sirven como
// pista o guía rápida para el jugador. Mantener el mismo orden que `msgRetos`.
var instruccionesRetos = [
    'Fai click no vídeo para reproducir e observa as pezas; tes que introducir o código de 4 díxitos.',
    'Segue a orde dos ingredientes e lembra os pasos; introduce os 7 díxitos correspondentes.',
    'Consulta o calendario ou o material provisto para completar a palabra de 10 caracteres.',
    'Introduce a data no formato DDMMYYYY para desbloquear o reto.',
    'Busca pola escena a peza indicada, trae a bandeira e introduce o código final de 4 díxitos.'
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
