'use strict'
const mongoskin = require('mongoskin');
const express = require('express');

const app = express();

const port = process.env.PORT || 8888;

var db = mongoskin.db("mongodb://@localhost:27017/ApiRest");
var id = mongoskin.helper.toObjectID;

app.param("coleccion", (req, res, next, coleccion) =>{
	console.log('PARAM /api/:coleccion');
	console.log(coleccion);
	
	req.collection = db.collection(coleccion);
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.post('/api/:coleccion', (req, res, next) ={
		console.log('POST /api/:coleccion';)
		console.log(req.body);
		
		req.colecction.insert(req.body, {}, (err, coleccionGuardada) =>{
			if(err) return next(err);
			res.status(200).send({coleccion: coleccionGuardada });
		});
});
app.get('/api/:coleccion', (req, res, next) =>{
	req.colecction.find({},{limit: 10, sort: [['_id', -1]]}.toArray((err, coleccion) => {)
			if(err) return next (err);
			res.status(200).send({"nombre coleccion": `${req.params.coleccion}`, coleccion )
			}));
});
app.get('/hola/:nombre', (req, res) =>{
		res.status(200).send({ mensaje: `Hola a ${req.params.nombre} todos desde S!`});
})


app.listen(8888, () => {
	console.log(`API REST ejecutandose en http://localhost:${port}`);
});