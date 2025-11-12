README — js/presentacion.js

Resumen
-------
Este documento explica para qué sirve el fichero `js/presentacion.js`, cómo interactúa con el resto de la aplicación y describe las variables y funciones principales (con ejemplos de uso y notas de depuración).

Propósito del script
--------------------
`presentacion.js` controla la lógica de una "presentación interactiva" basada en retos numerados. Maneja:
- La reproducción del video asociado a cada reto.
- La interfaz de respuesta numérica (una botonera para introducir dígitos).
- La validación de respuestas contra una lista de respuestas correctas.
- La transición entre retos y la visualización de modales para aciertos/errores.

Dependencias / archivos relacionados
-----------------------------------
- `js/variables.js` — Contiene arrays y variables globales que `presentacion.js` usa: `videos`, `msgRetos`, `botonera`, `botoneraRespuesta`, `caracteresRespuesta`, `respuestasCorrectas`, etc.
- `index.html` — Contiene los elementos DOM referenciados: `#my-video`, `#msg`, `#botonera`, `#botonerarespuesta`, `#labelRespuesta`, `#retoX`, y modales `#feito` y `#nonfeito`.
- jQuery — Se usa `$(document).ready(...)` y selectores como `$('#id')`.
- Font Awesome — Para iconos (`fa-question`, `fa-skull-crossbones`).

Variables globales clave
------------------------
- `_respuesta` (string): almacena la secuencia de números que el usuario ha ingresado para el reto actual.
- `_contador` (int): número de dígitos introducidos hasta ahora para el reto actual.
- `retoActual` (int): índice del reto actual (0-based).
- `checkReto` (string HTML): icono que se coloca cuando un reto ha sido superado.
- `myVideo` (HTMLVideoElement): referencia al elemento de video con id `my-video`.

Funciones principales
---------------------
1) darNumero(numero)
- Propósito: añadir un dígito a la respuesta del usuario, actualizar la UI y comprobar si la respuesta completa es correcta.
- Entrada: `numero` (string o número). Se concatena a `_respuesta`.
- Efectos secundarios:
  - Actualiza el contenido del elemento `#respuesta{n}` para mostrar el dígito introducido.
  - Si se alcanza la longitud esperada (`caracteresRespuesta[retoActual]`) y la respuesta coincide con `respuestasCorrectas[retoActual]`:
    - Muestra el modal `#feito` (acierto).
    - Marca el reto con `checkReto` en el elemento `#reto{retoActual}`.
    - Incrementa `retoActual` y llama a `actualizar(retoActual)` para cargar el siguiente reto.
    - Resetea `_contador` y `_respuesta`.
  - Si la longitud esperada se alcanza pero la respuesta es incorrecta:
    - Muestra el modal `#nonfeito` (fallo).
    - Resetea `_contador` y `_respuesta`.
    - Rellena visualmente los campos de respuesta con iconos `?`.

2) actualizar(reto)
- Propósito: actualizar la vista para mostrar el reto `reto` (video, mensaje, botoneras y campos de respuesta).
- Entrada: `reto` (int) — índice del reto a mostrar.
- Efectos secundarios:
  - Cambia `myVideo.src` al archivo indicado por `videos[reto]` y el `poster` a `images/{retoActual}.png`.
  - Si `retoActual` es el último reto (en este proyecto se comprueba `== 4`), oculta la sección de respuesta (`#labelRespuesta`) y la botonera (`#botonera`), ya que la pantalla final es `ultimo.html`.
  - Escribe el texto del reto en `#msg`.
  - Inserta la HTML de botones correspondiente en `#botonera` y `#botonerarespuesta`.

Cómo probar localmente
----------------------
1) Asegúrate de servir la carpeta con HTTP (por ejemplo `python3 -m http.server 8000`) para evitar problemas de rutas o permisos con media.
2) Abre `index.html` y verifica que:
   - El video que aparece corresponde al contenido de `videos[0]` (o al índice de `retoActual`).
   - Al pulsar los botones numéricos, los elementos `#respuesta1`, `#respuesta2`, ... se actualizan.
   - Cuando introduces la secuencia correcta, el modal `#feito` aparece y se avanza al siguiente reto.
   - Si la secuencia es incorrecta, aparece el modal `#nonfeito` y los campos se reinician.

Notas y mejoras recomendadas
---------------------------
- Añadir comprobaciones defensivas en el código para que no falle si falta una variable global (por ejemplo: verificar que `videos[reto]` exista).
- Documentar las variables en `variables.js` para facilitar edición de retos.
- Evitar dependencias innecesarias duplicadas de Bootstrap/jQuery (mantener versiones coherentes).

Ejemplos de configuración (variables.js)
----------------------------------------
A continuación hay ejemplos prácticos de cómo definir/añadir retos en `js/variables.js`.

1) Ejemplo mínimo: añadir un nuevo reto (índice N = 5)

- Añadir el video:

```
videos.push('videos/nuevo.mp4');
```

- Añadir la botonera (usar `botonesNumeros` si quieres solo dígitos, o HTML personalizado):

```
botonera.push(botonesNumeros);
// o botonera.push('<button onclick="darNumero(\'A\')">A</button>...');
```

- Añadir la representación visual de los campos de respuesta (asegúrate de que el número de spans coincide con `caracteresRespuesta`):

```
botoneraRespuesta.push('<span id="respuesta1">?</span><span id="respuesta2">?</span>');
```

- Añadir el texto descriptivo del reto y la respuesta correcta:

```
msgRetos.push('Introduce el código de acceso:');
respuestasCorrectas.push('42');
caracteresRespuesta.push(2);
```

2) Ejemplo: botonera con caracteres (letras)

Si quieres botones que introduzcan letras (no solo dígitos), crea HTML donde cada botón llama a `darNumero('\'X\'')` con la letra correcta, y asegúrate de que la `respuestasCorrectas` almacene la cadena correspondiente (ej. "Abc").

Ejemplo breve:

```
// botonera personalizada para un reto
var botoneraLetras = '<button onclick="darNumero(\'A\')">A</button>' +
                    '<button onclick="darNumero(\'B\')">B</button>' +
                    '<button onclick="darNumero(\'C\')">C</button>';
botonera.push(botoneraLetras);
botoneraRespuesta.push('<span id="respuesta1">?</span><span id="respuesta2">?</span><span id="respuesta3">?</span>');
respuestasCorrectas.push('ABC');
caracteresRespuesta.push(3);
```

3) Nota sobre `botoneraRespuesta` y longitud

Asegúrate de que el número de elementos visuales (spans con ids `respuesta1`... ) coincida con `caracteresRespuesta` para que `presentacion.js` y `ultimo.js` encuentren y actualicen los elementos correctamente.

4) Nota sobre `ultimo.js` y MQTT

- `js/ultimo.js` muestra en la página final una lógica que envía comandos MQTT (`Messaging.Message` y `client.send`) cuando se acierta la última respuesta.
- Esa lógica requiere que tengas una conexión MQTT establecida (variable global `client`) y la librería Messaging cargada (`mqttws31.js` / `mqtt.js`).
- La implementación actual usa una función `sleep` bloqueante para espaciar mensajes; esto detiene la UI. Si lo deseas, puedo convertir esa secuencia a una versión asíncrona no bloqueante usando `setTimeout` o Promises.

¿Quieres que aplique la conversión a async (recomendado) y que añada un ejemplo de inicialización del `client` MQTT en `variables.js` o en otro archivo de configuración? Si es así, lo implemento y pruebo localmente.
