import React from 'react';
import CellContainer from '../containers/CellContainer';

function Field(props) {
  return (
    <section className="field-wrap">
      <ul className="markup-num">
        <li>8</li>
        <li>7</li>
        <li>6</li>
        <li>5</li>
        <li>4</li>
        <li>3</li>
        <li>2</li>
        <li>1</li>
      </ul>
      <ul className='field-ul'>
        {props.field.cells.map((cell, i) => 
          <CellContainer key={i} cell={cell} />
        )}
      </ul>

      <ul className="markup-chars">
          <li></li>
          <li>a</li>
          <li>b</li>
          <li>c</li>
          <li>d</li>
          <li>e</li>
          <li>f</li>
          <li>g</li>
          <li>h</li>
      </ul>
    </section>
  );
}

export default Field;