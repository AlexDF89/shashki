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

      <div className="connectingLink-wrap">
          <p>Для подключения к игре ваш противник должен перейти п оссылке:</p>
          <p id="connectingLink">{`${window.location.host}/?id=${props.field.gameID}`}</p>
          <button onClick={1}>Скопировать</button>
      </div>

        {
          (props.field.whoseWin !== 0 && props.field.whoseWin !== undefined)
          ?
          <div className="whoseWin-popup-wrap ">
                <div className="whoseWin-popup">
                  <h2>Победили {props.field.whoseWin === 1 ? 'белые' : props.field.whoseWin === 2 ? 'черные' : ''}</h2>
                  <form action="">
                    <button id="new-game" className='btn'>Играть снова</button>
                  </form>
                </div>
          </div>
          :
          ''       
        }
    </section>
  );
}

export default Field;