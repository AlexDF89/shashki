import React from 'react';

import WChecker from '../images/w.png';
import BChecker from '../images/b.png';

function Cell(props) {
  console.log(props);
  return (
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
        {props.cell.checker === 1 ? <img className='field-img' src={WChecker} alt='' /> : ''}
        {props.cell.checker === 2 ? <img className='field-img' src={BChecker} alt='' /> : ''}
      </div>
    </li>
  );
}

export default Cell;