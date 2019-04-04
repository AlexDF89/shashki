import React from 'react';
import Cell from '../components/Cell';

function Field(props) {
  return (
    <section>
      <ul className='field-ul'>
        {props.field.map(cell => 
          <Cell cell={cell} />
        )}
      </ul>
    </section>
  );
}

export default Field;