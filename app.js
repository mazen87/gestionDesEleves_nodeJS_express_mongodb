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
  const devoirRoutes = require('./routes/devoir');
  const usereRoutes = require('./routes/user');
  const eleveDevoirRoutes = require('./routes/eleveDevoir');
  
  app.use(bodyParser.json());
  app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
  });

  app.use('/api/eleves', eleveRoutes);
  app.use('/api/classes', classeRoutes);
  app.use('/api/devoirs', devoirRoutes);
  app.use('/api/elevesDevoirs', eleveDevoirRoutes);
  app.use('/api/auth', usereRoutes);


  module.exports = app;