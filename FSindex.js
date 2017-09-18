'use strict'


//Mandamos a llamar a la libreri Express previamente inlcuida
const express = require('express');

//Agregamos la libreria Body Parser para utilizar los datos en un formato JSON
const bodyParser = require('body-parser');

//Agregamos la libreria mongoose
const mongoose = require('mongoose');

//Agregamos el esquema tipo JSON para la estructura de los datos que vamos a tomar. ./models/product.js
const Product = require('./models/schema.js');

//
mongoose.set('debug',true);

//CReamos un objeto tipo express para poder acceder a los metodos y funciones de la libreria Express
const app = express();

const port =  process.env.PORT || 3002;

//Condigurando la libreria body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//-------------------------GET para todos los datos-------------------------------------------------------
app.get('/app/productGem/',(req,res)=>{


	Product.find({},(err, product)=>{

			if(err) return res.status(500).send({message: `Error al realizar la peticion ${err}`});

			if(!product) return res.status(404).send({message: `No hay productos en la base de datos`});

			res.status(200).send({product});
	});
});


//-----------------------GET para solo un dato espesificado------------------------------------------------
app.get('/app/productGem/:productId',(req,res) =>{
	let productId = req.params.productId;

	Product.findById(productId,(err,product)=>{
			if (err) return res.status(500).send({message: `Error al realizar la peticiòn ${err}` });

			if(!product) return res.status(400).send({message: `El producto no existe`});

			res.send(200,{product});
	});
});



//---------------------------------POST---------------------------------------------------
app.post('/app/productGem',(req,res) =>{
	console.log(req.body)
	let product = new Product();

	product.name = req.body.name;
	product.price = req.body.price;
	product.description = req.body.description;
	product.images = req.body.images;
	product.stock = req.body.stock;
	product.discount = req.body.discount;
	product.review = req.body.review;

	

	product.save((err,productStored)=>{
		if (err) res.status(500).send({message: `Error al salvar el producto en la base de datos: ${err}`})

			res.status(200).send({product:productStored});
	});

	//res.send(200,{message: 'El producto se ha secivido'});
});


//----------------------------------------DELETE--------------------------------------------------

app.delete('/app/productGem/:productId',(req,res)=>{
		let pId = req.params.productId;

		console.log(`Id producto: ${pId}` );

		Product.findById(pId,(err,product)=>{
			if(err) res.status(500).send({message:`Error al borrar el producto ${err}`});

			product.remove(err=>{
				if(err) res.status(500).send({message:`Error al eliminar el producto ${err}`});
				res.status(200).send({message: `producto eliminado`});
		});
	});
});


//--------Conexion con la base de datos MongoDB a traves de Mongoose
//Name: Gemproducts

mongoose.connect('mongodb://localhost/GemProduct',(err,res)=>{

	if(err){
		return console.log(`Error al conectare con la base de dato: ${err}`);
	}
	console.log(`La conexion con la base de datos fue exitosa`);
	app.listen(port,()=>{
		console.log(`API Rest corriendo en localhost: ${port}`);
	});
});
