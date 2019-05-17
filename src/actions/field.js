import socket from '../js/socket';

import store from '../store';

export const GET_FIELD = 'GET_FIELD';
export const HANDLE_DROP = 'HANDLE_DROP';

let cellsArr = [ 'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
              'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
              'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
              'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5', 
              'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 
              'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3', 
              'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2', 
              'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 
            ]

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

    socket.on('setField', origField => {

      const cells = cellsArr.map(cell => {
        if (origField[cell]) return origField[cell];
        return cell;
      });

      return dispatch({
        type: GET_FIELD,
        field: {
          gameID: origField.gameID,
          whoseMove: origField.whoseMove,
          moves: origField.moves,
          cells
        }
      });

    });
  }
}

export function handleDrop(drop) {
  const data = [drop[0], drop[1], drop[2]];
  return dispatch => {

    socket.emit('handleDrop', data);

  }
}

socket.on('processedDrop', origField => {

  const cells = cellsArr.map(cell => {
    if (origField[cell]) return origField[cell];
    return cell;
  });

  return store.dispatch({
    type: HANDLE_DROP,
    field: {
      gameID: origField.gameID,
      whoseMove: origField.whoseMove,
      whoseWin: origField.whoseWin,
      moves: origField.moves,
      cells
    }
 });

});