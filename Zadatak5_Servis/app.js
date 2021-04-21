const express = require('express');
const proizvodiServis = require('proizvodi-modul');

app = express();

app.get('/sviProizvodi', (req, res) => {
    res.send(proizvodiServis.sviProizvodi());
})

app.get("/proizvodiIzKategorije", (req, res) => {
    res.send(proizvodiServis.proizvodiIzKategorije(request.query["kategorija"]))
})

app.post('/dodajProizvod', (req, res) => {
    proizvodiServis.dodajProizvod(req.body);
    res.end("OK");
})

app.delete('/obrisiProizvod/:id', (req, res) => {
    proizvodiServis.obrisiProizvod(req.params["id"]);
    res.end("OK");
});

app.post('/promeniProizvod', (req, res) => {
    proizvodiServis.izmeniProizvod({ "kategorija": req.query.kategorija, "cena": req.query.cena, "id": req.query.id });
    res.end("ok");
})

app.listen(3000, () => {
    console.log('Server radi na portu 3000');
})