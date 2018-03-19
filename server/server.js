require('babel-register');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const path =  require('path');

const app = new express();

mongoose.Promise = global.Promise;

const lanes = require('./routes/lane.routes.js');
const notes = require('./routes/note.routes.js');

mongoose.connect('mongodb://localhost:27017/kanban', (error) => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use('/api', lanes);
app.use('/api', notes);

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname+'../client/dist/index.html'));
});

module.exports = app;