/*var http = require("http");
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
            resp.write(JSON.stringify({ error: "Por favor, proporciona un valor numérico para 'diametro'" }));
            resp.end();
            return;
        }

        const radio = diametro / 2;
        area = Math.PI * radio * radio;
        perimetro = 2 * Math.PI * radio;
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.write(JSON.stringify({
            Figura: "CIRCULO",
            Radio: radio.toFixed(2),
            Area: area.toFixed(2),
            Perimetro: perimetro.toFixed(2)
        }));
        resp.end();
    } else if (pathname == '/Rectangulo') {
        const lado1 = parseFloat(query.lado1);
        const lado2 = parseFloat(query.lado2);
        if (isNaN(lado1) || isNaN(lado2)) {
            resp.writeHead(400, { 'Content-Type': 'application/json' });
            resp.write(JSON.stringify({ error: "Por favor, proporciona valores numéricos para 'lado1' y 'lado2'" }));
            resp.end();
            return;
        }

        perimetro = 2 * (lado1 + lado2);
        area = lado1 * lado2;
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.write(JSON.stringify({
            Figura: "RECTANGULO",
            Perimetro: perimetro.toFixed(2),
            Area: area.toFixed(2)
        }));
        resp.end();
    } else if (pathname == '/Triangulo') {
        const l1 = parseFloat(query.l1); 
        const l2 = parseFloat(query.l2); 
        if (isNaN(l1) || isNaN(l2)) {
            resp.writeHead(400, { 'Content-Type': 'application/json' });
            resp.write(JSON.stringify({ error: "Por favor, proporciona valores numéricos para 'La base' y 'la altura'" }));
            resp.end()
            return;
        }

        const hipotenusa = Math.sqrt(Math.pow(l1, 2) + Math.pow(l2, 2));
        perimetro = l1 + l2 + hipotenusa;
        area = (l1 * l2) / 2;
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.write(JSON.stringify({
            Figura: "TRIANGULO",
            Hipotenusa: hipotenusa.toFixed(2),
            Perimetro: perimetro.toFixed(2),
            Area: area.toFixed(2)
        }));
        resp.end();
    }else if(pathname == '/TrinomioCuadradoPerfecto'){
        const a = 
    } 
    else {
        resp.writeHead(404, { 'Content-Type': 'application/json' });
        resp.write(JSON.stringify({ error: "Ruta no encontrada" }));
        resp.end();
    }
}

server.on('request', AreaPerim);

server.listen(3000, function () {
    console.log('Servidor ejecutándose en http://localhost:3000');
});*/

const express = require("express");
const app = express();

// Ruta para resolver y factorizar un trinomio cuadrado perfecto
app.get("/TrinomioCuadradoPerfecto", (req, res) => {
    const a = parseFloat(req.query.a); // Coeficiente de x^2
    const b = parseFloat(req.query.b); // Coeficiente de x
    const c = parseFloat(req.query.c); // Término independiente

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        return res.status(400).json({ 
            error: "Por favor, proporciona valores numéricos para 'a', 'b' y 'c'" 
        });
    }

    const raizA = Math.sqrt(a);
    const raizC = Math.sqrt(c);
    const esCuadradoPerfecto = raizA % 1 === 0 && raizC % 1 === 0 && b === 2 * raizA * raizC;

    if (!esCuadradoPerfecto) {
        return res.status(400).json({ 
            error: "El trinomio no es un cuadrado perfecto",
            ecuacion: `${a}x^2 + ${b}x + ${c}`
        });
    }

    const factor = `(${raizA}x + ${raizC})^2`;
    res.json({
        ecuacion: `${a}x^2 + ${b}x + ${c}`,
        factorizacion: factor
    });
});

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
