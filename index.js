const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Checkers = require( './server/Checkers');

const games = [];

app.get('/api/getField', (req, res) => {
  const checkers = new Checkers();
  games.push(checkers);
  res.set('Content-Type', 'application/json; charset: utf-8');
  res.end(JSON.stringify(checkers.field));
});

app.post('/api/handleDrop', (req, res) => {

  games[req.body[2]].handleMove(req.body[0], function() {
    res.end(JSON.stringify(games[req.body[2]].field));
  });

});

app.listen(3001, console.log('Сервер работает на порту 3001'));