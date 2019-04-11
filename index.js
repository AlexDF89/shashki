const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const games = [];
let idOfLastGame = -1;

class Shashki {
  constructor() {
    this.field = {};
    this.field.whoseMove = 1; // 1 - белые, 2 - черные

    this.field.gameID = ++idOfLastGame;

    this.ways = {
      GoldWay:       ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'],
      DoubleWayG1A7: ['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7'],
      DoubleWayH2B8: ['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8'],
      TripleWayC1A3: ['c1', 'b2', 'a3'],
      TripleWayC1H6: ['c1', 'd2', 'e3', 'f4', 'g5', 'h6'],
      TripleWayH6F8: ['h6', 'g7', 'f8'],
      TripleWayA3F8: ['a3', 'b4', 'c5', 'd6', 'e7', 'f8'],
      UltraWayA5D8:  ['a5', 'b6', 'c7', 'd8'],
      SimpleWayA7B8: ['a7', 'b8'],
      UltraWayH4D8:  ['h4', 'g5', 'f6', 'e7', 'd8'],
      UltraWayE1A5:  ['e1', 'd2', 'c3', 'b4', 'a5'],
      UltraWayE1H4:  ['e1', 'f2', 'g3', 'h4'],
      SimpleWayG1H2: ['g1', 'h2']
    }

    this.createField();
    this.checkMoves();
  }

  createField() {
    for (let i = 0; i < 8; i++) {
      let row;
      switch(i) {
        case 0:
          row = 'a';
          break;
          
        case 1:
          row = 'b';
          break;
        
        case 2:
          row = 'c';
          break;
          
        case 3:
          row = 'd';
          break;
        
        case 4:
          row = 'e';
          break;
          
        case 5:
          row = 'f';
          break;
        
        case 6:
          row = 'g';
          break;
          
        case 7:
          row = 'h';
          break;
        
        default:
          break;
        
      }
      let j = (i % 2) ? 2 : 1;
      this.field.chops = false; // есть ли срубы у текущего игрока
      this.field.moves = [];

      for (; j <= 8; j += 2) {

        const cell = {};

        cell.coordinate = row + j;

        let checker;
        (j <= 3) ? checker = 1 : (j >= 6) ? checker = 2 : checker = 0; //0 - пустое, 1 - белая шашка, 2 - черная шашка
        cell.checker = checker;

        cell.queen = false;

        this.field[cell.coordinate] = cell;
      }
    }
  }

  checkChops() {

    for (const way in this.ways) {
        const length = this.ways[way].length;

        for (let i = 0; i < length; i++) {
          this.checkChopsOfSingleWay(this.ways[way], i);
        }

    }

  }

  checkAdditionalChops(checker) {

    for (const way in this.ways) {
      this.ways[way].forEach((square, i) => {

        if (square === checker) {
          this.checkChopsOfSingleWay(this.ways[way], i);
        }
      });

    }

  }

