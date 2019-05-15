
let idOfLastGame = -1;
module.exports = class Checkers {
  constructor() {
    this.field = {};
    this.field.whoseMove = 1; // 1 - белые, 2 - черные

    this.field.gameID = ++idOfLastGame;

    this.field.queens = [];
    this.field.whoseWin = 0;

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

    this.waysOfCells = {
      a1: [['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8']],
      c1: [['c1', 'b2', 'a3'], ['c1', 'd2', 'e3', 'f4', 'g5', 'h6']],
      e1: [['e1', 'd2', 'c3', 'b4', 'a5'], ['e1', 'f2', 'g3', 'h4']],
      g1: [['g1', 'h2'], ['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7']],
      b2: [['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'], ['c1', 'b2', 'a3']],
      d2: [['c1', 'd2', 'e3', 'f4', 'g5', 'h6'], ['e1', 'd2', 'c3', 'b4', 'a5']],
      f2: [['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7'], ['e1', 'f2', 'g3', 'h4']],
      h2: [['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8'], ['g1', 'h2']],
      a3: [['c1', 'b2', 'a3'], ['a3', 'b4', 'c5', 'd6', 'e7', 'f8']],
      c3: [['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'], ['e1', 'd2', 'c3', 'b4', 'a5']],
      e3: [['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7'], ['c1', 'd2', 'e3', 'f4', 'g5', 'h6']],
      g3: [['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8'], ['e1', 'f2', 'g3', 'h4']],
      b4: [['a3', 'b4', 'c5', 'd6', 'e7', 'f8'], ['e1', 'd2', 'c3', 'b4', 'a5']],
      d4: [['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'], ['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7']],
      f4: [['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8'], ['c1', 'd2', 'e3', 'f4', 'g5', 'h6']],
      h4: [['h4', 'g5', 'f6', 'e7', 'd8'], ['e1', 'f2', 'g3', 'h4']],
      a5: [['a5', 'b6', 'c7', 'd8'], ['e1', 'd2', 'c3', 'b4', 'a5']],
      c5: [['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7'], ['a3', 'b4', 'c5', 'd6', 'e7', 'f8']],
      e5: [['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8'], ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8']],
      g5: [['c1', 'd2', 'e3', 'f4', 'g5', 'h6'], ['h4', 'g5', 'f6', 'e7', 'd8']],
      b6: [['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7'], ['a5', 'b6', 'c7', 'd8']],
      d6: [['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8'], ['a3', 'b4', 'c5', 'd6', 'e7', 'f8']],
      f6: [['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'], ['h4', 'g5', 'f6', 'e7', 'd8']],
      h6: [['c1', 'd2', 'e3', 'f4', 'g5', 'h6'], ['h6', 'g7', 'f8']],
      a7: [['a7', 'b8'], ['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7']],
      c7: [['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8'], ['a5', 'b6', 'c7', 'd8']],
      e7: [['a3', 'b4', 'c5', 'd6', 'e7', 'f8'], ['h4', 'g5', 'f6', 'e7', 'd8']],
      g7: [['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'], ['h6', 'g7', 'f8']],
      b8: [['a7', 'b8'], ['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8']],
      d8: [['a5', 'b6', 'c7', 'd8'], ['h4', 'g5', 'f6', 'e7', 'd8']],
      f8: [['h6', 'g7', 'f8'], ['a3', 'b4', 'c5', 'd6', 'e7', 'f8']],
      h8: [['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8']]
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
    if (!this.field[way[i]].queen) {

      // Проверка срубов для первого игрока в одну и другую сторону
      if (this.field.whoseMove === 1) {

        // if (если первое поле существует && если первое поле занято белой шашкой && если первое поле не занято дамкой && второе поле существует && второе поле занято черной шашкой && третее поле существует && третее поле пустое )  {то белая шашка может рубить}
        if (this.field[way[i]] && (this.field[way[i]].checker === 1) && (this.field[way[i]].queen === false) && this.field[way[i + 1]] && (this.field[way[i + 1]].checker === 2) && this.field[way[i + 2]] && (this.field[way[i + 2]].checker === 0)) {

          this.field.chops = true;
          const hangman = way[i]; // шашка, которая рубит
          const newHangmanPlace = [way[i + 2]]; // место, куда встает шашка после сруба
          const victim = way[i + 1]; // шашка, которую рубят
          const move = [hangman, newHangmanPlace, victim];
          this.field.moves.push(move);

        } 

        // if (если первое поле существует && если первое поле пустое && второе поле существует && второе поле занято черной шашкой && третее поле существует && третее поле занято белой шашкой && третее поле не занято дамкой )  {то белая шашка может рубить}
        if (this.field[way[i - 2]] && (this.field[way[i - 2]].checker === 0) && this.field[way[i - 1]] && (this.field[way[i - 1]].checker === 2) && this.field[way[i]] && (this.field[way[i]].checker === 1) && (this.field[way[i]].queen === false)) {

          this.field.chops = true;
          const hangman = way[i]; // шашка, которая рубит
          const newHangmanPlace = [way[i - 2]]; // место, куда встает шашка после сруба
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
          const newHangmanPlace = [way[i + 2]]; // место, куда встает шашка после сруба
          const victim = way[i + 1]; // шашка, которую рубят
          const move = [hangman, newHangmanPlace, victim];
          this.field.moves.push(move);

        }

        // if (если первое поле существует && если первое поле пустое && второе поле существует && второе поле занято белой шашкой && третее поле существует && третее поле занято черной шашкой && третее поле не занято дамкой )  {то черная шашка может рубить}
        if (this.field[way[i - 2]] && (this.field[way[i - 2]].checker === 0) && this.field[way[i - 1]] && (this.field[way[i - 1]].checker === 1) && this.field[way[i]] && (this.field[way[i]].checker === 2) && (this.field[way[i]].queen === false)) {

          this.field.chops = true;
          const hangman = way[i]; // шашка, которая рубит
          const newHangmanPlace = [way[i - 2]]; // место, куда встает шашка после сруба
          const victim = way[i - 1]; // шашка, которую рубят
          const move = [hangman, newHangmanPlace, victim];
          this.field.moves.push(move);

        }

      }
    }
  }

  checkMoves() {
    if (this.field.chops === true) return; // если есть срубы, то больше не проверяем ходы, а просто возвращаем moves

    if (this.field.whoseMove === 1) {

      for (const way in this.ways) {

        const length = this.ways[way].length;

        for (let i = 0; i < length; i++) {
          if (this.field[this.ways[way][i]] && (this.field[this.ways[way][i]].checker === 1) && this.field[this.ways[way][i + 1]] && (this.field[this.ways[way][i + 1]].checker === 0)) {

            const move = [this.ways[way][i], [this.ways[way][i + 1]]];
            this.field.moves.push(move);
    
          }
        }
      }
      
    } else if (this.field.whoseMove === 2) {

      for (const way in this.ways) {

        const length = this.ways[way].length;

        for (let i = 0; i < length; i++) {
          if (this.field[this.ways[way][i + 1]] && (this.field[this.ways[way][i + 1]].checker === 2) && (this.field[this.ways[way][i]].checker === 0)) {

            const move = [this.ways[way][i + 1], [this.ways[way][i]]];
            this.field.moves.push(move);
    
          }
        }
      }

    }
  }

  checkMovesOfQueens() {
    if (this.field.chops === true) return; // если есть срубы, то больше не проверяем ходы, а просто возвращаем moves

    this.field.queens.forEach(queen => {
      if (this.field.whoseMove === 1 && this.field[queen].checker === 1) {
        this.waysOfCells[queen].forEach((way, q) => {
          const lengthOfWay = way.length;
          let i = way.indexOf(queen);
          for (let j = i + 1; j < lengthOfWay; j++) {
            const currentCell = way[j];
            if (this.field[currentCell] && this.field[currentCell].checker === 0) {
              const move = [queen, [this.field[currentCell].coordinate]];
              this.field.moves.push(move);
            }
            if (this.field[currentCell] && ((this.field[currentCell].checker === 2) || (this.field[currentCell].checker === 1))) {
              break;
            }
          }
          for (let j = i - 1; j >= 0; j--) {
            const currentCell = way[j];
            if (this.field[currentCell] && this.field[currentCell].checker === 0) {
              const move = [queen, [this.field[currentCell].coordinate]];
              this.field.moves.push(move);
            }
            if (this.field[currentCell] && ((this.field[currentCell].checker === 2) || (this.field[currentCell].checker === 1))) {
              break;
            }
          }
        });
      }
      if (this.field.whoseMove === 2 && this.field[queen].checker === 2) {
        this.waysOfCells[queen].forEach(way => {
          const lengthOfWay = way.length;
          let i = way.indexOf(queen);
          for (let j = i + 1; j < lengthOfWay; j++) {
            const currentCell = way[j];
            if (this.field[currentCell] && this.field[currentCell].checker === 0) {
              const move = [queen, [this.field[currentCell].coordinate]];
              this.field.moves.push(move);
            }
            if (this.field[currentCell] && ((this.field[currentCell].checker === 2) || (this.field[currentCell].checker === 1))) {
              break;
            }
          }
          for (let j = i - 1; j >= 0; j--) {
            const currentCell = way[j];
            if (this.field[currentCell] && this.field[currentCell].checker === 0) {
              const move = [queen, [this.field[currentCell].coordinate]];
              this.field.moves.push(move);
            }
            if (this.field[currentCell] && ((this.field[currentCell].checker === 2) || (this.field[currentCell].checker === 1))) {
              break;
            }

          }
        });

      }
    });

  }

  checkChopsOfQueens(queens) {
    queens.forEach(queen => {

      this.waysOfCells[queen].forEach(way => {

        const indexOfQueen = way.indexOf(queen);
        const lengthOfWay = way.length;

        if (this.field[queen].checker === 1 && this.field.whoseMove === 1) {

          for (let i = indexOfQueen + 1; i < lengthOfWay; i++) {

            if (this.field[way[i]].checker === 1) break;
            if (this.field[way[i]].checker === 2 && this.field[way[i + 1]] && this.field[way[i + 1]].checker !== 0) break;

            if (this.field[way[i]].checker === 2 && this.field[way[i + 1]] && this.field[way[i + 1]].checker === 0) {

              this.field.chops = true;
              const intermediateWays = [];
              let intermediateChops = false;


              for (let j = i + 1; j < lengthOfWay; j++) {

                if (this.field[way[j]].checker !== 0) break;

                const hangman = queen; // шашка, которая рубит
                const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                const victim = way[i]; // шашка, которую рубят
                const move = [hangman, newHangmanPlace, victim];
                intermediateWays.push(move);

                this.waysOfCells[way[j]].forEach(way2 => {

                  if (way2.indexOf(queen) === -1) {

                    const indexOfEmptyCell = way2.indexOf(way[j]);
                    const lengthOfWay2 = way2.length;

                    let isIntermediateChops = false;

                    for (let k = indexOfEmptyCell + 1; k < lengthOfWay2; k++) {

                      if (this.field[way2[k]].checker === 1) break;
                      if (this.field[way2[k]].checker === 2 && this.field[way2[k + 1]] && this.field[way2[k + 1]].checker !== 0) break;

                      if (this.field[way2[k]].checker === 2 && this.field[way2[k + 1]] && this.field[way2[k + 1]].checker === 0) {

                        intermediateChops = true;
                        isIntermediateChops = true;
                        const hangman = queen; // шашка, которая рубит
                        const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                        const victim = way[i]; // шашка, которую рубят
                        const move = [hangman, newHangmanPlace, victim];
                        this.field.moves.push(move);

                        break;

                      }

                    }
                    if (!isIntermediateChops) {
                      
                      for (let k = indexOfEmptyCell - 1; k >= 0; k--) {

                        if (this.field[way2[k]].checker === 1) break;
                        if (this.field[way2[k]].checker === 2 && this.field[way2[k - 1]] && this.field[way2[k - 1]].checker !== 0) break;

                        if (this.field[way2[k]].checker === 2 && this.field[way2[k - 1]] && this.field[way2[k - 1]].checker === 0) {

                          intermediateChops = true;
                          const hangman = queen; // шашка, которая рубит
                          const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                          const victim = way[i]; // шашка, которую рубят
                          const move = [hangman, newHangmanPlace, victim];
                          this.field.moves.push(move);

                          break;

                        }

                      }
                    }

                  }

                });

              }

              if (!intermediateChops) {

                this.field.moves = this.field.moves.concat(intermediateWays);

              }

            }

          }

          for (let i = indexOfQueen - 1; i >= 0; i--) {

            if (this.field[way[i]].checker === 1) break;
            if (this.field[way[i]].checker === 2 && this.field[way[i - 1]] && this.field[way[i - 1]].checker !== 0) break;

            if (this.field[way[i]].checker === 2 && this.field[way[i - 1]] && this.field[way[i - 1]].checker === 0) {

              this.field.chops = true;
              const intermediateWays = [];
              let intermediateChops = false;


              for (let j = i - 1; j >= 0; j--) {

                if (this.field[way[j]].checker !== 0) break;

                const hangman = queen; // шашка, которая рубит
                const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                const victim = way[i]; // шашка, которую рубят
                const move = [hangman, newHangmanPlace, victim];
                intermediateWays.push(move);

                this.waysOfCells[way[j]].forEach(way2 => {

                  if (way2.indexOf(queen) === -1) {

                    const indexOfEmptyCell = way2.indexOf(way[j]);
                    const lengthOfWay2 = way2.length;

                    let isIntermediateChops = false;

                    for (let k = indexOfEmptyCell + 1; k < lengthOfWay2; k++) {

                      if (this.field[way2[k]].checker === 1) break;
                      if (this.field[way2[k]].checker === 2 && this.field[way2[k + 1]] && this.field[way2[k + 1]].checker !== 0) break;

                      if (this.field[way2[k]].checker === 2 && this.field[way2[k + 1]] && this.field[way2[k + 1]].checker === 0) {

                        intermediateChops = true;
                        isIntermediateChops = true;
                        const hangman = queen; // шашка, которая рубит
                        const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                        const victim = way[i]; // шашка, которую рубят
                        const move = [hangman, newHangmanPlace, victim];
                        this.field.moves.push(move);

                        break;

                      }

                    }
                    if (!isIntermediateChops) {
                      
                      for (let k = indexOfEmptyCell - 1; k >= 0; k--) {

                        if (this.field[way2[k]].checker === 1) break;
                        if (this.field[way2[k]].checker === 2 && this.field[way2[k - 1]] && this.field[way2[k - 1]].checker !== 0) break;

                        if (this.field[way2[k]].checker === 2 && this.field[way2[k - 1]] && this.field[way2[k - 1]].checker === 0) {

                          intermediateChops = true;
                          const hangman = queen; // шашка, которая рубит
                          const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                          const victim = way[i]; // шашка, которую рубят
                          const move = [hangman, newHangmanPlace, victim];
                          this.field.moves.push(move);

                          break;

                        }

                      }
                    }

                  }

                });

              }

              if (!intermediateChops) {

                this.field.moves = this.field.moves.concat(intermediateWays);

              }

            }

          }

        }

        if (this.field[queen].checker === 2 && this.field.whoseMove === 2) {

          for (let i = indexOfQueen + 1; i < lengthOfWay; i++) {

            if (this.field[way[i]].checker === 2) break;
            if (this.field[way[i]].checker === 1 && this.field[way[i + 1]] && this.field[way[i + 1]].checker !== 0) break;

            if (this.field[way[i]].checker === 1 && this.field[way[i + 1]] && this.field[way[i + 1]].checker === 0) {

              this.field.chops = true;
              const intermediateWays = [];
              let intermediateChops = false;


              for (let j = i + 1; j < lengthOfWay; j++) {

                if (this.field[way[j]].checker !== 0) break;

                const hangman = queen; // шашка, которая рубит
                const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                const victim = way[i]; // шашка, которую рубят
                const move = [hangman, newHangmanPlace, victim];
                intermediateWays.push(move);

                this.waysOfCells[way[j]].forEach(way2 => {

                  if (way2.indexOf(queen) === -1) {

                    const indexOfEmptyCell = way2.indexOf(way[j]);
                    const lengthOfWay2 = way2.length;

                    let isIntermediateChops = false;

                    for (let k = indexOfEmptyCell + 1; k < lengthOfWay2; k++) {

                      if (this.field[way2[k]].checker === 2) break;
                      if (this.field[way2[k]].checker === 1 && this.field[way2[k + 1]] && this.field[way2[k + 1]].checker !== 0) break;

                      if (this.field[way2[k]].checker === 1 && this.field[way2[k + 1]] && this.field[way2[k + 1]].checker === 0) {

                        intermediateChops = true;
                        isIntermediateChops = true;
                        const hangman = queen; // шашка, которая рубит
                        const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                        const victim = way[i]; // шашка, которую рубят
                        const move = [hangman, newHangmanPlace, victim];
                        this.field.moves.push(move);

                        break;

                      }

                    }
                    if (!isIntermediateChops) {
                      
                      for (let k = indexOfEmptyCell - 1; k >= 0; k--) {

                        if (this.field[way2[k]].checker === 2) break;
                        if (this.field[way2[k]].checker === 1 && this.field[way2[k - 1]] && this.field[way2[k - 1]].checker !== 0) break;

                        if (this.field[way2[k]].checker === 1 && this.field[way2[k - 1]] && this.field[way2[k - 1]].checker === 0) {

                          intermediateChops = true;
                          const hangman = queen; // шашка, которая рубит
                          const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                          const victim = way[i]; // шашка, которую рубят
                          const move = [hangman, newHangmanPlace, victim];
                          this.field.moves.push(move);

                          break;

                        }

                      }
                    }

                  }

                });

              }

              if (!intermediateChops) {

                this.field.moves = this.field.moves.concat(intermediateWays);

              }

            }

          }

          for (let i = indexOfQueen - 1; i >= 0; i--) {

            if (this.field[way[i]].checker === 2) break;
            if (this.field[way[i]].checker === 1 && this.field[way[i - 1]] && this.field[way[i - 1]].checker !== 0) break;

            if (this.field[way[i]].checker === 1 && this.field[way[i - 1]] && this.field[way[i - 1]].checker === 0) {

              this.field.chops = true;
              const intermediateWays = [];
              let intermediateChops = false;


              for (let j = i - 1; j >= 0; j--) {

                if (this.field[way[j]].checker !== 0) break;

                const hangman = queen; // шашка, которая рубит
                const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                const victim = way[i]; // шашка, которую рубят
                const move = [hangman, newHangmanPlace, victim];
                intermediateWays.push(move);

                this.waysOfCells[way[j]].forEach(way2 => {

                  if (way2.indexOf(queen) === -1) {

                    const indexOfEmptyCell = way2.indexOf(way[j]);
                    const lengthOfWay2 = way2.length;

                    let isIntermediateChops = false;

                    for (let k = indexOfEmptyCell + 1; k < lengthOfWay2; k++) {

                      if (this.field[way2[k]].checker === 2) break;
                      if (this.field[way2[k]].checker === 1 && this.field[way2[k + 1]] && this.field[way2[k + 1]].checker !== 0) break;

                      if (this.field[way2[k]].checker === 1 && this.field[way2[k + 1]] && this.field[way2[k + 1]].checker === 0) {

                        intermediateChops = true;
                        isIntermediateChops = true;
                        const hangman = queen; // шашка, которая рубит
                        const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                        const victim = way[i]; // шашка, которую рубят
                        const move = [hangman, newHangmanPlace, victim];
                        this.field.moves.push(move);

                        break;

                      }

                    }
                    if (!isIntermediateChops) {
                      
                      for (let k = indexOfEmptyCell - 1; k >= 0; k--) {

                        if (this.field[way2[k]].checker === 2) break;
                        if (this.field[way2[k]].checker === 1 && this.field[way2[k - 1]] && this.field[way2[k - 1]].checker !== 0) break;

                        if (this.field[way2[k]].checker === 1 && this.field[way2[k - 1]] && this.field[way2[k - 1]].checker === 0) {

                          intermediateChops = true;
                          const hangman = queen; // шашка, которая рубит
                          const newHangmanPlace = [way[j]]; // место, куда встает шашка после сруба
                          const victim = way[i]; // шашка, которую рубят
                          const move = [hangman, newHangmanPlace, victim];
                          this.field.moves.push(move);

                          break;

                        }

                      }
                    }

                  }

                });

              }

              if (!intermediateChops) {

                this.field.moves = this.field.moves.concat(intermediateWays);

              }

            }

          }

        }


      });

    });
  }

  checkAdditionalChopsOfQueen(queen) {
    this.checkChopsOfQueens([queen]);
  }

  addQueen(cell) {
    this.field.queens.push(cell);
  }

  removeQueen(cell) {
    const index = this.field.queens.indexOf(cell);
    this.field.queens.splice(index, 1);
  }

  handleMove(checkers, done) {
    this.field.moves.forEach((move, i) => {
      move[1].forEach(oneMove => {
        if (move[0] === checkers[0] && oneMove === checkers[1]) {

          this.field[move[0]].checker = 0;
          this.field[oneMove].checker = this.field.whoseMove;

          if (this.field[move[0]].queen) {
            this.field[oneMove].queen = true;
            this.addQueen(oneMove);
            this.field[move[0]].queen = false;
            this.removeQueen(move[0]);
          }

  
          // если ходит первый игрок и шашка стала на восьмую диагональ или если ходит второй игрок и шашка встала на первую диагональ, сделать шашку дамкой
          if ((this.field.whoseMove === 1 && oneMove[1] === '8') || (this.field.whoseMove === 2 && oneMove[1] === '1')) {
            this.field[oneMove].queen = true;
            if (this.field.queens.indexOf(oneMove) === -1) {
              this.field.queens.push(oneMove);
            }
          }
  
          // если move[2] существует, то значит этот ход является срубом
          if (this.field[move[2]]) {
            this.field[move[2]].checker = 0;
            this.field[move[2]].queen = false;
            const indexQueen = this.field.queens.indexOf(move[2]);
            if (indexQueen !== -1) {
              this.field.queens.splice(indexQueen, 1);
            }

            this.field.moves = [];
            if (this.field[oneMove].queen) {
              this.checkAdditionalChopsOfQueen(oneMove);
            } else {
              this.checkAdditionalChops(oneMove);
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

            this.checkChops();
            this.checkChopsOfQueens(this.field.queens);

            this.checkMovesOfQueens();
            this.checkMoves();
            
            if (this.field.moves[0] === undefined) {
              this.field.whoseWin = this.field.whoseMove === 1 ? this.field.whoseMove = 2 : this.field.whoseMove = 1;
            }
					
          }

          console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
          console.log('****************************');
          console.log(this.field.moves);
          done();
        }
      });
    });
  }

}
