var http = require("http");
var url = require("url");

var server = http.createServer();

function AreaPerim(req, resp) {
    let query = url.parse(req.url, true).query; 
    let pathname = url.parse(req.url, true).pathname;

    let perimetro = 0.0;
    let area = 0.0;

    if (pathname == '/Circulo') {
        const diametro = parseFloat(query.diametro);
        if (isNaN(diametro)) {
            resp.writeHead(400, { 'Content-Type': 'application/json' });
            resp.end(JSON.stringify({ error: "Por favor, proporciona un valor numérico para 'diametro'" }));
            return;
        }

        const radio = diametro / 2;
        area = Math.PI * radio * radio;
        perimetro = 2 * Math.PI * radio;
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.end(JSON.stringify({
            Figura: "CIRCULO",
            Radio: radio.toFixed(2),
            Area: area.toFixed(2),
            Perimetro: perimetro.toFixed(2)
        }));
    } else if (pathname == '/Rectangulo') {
        const lado1 = parseFloat(query.lado1);
        const lado2 = parseFloat(query.lado2);
        if (isNaN(lado1) || isNaN(lado2)) {
            resp.writeHead(400, { 'Content-Type': 'application/json' });
            resp.end(JSON.stringify({ error: "Por favor, proporciona valores numéricos para 'lado1' y 'lado2'" }));
            return;
        }

        perimetro = 2 * (lado1 + lado2);
        area = lado1 * lado2;
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.end(JSON.stringify({
            Figura: "RECTANGULO",
            Perimetro: perimetro.toFixed(2),
            Area: area.toFixed(2)
        }));
    } else if (pathname == '/Triangulo') {
        const l1 = parseFloat(query.l1); 
        const l2 = parseFloat(query.l2); 
        if (isNaN(l1) || isNaN(l2)) {
            resp.writeHead(400, { 'Content-Type': 'application/json' });
            resp.end(JSON.stringify({ error: "Por favor, proporciona valores numéricos para 'l1' y 'l2'" }));
            return;
        }

        const hipotenusa = Math.sqrt(Math.pow(l1, 2) + Math.pow(l2, 2));
        perimetro = l1 + l2 + hipotenusa;
        area = (l1 * l2) / 2;
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.end(JSON.stringify({
            Figura: "TRIANGULO",
            Hipotenusa: hipotenusa.toFixed(2),
            Perimetro: perimetro.toFixed(2),
            Area: area.toFixed(2)
        }));
    } else {
        resp.writeHead(404, { 'Content-Type': 'application/json' });
        resp.end(JSON.stringify({ error: "Ruta no encontrada" }));
    }
}

server.on('request', AreaPerim);

server.listen(3000, function () {
    console.log('Servidor ejecutándose en http://localhost:3000');
});