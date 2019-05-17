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
      console.log('user2 connected to room:', room);

      if (games[room].user2 === null) games[room].user2 = socket.id;

      return socket.emit('setField', games[room].field);

    } else {

      const checkers = new Checkers();
      const id = crypto.randomBytes(20).toString('hex');

      checkers.field.gameID = id;
      checkers.user1 = socket.id;
      console.log('user1 connected to room:', checkers.field.gameID);
      games[id] = checkers;
      socket.join(id);

      return socket.emit('setField', checkers.field);

    }


  });

  socket.on('handleDrop', data => {

    const move = data[0];
    const gameID = data[2];
    const userID = socket.id;

    games[gameID].handleMove(move, userID, function() {
      return io.sockets.to(gameID).emit('processedDrop', games[gameID].field);
    });

  })

});

server.listen(3001, console.log('Сервер работает на порту 3001'));