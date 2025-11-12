# webQR — Descripción del proyecto

Resumen
-------
Este repositorio contiene una página web estática (HTML/CSS/JS) diseñada para mostrar una presentación audiovisual y páginas relacionadas con un QR final (`qrultimo.png` / `ultimo.html`). Es una página sencilla basada en Bootstrap con recursos multimedia (audio/video), scripts de control y soporte para MQTT (bibliotecas incluidas).

Estructura del proyecto
-----------------------
Raíz del proyecto (archivo principal):

- `index.html` — Página principal de la web (entrada).
- `ultimo.html` — Página final asociada al QR/resultado (probablemente muestra el contenido final o un mensaje).
- `qrultimo.png` — Imagen del QR final.
- `README.md` — (Este archivo) descripción, estructura y guía.

Directorios principales:

- `css/` — Hojas de estilo. Incluye Bootstrap (varias versiones/variantes) y `style.css` con estilos específicos del proyecto.
  - `style.css` — Estilos personalizados del proyecto.
- `js/` — Scripts JavaScript que controlan la lógica del sitio.
  - `presentacion.js` — Lógica de la presentación (reproducción de video, control de pasos, etc.).
  - `ultimo.js` — Lógica específica para `ultimo.html` (estado final, mostrar QR, etc.).
  - `variables.js` — Variables de configuración globales (rutas, textos, tiempos, etc.).
  - `mqtt.js`, `mqttws31.js` — Bibliotecas/soporte para comunicación MQTT vía WebSockets. Útil si el sitio se integra con un broker MQTT para control remoto o eventos en tiempo real.
  - `bootstrap*.js` — Archivos de Bootstrap para componentes JS.
- `images/` — Imágenes utilizadas en la web (íconos, fondos, pasos numerados: `0.png`, `1.png`, ...).
- `audios/` — Archivos de audio usados en la presentación (ej. `oceano.wav`).
- `videos/` — Videos para la presentación (ej. `presentacion.mp4`).

Funcionalidad principal
-----------------------
- Mostrar una interfaz responsiva usando Bootstrap.
- Reproducir elementos multimedia (video en `videos/`, audio en `audios/`).
- Control de la presentación mediante `presentacion.js` y configuración en `variables.js`.
- Página final (`ultimo.html`) que muestra el resultado final y/o el QR `qrultimo.png` (controlado por `ultimo.js`).
- Soporte opcional para comunicación en tiempo real mediante MQTT (si se enlaza a un broker y se configura correctamente).

Cómo ejecutar y probar localmente
--------------------------------
Al ser una página estática, se puede abrir directamente en el navegador o servir con un servidor HTTP simple (recomendado para evitar restricciones de CORS/medios):

Opciones rápidas:

1) Abrir directamente:
   - Hacer doble click en `index.html` o arrastrarlo al navegador. (Útil para pruebas rápidas; algunos navegadores limitan reproducción automática de audio/video o peticiones locales.)

2) Servidor HTTP con Python (recomendado para desarrollo simple):

```bash
# Desde la raíz del proyecto
python3 -m http.server 8000
# Luego abrir en el navegador: http://localhost:8000
```

3) Servir con Node.js (si tienes `npm`):

```bash
# Instala serve una sola vez (si no lo tienes)
npm install -g serve
# O usar npx sin instalar globalmente
npx serve .
# Abrir la URL indicada por serve (ej. http://localhost:3000)
```

Pruebas rápidas que puedes realizar
----------------------------------
- Abrir `index.html` y comprobar que el video `videos/presentacion.mp4` se reproduce (o que aparece el control para reproducir).
- Verificar que los estilos de `css/style.css` se aplican correctamente.
- Abrir `ultimo.html` y comprobar que muestra `qrultimo.png` y/o el contenido esperado.
- Si vas a usar MQTT: configurar un broker (p. ej. Mosquitto) y ajustar `variables.js` o el script correspondiente para apuntar al broker WebSocket; luego verificar la recepción de mensajes.

Archivos clave y su propósito
----------------------------
- `index.html` — Entrada principal; estructura del DOM, incluye CSS/JS.
- `ultimo.html` — Vista final que muestra el QR/resultado.
- `css/style.css` — Estilos adicionales y overrides.
- `js/variables.js` — Parámetros globales reutilizados por otros scripts (rutas, textos, tiempos, flags de configuración, etc.).
- `js/presentacion.js` — Controla la reproducción y la secuencia de la presentación. Aquí suele residir la mayor parte de la lógica de interacción.
- `js/ultimo.js` — Lógica específica para la página `ultimo.html` (carga de imagen QR, evento para volver, etc.).
- `js/mqttws31.js`, `js/mqtt.js` — Librerías o adaptadores para conectar por MQTT vía WebSocket.
- `audios/oceano.wav` y `videos/presentacion.mp4` — Recursos multimedia usados en la presentación.

Notas sobre compatibilidad y comportamiento
------------------------------------------
- Reproducción automática de audio/video puede bloquearse en algunos navegadores por políticas de reproducción automática. Si necesitas reproducción automática, considera pedir interacción del usuario (un botón "Comenzar") o configurar `muted`/`playsinline` en el elemento <video>.
- Si tu sitio depende de MQTT y WebSockets, asegúrate de servir la página por HTTP(S) y que el broker WebSocket acepte conexiones desde el origen (CORS/websocket config).
- Las versiones de Bootstrap incluidas sugieren que el proyecto usa la librería local; es importante mantener consistencia (usar las versiones de CSS y JS que correspondan).

Buenas prácticas y mejoras sugeridas (próximos pasos)
---------------------------------------------------
- Consolidar y limpiar los archivos de Bootstrap: mantener solo los necesarios para reducir tamaño.
- Añadir un pequeño script/build con `package.json` si se desea automatizar tareas (minificación, linting).
- Añadir tests estáticos o una checklist de QA para comprobar reproducción de multimedia, responsividad y compatibilidad MQTT.
- Documentar en `variables.js` las variables configurables (comentarios) para facilitar cambios sin romper la lógica.
- Añadir controles accesibles (a11y) en elementos multimedia (subtítulos, roles ARIA, etc.).

Contacto y licencias
--------------------
- Este README no incluye información de licencia; si deseas una licencia específica (MIT, GPL, etc.), indícalo y la añado.

Última nota
-----------
Si quieres que incluya además ejemplos de cambios (por ejemplo, cómo modificar `variables.js` para apuntar a otro broker MQTT, o un pequeño `package.json` para facilitar desarrollo con `serve` o `http-server`), dime qué prefieres y lo añado aquí.

