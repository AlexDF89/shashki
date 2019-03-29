

class Shashki {
  constructor() {
    this.field = {};
    this.whoseMove = 1; // 1 - белые, 2 - черные
    this.ways = {
      GoldWay:       ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'],
      DoubleWayG1A7: ['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7'],
      DoubleWayH2B8: ['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8'],
      TripleWayC1A3: ['c1', 'b2', 'a3'],
      TripleWayC1H6: ['c1', 'd2', 'e3', 'f4', 'g5', 'h6'],
      TripleWayH6F8: ['h6', 'g7', 'f8'],
      TripleWayA3F8: ['a3', 'b4', 'c5', 'd6', 'e7', 'f8'],
      UltraWayA5D8:  ['a5', 'b6', 'c7', 'd8'],
      UltraWayH4D8:  ['h4', 'g5', 'f6', 'e7', 'd8'],
      UltraWayE1A5:  ['e1', 'd2', 'c3', 'b4', 'a5'],
      UltraWayE1H4:  ['e1', 'f2', 'g3', 'h4']
    }

    this.createField();
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
      for (; j <= 8; j += 2) {

        const cell = {};

        cell.coordinate = row + j;

        let checker;
        (j <= 3) ? checker = 1 : (j >= 6) ? checker = 2 : checker = 0; //0 - пустое, 1 - белая шашка, 2 - черная шашка
        cell.checker = checker;

        cell.border = false;

        cell.queen = false;

        this.field[cell.coordinate] = cell;
      }
    }
  }

  changeColorOfCell(cell, color) {
    cell.color = color;
  }

  setQueen(cell, queen) {
    cell.queen = queen;
  }

  checkChops(whoseMove) {
    
  }

  checkWaysOfChecker(cell) {

    if (this.whoseMove === 1 && cell.checker === 1) {
      
    } else if (this.whoseMove === 2 && cell.checker === 2) {

    }

  }

  clearCell(cell) {
    cell.checker = 0;
    cell.queen = false;
  }

  drawChecker(cell, checker) {
    cell.checker = checker;
  }
}

const shashki = new Shashki();

console.log(shashki);