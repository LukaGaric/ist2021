const express = require('express');
const proizvodiServis = require('proizvodi-modul');

app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/sviProizvodi', (req, res) => {
    res.send(proizvodiServis.sviProizvodi());
})

app.post('/dodajProizvod', (req, res) => {
    proizvodiServis.dodajProizvod(req.body);
    res.end("OK");
})

app.delete('/obrisiProizvod/:id', (req, res) => {
    proizvodiServis.obrisiProizvod(req.params["id"]);
    res.end("OK");
});

app.post('/izmeniProizvod', (req, res) => {
    proizvodiServis.izmeniProizvod(req.body);
    res.end("ok");
})

app.post('/filtriraj', (req, res) => {
    res.send(proizvodiServis.filtriraj(req.body.kategorija));
})

app.listen(3000, () => {
    console.log('Server radi na portu 3000');
})