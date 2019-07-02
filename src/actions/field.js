import socket from '../js/socket';

import store from '../store';

export const GET_FIELD = 'GET_FIELD';
export const HANDLE_DROP = 'HANDLE_DROP';
export const HIGHLIGHT_TARGETS = 'HIGHLIGHT_TARGETS';
export const SHOW_RULES = 'SHOW_RULES';

let cellsArr = [ 'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
              'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
              'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
              'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5', 
              'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 
              'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3', 
              'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2', 
              'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 
						]
						
let user = 0;

export function getField() {
  return dispatch => {
    var data = window
    .location
    .search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );
    socket.emit('getField', data['id']);

    socket.on('setField', obj => {

      const cells = cellsArr.map(cell => {
        if (obj.field[cell]) return obj.field[cell];
        return cell;
      });

      user = obj.user;

      return dispatch({
				type: GET_FIELD,
				data: {
					user: user,
					field: {
						gameID: obj.field.gameID,
						whoseMove: obj.field.whoseMove,
            moves: obj.field.moves,
						cells
					}
				}
      });

    });
  }
}

export function handleDrop(drop) {

  return dispatch => {

    socket.emit('handleDrop', drop);

  }
  
}

socket.on('processedDrop', obj => {

  const cells = cellsArr.map(cell => {
    if (obj.field[cell]) return obj.field[cell];
    return cell;
  });

  return store.dispatch({
		type: HANDLE_DROP,
		data: {
			user: user,
			field: {
				gameID: obj.field.gameID,
				whoseMove: obj.field.whoseMove,
				whoseWin: obj.field.whoseWin,
				moves: obj.field.moves,
				cells
			}
		}
 });

});

export function highlightTargets(checker, data, extinguishTargets) {
  const highlightCells = {};

  data.field.moves.forEach(move => {
    if (checker.coordinate === move[0]) {
      highlightCells[move[1][0]] = move[1][0];
    }
  });

  const newData = {};
  newData.field = {};

  newData.field.cells = data.field.cells.map(cell => {

    if (!extinguishTargets && typeof cell === 'object' && cell.coordinate === highlightCells[cell.coordinate]) {
      cell.highlight = true;
    } else if (typeof cell === 'object') {
      cell.highlight = false;
    }
    return cell;

  });

  newData.user = data.user;
  newData.field.gameID = data.field.gameID;
  newData.field.whoseMove = data.field.whoseMove;
  newData.field.moves = Array.prototype.concat([], data.field.moves);

  return store.dispatch({
    type: HIGHLIGHT_TARGETS,
    data: newData
  });
}

export function showRules(rules) {
  return {
    type: SHOW_RULES,
    rules: rules
  };
}