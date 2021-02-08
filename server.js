// modules 
// comment commecne
/*
const express = require('express');

const bodyParser = require('body-parser');
const app = express();

//  create application /jsonParser 
const jsonParser = bodyParser.json();
//configurer le port 
const port = 3000;

// configuration 

//config fichiers 
//var db = require('./config/db');
const mongoose  = require('mongoose');
//const { url } = require('./config/db');
//const eleve = require('./models/eleve');
//console.log("connecting--",db);
//mongoose.connect(db,url); // mongoose connexion  a été crée  

//établir la conexion a la base de données
mongoose.connect('mongodb://localhost:27017/gestionDesEleves', {useNewUrlParser: true, useUnifiedTopology: true});
//tester la connexion 
const testConn = mongoose.connection;
testConn.on('error', console.error.bind(console, 'connection error:'));
testConn.once('open', function() {
        console.log("nous sommes connextées");
});

// déclarer la schema eleve 
const { Schema } = mongoose;

const EleveSvhema = new Schema({
    nom:String,
    prenom:String,
    dateNaissance:Date,
    moyen:Number
})

const Eleve = mongoose.model('Eleve', EleveSvhema);



var urlencodedParser = bodyParser.urlencoded({ extended: true });
   //db.eleves.insertOne({nom:'dddd',prenom:'ddddddd',dateDeNaissance:'01/01/1999',moyen:'44.55'});
  
app.get('/',urlencodedParser,(req,res)=>{
 
        // use mongoose to get all students in the database
        Eleve.find(function(err, eleves) {
           // if there is an error retrieving, send the error.
           // nothing after res.send(err) will execute
           if (err){
              res.send(err);
            }
           res.json(eleves); // return all students in JSON format
        //   res.send("bienvenu sur le site de gestion des elèves ")
        });
        });
 
   

// définir les routes 
//page d'accueil
app.get('/accueil', (req,res)=>{
    res.send('bien venu sur la page d\'accueil ');
});

//insérer un elève 
/*
app.get('/eleves/ajouter',(req,res)=>{
    var eleve = require('./models/eleve');
     eleve = new Eleve({
        nom:'dddd',prenom:'ddddddd',dateDeNaissance:'01/01/1999',moyen:'44.55'});
        eleve.save((err)=>{
            if(err){ res.send(err);}
            res.send("votre elève a bien été jouté");
        });
     
    
    });



*/
    
       //import mongoose from 'mongoose';
       //const mongoose = require('mongoose');
      
      // comment commence
      /*
            app.post('/eleve/ajouter', urlencodedParser,function (req, res) {
                
                 eleve1 = new Eleve({nom:'fffff',prenom:'fffff',dateNaissance:'1987-10-04',moyen:88}); // create a new instance of the student model
               // eleve1.nom = req.body.nom; // set the student name (comes from the request)
                eleve1.save(function(err) {
                if (err)
                    res.send(err);
                    res.json({ message: 'eleve a été crée !' });
                });
            });

            /* comment termine 
//simple reoute de API 
//var Eleve = require('./models/eleve');
//app.get(/api/eleves);

// lancer l'application sur http\\:localhost:3000
app.listen(port , ()=>{console.log(`l\'application  ecoute au port ${port}` )});

// solution :

/**
 * importer la librairie http 
 */
const http = require('http');
/**
 * importer l'application express 
 */
const app = require('./app');
/**
 * configurer la porte sue laquelle l'application express écoute
 */ 
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