  checkChopsOfSingleWay(way, i) {

      // Проверка срубов для первого игрока в одну и другую сторону
    if (this.field.whoseMove === 1) {

      // if (если первое поле существует && если первое поле занято белой шашкой && если первое поле не занято дамкой && второе поле существует && второе поле занято черной шашкой && третее поле существует && третее поле пустое )  {то белая шашка может рубить}
      if (this.field[way[i]] && (this.field[way[i]].checker === 1) && (this.field[way[i]].queen === false) && this.field[way[i + 1]] && (this.field[way[i + 1]].checker === 2) && this.field[way[i + 2]] && (this.field[way[i + 2]].checker === 0)) {

        this.field.chops = true;
        const hangman = way[i]; // шашка, которая рубит
        const newHangmanPlace = way[i + 2]; // место, куда встает шашка после сруба
        const victim = way[i + 1]; // шашка, которую рубят
        const move = [hangman, newHangmanPlace, victim];
        this.field.moves.push(move);

      } 

      // if (если первое поле существует && если первое поле пустое && второе поле существует && второе поле занято черной шашкой && третее поле существует && третее поле занято белой шашкой && третее поле не занято дамкой )  {то белая шашка может рубить}
      if (this.field[way[i - 2]] && (this.field[way[i - 2]].checker === 0) && this.field[way[i - 1]] && (this.field[way[i - 1]].checker === 2) && this.field[way[i]] && (this.field[way[i]].checker === 1) && (this.field[way[i]].queen === false)) {

        this.field.chops = true;
        const hangman = way[i]; // шашка, которая рубит
        const newHangmanPlace = way[i - 2]; // место, куда встает шашка после сруба
        const victim = way[i - 1]; // шашка, которую рубят
        const move = [hangman, newHangmanPlace, victim];
        this.field.moves.push(move);

      }

      // Проверка срубов для второго игрока в одну и другую сторону
    } else if (this.field.whoseMove === 2) {

      // if (если первое поле существует && если первое поле зянато черной шашкой && если первое поле не занято дамкой && второе поле существует && второе поле занято белой шашкой && третее поле существует && третее поле пустое )  {то черная шашка может рубить}
      if (this.field[way[i]] && (this.field[way[i]].checker === 2) && (this.field[way[i]].queen === false) && this.field[way[i + 1]] && (this.field[way[i + 1]].checker === 1) && this.field[way[i + 2]] && (this.field[way[i + 2]].checker === 0)) {

        this.field.chops = true;
        const hangman = way[i]; // шашка, которая рубит
        const newHangmanPlace = way[i + 2]; // место, куда встает шашка после сруба
        const victim = way[i + 1]; // шашка, которую рубят
        const move = [hangman, newHangmanPlace, victim];
        this.field.moves.push(move);

      }

      // if (если первое поле существует && если первое поле пустое && второе поле существует && второе поле занято белой шашкой && третее поле существует && третее поле занято черной шашкой && третее поле не занято дамкой )  {то черная шашка может рубить}
      if (this.field[way[i - 2]] && (this.field[way[i - 2]].checker === 0) && this.field[way[i - 1]] && (this.field[way[i - 1]].checker === 1) && this.field[way[i]] && (this.field[way[i]].checker === 2) && (this.field[way[i]].queen === false)) {

        this.field.chops = true;
        const hangman = way[i]; // шашка, которая рубит
        const newHangmanPlace = way[i - 2]; // место, куда встает шашка после сруба
        const victim = way[i - 1]; // шашка, которую рубят
        const move = [hangman, newHangmanPlace, victim];
        this.field.moves.push(move);

      }

    }
  }

  checkMoves() {
    this.checkChops();
    if (this.field.chops === true) return; // если есть срубы, то больше не проверяем ходы, а просто возвращаем moves

    if (this.field.whoseMove === 1) {

      for (const way in this.ways) {

        const length = this.ways[way].length;

        for (let i = 0; i < length; i++) {
          if (this.field[this.ways[way][i]] && (this.field[this.ways[way][i]].checker === 1) && this.field[this.ways[way][i + 1]] && (this.field[this.ways[way][i + 1]].checker === 0)) {

            const move = [this.ways[way][i], this.ways[way][i + 1]];
            this.field.moves.push(move);
    
          }
        }
      }
      
    } else if (this.field.whoseMove === 2) {

      for (const way in this.ways) {

        const length = this.ways[way].length;

        for (let i = 0; i < length; i++) {
          if (this.field[this.ways[way][i + 1]] && (this.field[this.ways[way][i + 1]].checker === 2) && (this.field[this.ways[way][i]].checker === 0)) {

            const move = [this.ways[way][i + 1], this.ways[way][i]];
            this.field.moves.push(move);
    
          }
        }
      }

    }

  }

  checkMovesOfQueen() {

  }

