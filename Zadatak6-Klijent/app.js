const express = require("express");
const fs = require("fs");
const app = express();
const path = require('path');
const axios = require('axios');
const { response, query } = require("express");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let procitajPogledZaNaziv = (naziv) => {
    return fs.readFileSync(path.join(__dirname + "/view/" + naziv + ".html"), "utf-8")
}

app.get('/', (req, res) => {
    res.send(procitajPogledZaNaziv('index'));
})


app.get('/sviProizvodi', (req, res) => {

    axios.get('http://localhost:3000/sviProizvodi')
        .then(response => {
            let prikaz = "";
            response.data.forEach(element => {
                prikaz += `<tr>
                                <td>${element.kategorija}</td>
                                <td>${element.tekstOglasa}</td>
                                <td>${element.cena}</td>
                                <td><a href="/izmeni/${element.id}">Izmeni</a></td>
                                <td><a href="/obrisi/${element.id}">Obrisi</a></td>
                            </tr>`;
            });
            res.send(procitajPogledZaNaziv("sviProizvodi").replace("#{data}", prikaz));
        })
        .catch(error => {
            console.log(error);
        });

})

app.get('/dodajProizvodForma', (req, res) => {
    res.send(procitajPogledZaNaziv('dodajProizvodForma'));
})

app.post('/dodajProizvod', (req, res) => {
    axios.post("http://localhost:3000/dodajProizvod", {
        kategorija: req.body.kategorija,
        cena: req.body.cena,
        tekstOglasa: req.body.tekstOglasa
    })
        .then(
            res.redirect('/sviProizvodi')
        )
        .catch(err => {
            console.log(err);
        })
})

app.get('/obrisi/:id', (req, res) => {
    axios.delete('http://localhost:3000/obrisiProizvod/' + req.params['id'])
        .then(
            res.redirect('/sviProizvodi')
        )
        .catch(err => {
            console.log(err);
        })
})


app.get('/izmeni/:id', (req, res) => {
    let id = req.params['id'];
    axios.get('http://localhost:3000/sviProizvodi')
        .then(response => {
            let proizvod = response.data.filter(proizvod => proizvod.id == id)
            let prikaz = `<form action="/izmeni/${proizvod[0].id}" method="post">
                            <p>Kategorija:</p>
                            <input type="text" name="kategorija" value="${proizvod[0].kategorija}">
                            <br>
                            <p>Cena:</p>
                            <input type="number" name="cena" value="${proizvod[0].cena}">
                            <br>
                            <p>Tekst Oglasa:</p>
                            <input type="text" name="tekstOglasa" value="${proizvod[0].tekstOglasa}">
                            <br>
                            <button type="submit">Izmeni Proizvod</button>
                        </form>`
            res.send(procitajPogledZaNaziv("izmeniProizvodForma").replace("${data}", prikaz));
        })
        .catch(error => {
            console.log(error);
        });
})


app.post('/izmeni/:id', (req, res) => {
    axios.post('http://localhost:3000/izmeniProizvod', {
        id: parseInt(req.params['id']),
        kategorija: req.body.kategorija,
        cena: req.body.cena,
        tekstOglasa: req.body.tekstOglasa
    })
        .then(
            res.redirect('/sviProizvodi')
        )
        .catch(err => {
            console.log(err);
        })
})


app.listen(5000, () => {
    console.log('klijent na portu 5000');
});
