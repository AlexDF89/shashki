import React from 'react';
import { DropTarget } from 'react-dnd';

import CheckerContainer from '../containers/CheckerContainer';
import WChecker from '../images/w.png';
import BChecker from '../images/b.png';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hocered: monitor.isOver(),
    checker: monitor.getItem()
  }
}

const boardSquareTarget = {
  canDrop(props, monitor) {

    // const item = monitor.getItem();
    // props.onCanDrop([props.cell, item]);
    return true;
    
  },
  hover(props, monitor, component) {

  },
  drop(props, monitor, component) {

    props.field.moves.forEach(elem => {

      if ((elem[0] === monitor.getItem().coordinate) && (elem[1].indexOf(props.cell.coordinate) !== -1)) {
        props.onHandleDrop([[monitor.getItem().coordinate, props.cell.coordinate], props.field.moves, props.field.gameID]);
      }
    });

  }
}

function Cell(props) {

  const { connectDropTarget, hovered, checker } = props;

  return connectDropTarget(
    <li className='field-li'>
      <div className=
        {`field-li-in
          ${typeof props.cell === 'string' ? 'white-cell' 
          : 
            (
              'black-cell' + 
              (props.cell.checker === 1 ? ' white-checker' : '') + 
              (props.cell.checker === 2 ? ' black-checker' : '')
            )
          }
        `}>
        {props.cell.checker === 1 ? <CheckerContainer checker={props.cell} src={WChecker} /> : ''}
        {props.cell.checker === 2 ? <CheckerContainer checker={props.cell} src={BChecker} /> : ''}
      </div>
    </li>
  );
}

export default DropTarget('checker', boardSquareTarget, collect)(Cell)