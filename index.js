// Importar el módulo http
var http = require("http");

// Crear el servidor
var server = http.createServer();

// SERVICIO WEB
function mensaje(req, resp) {
    if (req.url == '/JSONArray') { 
    resp.writeHead(200, { 'Content-Type': 'application/json' });

    // Crear un JSON Array estático
    var usuarios = [
        { "id": 1, "nombre": "Kevin Teran", "correo": "steveenteran@gmail.com" },
        { "id": 2, "nombre": "Ana Gómez", "correo": "ana@gmail.com" },
        { "id": 3, "nombre": "Emily Anrango", "correo": "anrangoE@hotmail.com" }
    ];

    // Convertir el arreglo a JSON y enviarlo como respuesta
    resp.write(JSON.stringify(usuarios));
    resp.end();
    } else {
        resp.writeHead(404, { 'Content-Type': 'text/plain' });
        resp.write('Pagina no encontrada.');
    }
    resp.end();
}

// Configurar el evento de solicitud del servidor
server.on('request', mensaje);

// Escuchar en el puerto 3000
server.listen(3000, function () {
    console.log('La solicitud fue realizada mediante el puerto 3000, Bien hecho Kevin Teran');
});
