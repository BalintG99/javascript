const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function (req, res, next) {
	res.tpl = {};
	res.tpl.error = [];

	return next();
});

/**
 * Include all the routes
 */
require('./routing/cars')(app);
require('./routing/crew')(app);

/**
 * Standard error handler
 */
 
app.use(function (err, req, res, next) {
  res.status(500).send('Nem jo');

  //Flush out the stack to the console
  console.error(err.stack);
});

// próbaadatok beillesztése

const crewmemberModel = require('./models/crewmember');
const carModel = require('./models/car');

let mintaauto = new carModel();
mintaauto.tipus = "Ford Focus";
mintaauto.rendszam = "ABB-123";
mintaauto.ferohely = 5;
mintaauto.save((err) => {console.log(err)});

let mintaauto2 = new carModel();
mintaauto2.tipus = "Ford Mustang";
mintaauto2.rendszam = "ABC-123";
mintaauto2.ferohely = 2;
mintaauto2.save((err) => {console.log(err)});

let minta1 = new crewmemberModel();
minta1.nev = "Minta János";
minta1.beosztas = "Zabhegyező";
minta1._utasa = mintaauto._id;
minta1.save((err) => {console.log(err)});

let minta2 = new crewmemberModel();
minta2.nev = "John Sample";
minta2.beosztas = "Oat sharpener";
minta2._utasa = mintaauto._id;
minta2.save((err) => {console.log(err)});

let minta3 = new crewmemberModel();
minta3.nev = "Próba Pál";
minta3.beosztas = "Sofőr";
minta3.save((err) => {console.log(err)});

let minta4 = new crewmemberModel();
minta4.nev = "Példa Panna";
minta4.beosztas = "Fogvájó";
minta4.save((err) => {console.log(err)});

let minta5 = new crewmemberModel();
minta5.nev = "Teszt Tamás";
minta5.beosztas = "JavaScript tesztelő";
minta5.save((err) => {console.log(err)});

var server = app.listen(3000, function () {
	console.log("On :3000");
});