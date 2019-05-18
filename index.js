const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(server);
const crypto = require('crypto');

app.use(bodyParser.json());

const Checkers = require( './server/Checkers');

const games = {};

io.on('connection', socket => {

  socket.on('getField', room => {

    if (io.sockets.adapter.rooms[room]) {

      socket.join(room);

      if (games[room].user2 === null) games[room].user2 = socket.id;

      return socket.emit('setField', {user: 2, field: games[room].field});

    } else {

      const checkers = new Checkers();
      const id = crypto.randomBytes(20).toString('hex');

      checkers.field.gameID = id;
      checkers.user1 = socket.id;
      games[id] = checkers;
      socket.join(id);

      return socket.emit('setField', {user: 1, field: checkers.field});

    }


  });

  socket.on('handleDrop', data => {

    const move = data[0];
    const gameID = data[2];
    const userID = socket.id;

    games[gameID].handleMove(move, userID, function() {
      return io.sockets.to(gameID).emit('processedDrop', {user: 0, field: games[gameID].field});
    });

  })

});

server.listen(3001, console.log('Сервер работает на порту 3001'));