  checkChopsOfQueen(checker) {
    console.log(checker)

    for (const way in this.ways) {
      this.ways[way].forEach((square, i) => {

        if (square === checker) {
          const length = this.ways[way].length;

          for (let j = i + 1; j < length; j++) {

            if (this.field.whoseMove === 1) {

              for (let k = j + 1; k < length; k++) {

                if (this.field[this.ways[way][i]] && (this.field[this.ways[way][i]].checker === 1) && this.field[this.ways[way][j]] && (this.field[this.ways[way][j]].checker === 2) && this.field[this.ways[way][k]] && (this.field[this.ways[way][k]].checker === 0)) {
                  
                  this.field.chops = true;
                  const hangman = way[i]; // дамка, которая рубит
                  const victim = way[j]; // шашка, которую рубят
                  const newHangmanPlace = []; // место, куда встает дамка после сруба
                  
                  for (;k < length; k++) {
                    if (this.field[this.ways[way][k]] && this.field[this.ways[way][k]].checker === 0) {
                      newHangmanPlace.push(this.field[this.ways[way][k]].coordinate);
                    } else {
                      break;
                    }

                  }
                  const move = [hangman, newHangmanPlace, victim];
                  this.field.moves.push(move);

                }
                break;

              }


            } else if (this.field.whoseMove === 2) {

              for (let k = j + 1; j < length; k++) {

                if (this.field[this.ways[way][i]] && (this.field[this.ways[way][i]].checker === 2) && this.field[this.ways[way][j]] && (this.field[this.ways[way][j]].checker === 1) && this.field[this.ways[way][k]] && (this.field[this.ways[way][k]].checker === 0)) {
                  
                  this.field.chops = true;
                  const hangman = way[i]; // дамка, которая рубит
                  const victim = way[j]; // шашка, которую рубят
                  const newHangmanPlace = []; // место, куда встает дамка после сруба
                  
                  for (;k < length; k++) {
                    if (this.field[this.ways[way][k]] && this.field[this.ways[way][k]].checker === 0) {
                      newHangmanPlace.push(this.field[this.ways[way][k]].coordinate);
                    } else {
                      break;
                    }

                  }
                  const move = [hangman, newHangmanPlace, victim];
                  this.field.moves.push(move);

                }
                break;

              }

            }

          }
          for (let j = i - 1; j >= 0; j--) {
            if (this.field.whoseMove === 1) {
              for (let k = j - 1; k <= 0; k--) {
                if (this.field[this.ways[way][i]] && (this.field[this.ways[way][i]].checker === 1) && this.field[this.ways[way][j]] && (this.field[this.ways[way][j]].checker === 2) && this.field[this.ways[way][k]] && (this.field[this.ways[way][k]].checker === 0)) {
                  
                  this.field.chops = true;
                  const hangman = way[i]; // дамка, которая рубит
                  const victim = way[j]; // шашка, которую рубят
                  const newHangmanPlace = []; // место, куда встает дамка после сруба
                  
                  for (;k <= 0; k++) {
                    if (this.field[this.ways[way][k]] && this.field[this.ways[way][k]].checker === 0) {
                      newHangmanPlace.push(this.field[this.ways[way][k]].coordinate);
                    } else {
                      break;
                    }

                  }
                  const move = [hangman, newHangmanPlace, victim];
                  this.field.moves.push(move);
                  
                }
              }
            } else if (this.field.whoseMove === 2) {
              for (let k = j - 1; k <= 0; k--) {
                if (this.field[this.ways[way][i]] && (this.field[this.ways[way][i]].checker === 2) && this.field[this.ways[way][j]] && (this.field[this.ways[way][j]].checker === 1) && this.field[this.ways[way][k]] && (this.field[this.ways[way][k]].checker === 0)) {
                  
                  this.field.chops = true;
                  const hangman = way[i]; // дамка, которая рубит
                  const victim = way[j]; // шашка, которую рубят
                  const newHangmanPlace = []; // место, куда встает дамка после сруба
                  
                  for (;k <= 0; k++) {
                    if (this.field[this.ways[way][k]] && this.field[this.ways[way][k]].checker === 0) {
                      newHangmanPlace.push(this.field[this.ways[way][k]].coordinate);
                    } else {
                      break;
                    }

                  }
                  const move = [hangman, newHangmanPlace, victim];
                  this.field.moves.push(move);
                  
                }
              }

            }
          }
        }
      });

    }

  }

  handleMove(checkers, done) {
    this.field.moves.forEach((move, i) => {
      if (move[0] === checkers[0] && move[1] === checkers[1]) {
        this.field[move[0]].checker = 0;
        this.field[move[1]].checker = this.field.whoseMove;

        // если ходит первый игрок и шашка стала на восьмую диагональ или если ходит второй игрок и шашка встала на первую диагональ, сделать шашку дамкой
        if ((this.field.whoseMove === 1 && move[1][1] === '8') || (this.field.whoseMove === 2 && move[1][1] === '1')) {
          this.field[move[1]].queen = true;
          this.field.queens.push(this.field[move[1]].coordinate);
        }

        // если move[2] существует, то значит этот ход является срубом
        if (this.field[move[2]]) {
          this.field[move[2]].checker = 0;
          this.field.moves = [];
          if (this.field[move[1]].queen) {
            this.checkChopsOfQueen(move[1]);
          } else {
            this.checkAdditionalChops(move[1]);
          }
          if (this.field.moves[0]) {
            done();
          } else {
            this.field.chops = false;
          }
        }

        if (this.field.chops === false) {
          this.field.whoseMove === 1 ? this.field.whoseMove = 2 : this.field.whoseMove = 1;
          this.field.moves = [];
          this.checkMoves();
        }
        done();
      }
    });
  }

}


app.get('/api/getField', (req, res) => {
  const shashki = new Shashki();
  games.push(shashki);
  res.set('Content-Type', 'application/json; charset: utf-8');
  res.end(JSON.stringify(shashki.field));
});

app.post('/api/handleDrop', (req, res) => {

  games[req.body[2]].handleMove(req.body[0], function() {
    res.end(JSON.stringify(games[req.body[2]].field));
  });

});

app.listen(3001, console.log('Сервер работает на порту 3001'));