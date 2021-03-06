import React from 'react';
import { DropTarget } from 'react-dnd';

import Checker from '../components/Checker';
import WChecker from '../images/w.png';
import WQChecker from '../images/wq.png';

import BChecker from '../images/b.png';
import BQChecker from '../images/bq.png';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
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

    props.data.field.moves.forEach(elem => {

      if ((elem[0] === monitor.getItem().coordinate) && (elem[1].indexOf(props.cell.coordinate) !== -1)) {

        const move = [monitor.getItem().coordinate, props.cell.coordinate];
        const gameID = props.data.field.gameID;

        props.handleDrop( {
          move, 
          gameID,
        });
      }
    });

  }
}

function Cell(props) {

  const { connectDropTarget } = props;

  return connectDropTarget(
    <li className={`field-li ${props.data.user === 2 ? 'rotate180' : ''}`}>
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
          ${props.cell.highlight ? 'field-li-in-highlight' : ''}
        `}>
        {props.cell.checker === 1 ? !props.cell.queen ? <Checker checker={props.cell} src={WChecker}  data={props.data} highlightTargets={props.onHighlightTargets} /> : <Checker checker={props.cell}  data={props.data} src={WQChecker} highlightTargets={props.onHighlightTargets} /> : '' }
        {props.cell.checker === 2 ? !props.cell.queen ? <Checker checker={props.cell} src={BChecker}  data={props.data} highlightTargets={props.onHighlightTargets} /> : <Checker checker={props.cell}  data={props.data} src={BQChecker} highlightTargets={props.onHighlightTargets} /> : ''}
      </div>
    </li>
  );
}

export default DropTarget('checker', boardSquareTarget, collect)(Cell)