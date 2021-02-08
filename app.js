const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const mongoose = require('mongoose');   

mongoose.connect('mongodb://localhost:27017/gestionDesEleves',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
    
  const eleveRoutes = require('./routes/eleve');
  const classeRoutes = require('./routes/classe');
  
  app.use(bodyParser.json());
  app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
  });

  app.use('/api/eleves', eleveRoutes);
  app.use('/api/classes', classeRoutes);


  module.exports = app;