const fs = require('fs');
const PATH = "proizvodi.json";

let procitajPodatkeIzFajla = () => {
    let proizvodi = fs.readFileSync(PATH, (err, data) => {
        if (err) throw err;
        return data;
    });
    return JSON.parse(proizvodi);
}

let snimiProizvode = (data) => {
    fs.writeFileSync(PATH, JSON.stringify(data));
}

exports.sviProizvodi = () => {
    return procitajPodatkeIzFajla();
}
exports.dodajProizvod = (novProizvod) => {
    id = 1;
    let proizvodi = this.sviProizvodi();
    if (proizvodi.length > 0) {
        id = proizvodi[proizvodi.length - 1].id + 1;
    }
    novProizvod.id = id;
    proizvodi.push(novProizvod)
    snimiProizvode(proizvodi);
}
// exports.getKnjiga = (id) => {
//     return this.sveKnjige().find(x => x.id == id);
// }
// exports.postaviAutora = (naziv, autor) => {
//     let knjige = this.sveKnjige().filter(knjiga => knjiga.naziv == naziv);
//     knjige.forEach(element => {
//         element.autor = autor;
//     });
//     snimiKnjige(knjige);
// }
exports.obrisiProizvod = (id) => {
    snimiProizvode(this.sviProizvodi().filter(proizvod => proizvod.id != id));
}

exports.proizvodiIzKategorije = (kategorija) => {
    return this.sviProizvodi().filter(proizvod => proizvod.kategorija == kategorija);
}

exports.izmeniProizvod = (proizvod1) => {
    proizvodi = this.sviProizvodi();
    proizvodi.forEach(proizvod => {
        if (proizvod.id == proizvod1.id) {
            proizvod.kategorija = proizvod1.kategorija
            proizvod.cena = proizvod1.cena;
        }
    });
    snimiProizvode(proizvodi);
}