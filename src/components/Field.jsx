import React from 'react';
import CellContainer from '../containers/CellContainer';

function Field(props) {
  return (
    <section>
      <ul className='field-ul'>
        {props.field.map((cell, i) => 
          <CellContainer key={i} cell={cell} />
        )}
      </ul>
    </section>
  );
}

export default Field;