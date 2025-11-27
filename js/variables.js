// ----------------------------------
// Definiciones globales utilizadas por presentacion.js y ultimo.js
// Comentado y adaptado para no depender de Font Awesome ni clases no definidas
// ----------------------------------

// `videos` contiene las rutas relativas a los archivos de video para cada reto.
// El índice del array coincide con `retoActual` (0-based).
var videos = ['videos/repair.mp4', 'videos/ing.mp4', 'videos/soci.mp4'];

// ------------------------------------------------------------------
// Botonera: HTML de los botones reutilizables. Antes usaba clase `btn-neon` y
// Font Awesome; ahora usamos clases de Bootstrap (btn btn-outline-light) y
// texto/emoji para los iconos para evitar dependencias externas.
// ------------------------------------------------------------------

// Generador simple de botones numéricos (0-9) como string HTML.
function generarBotonesNumeros(btnClass = 'btn btn-outline-light btn-sm') {
    var out = '';
    for (var i = 0; i <= 9; i++) {
        out += '<button type="button" class="' + btnClass + ' mx-1" id="num' + i + '" value="' + i + '" onclick="darNumero(\'' + i + '\')">' + i + '</button>';
    }
    return out;
}

var botonesNumeros = generarBotonesNumeros();

// `botonera` es un array con la HTML de los botones para cada reto. Cada entrada
// corresponde a un reto en el mismo orden que `videos`, `msgRetos`, etc.
var botonera = [
    botonesNumeros, // reto 0 usa 0-9
    // reto 2 usa botones con caracteres (alfanuméricos personalizados)
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'I\')">I</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'P\')">P</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'O\')">O</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'A\')">A</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'U\')">U</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'C\')">C</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'D\')">D</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'W\')">W</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'R\')">R</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'Z\')">Z</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'L\')">L</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'T\')">T</button>' +
    '<button type="button" class="btn btn-outline-light btn-sm mx-1" onclick="darNumero(\'R\')">R</button>',
    botonesNumeros, // reto 1 usa 0-9
];

// `botoneraRespuesta` define la estructura visual de los campos de respuesta
// Antes usaba iconos Font Awesome; ahora se usa un símbolo de interrogación simple
// o un guion para separadores. Cada entrada corresponde a un reto.
var botoneraRespuesta = [
    // reto 0: 3 campos
    '<span id="respuesta1" class="readout-box">?</span>' +
    '<span id="respuesta2" class="readout-box">?</span>' +
    '<span id="respuesta3" class="readout-box">?</span>',
    // reto 2: 10 campos con guiones intermedios
    '<span id="respuesta1" class="readout-box">?</span>' +
    '<span id="respuesta2" class="readout-box">?</span>' +
    '<span id="respuesta3" class="readout-box">?</span>' +
    '<span id="respuesta4" class="readout-box">?</span>' +
    '<span id="respuesta5" class="readout-box">?</span>' +
    '<span id="respuesta6" class="readout-box">?</span>' +
    '<span id="respuesta7" class="readout-box">?</span>' +
    '<span id="respuesta8" class="readout-box">?</span>',
    // reto 1: 3 campos 
    '<span id="respuesta1" class="readout-box">?</span>' +
    '<span id="respuesta2" class="readout-box">?</span>' +
    '<span id="respuesta3" class="readout-box">?</span>',
    // reto final
    '<span>.</span>'

];

// Mensajes descriptivos para cada reto. Se usan en #msg.
var msgRetos = [
    'Nota da IA: Só os colonos con permiso poderan viaxar a GAIA-1 ',



    'Nota da IA: "Permiso concedido. Prioridade GUSTOS: Usuario cinta azul coa maior idade do seu equipo, obtén permiso.<br>' +
    'As cintas fucsias non serven para o novo planeta"',

    'Nota da IA: Alerta. Detección de colonos rebeldes.',

    'Nota da IA: "Permiso concedido. Tedes que agachárvos e gatear para atopalo.<br>' +
    'Prioridade XÉNERO: Este permiso é para a humana de xénero feminino coa menor idade do seu equipo.<br>' +
    'O xénero masculino é prescindible no novo planeta."',

];

// Mensajes descitivos para la entrada de codigo se usa en #entrada
var msgEntrada = [
    'Introduce Code Separate ',
    'Introduce Code Person ',
    'Introduce Code Different ',
    'Non hai sitio en GAIA-1'
];

// Instrucciones breves para cada reto (string array). Se mostrarán en
// el elemento con id="instrucciones" (insertado en el HTML) y sirven como
// pista o guía rápida para el jugador. Mantener el mismo orden que `msgRetos`.
var instruccionesRetos = [
    'Instruccións: Tedes que descubrir a combinación de números do primeiro cadeado. O xénero feminino só pode tocar o libro. O xénero masculino só pode tocar o contido do sobre. Entre os dous, adiviñar o código.',

    'Instruccións: Hai tres palabras nunha encrucillado. Tedes as definicións para poder adiviñalas.<br>' +
    'Isto é "CLAVE" para o cifrado "VIGENERE" e para obter a persoa que agocha o permiso<br>' +
    'EASGIBXA',

    'Instruccións: Só as cintas fucsias poden manipular a cana de pescar, cos ollos vendados.' +
    'Só as cintas azuis poden guiar sen tocar o frasco, nin a cana de pescar, nin a persoa.' +
    'Tedés que pescar o papel diferente entre todos os papeis de cores.',

];

// Respuestas correctas (string). El índice se corresponde con el reto.
var respuestasCorrectas = [
    '891',
    'PATRICIA',
    '968'
];

// Número de caracteres esperados por reto (usado para comprobar longitud en darNumero)
var caracteresRespuesta = [3, 8, 3];


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
