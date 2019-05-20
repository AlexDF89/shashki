import React from 'react';
import Cell from '../components/Cell';

function Field(props) {
  return (
    <section className='field-wrap'>
			{
				props.data.user === 1
				?
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
				:
				props.data.user === 2
				?
					<ul className="markup-num">
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
						<li>6</li>
						<li>7</li>
						<li>8</li>
					</ul>
				:
				''
			}
      

      <ul className={`field-ul ${props.data.user === 2 ? 'rotate180' : ''}`}>
        {props.data.field.cells.map((cell, i) => 
          <Cell key={i} cell={cell} data={props.data} handleDrop={props.onHandleDrop} />
        )}
      </ul>

			{
				props.data.user === 1
				?
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
				:
				props.data.user === 2
				?
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
				:
				''					
			}

			<div className="game-info">
				<div className="colors">
					<div className="user-color">
						<p>Вы играете <span>{props.data.user === 1 ? 'белыми' : props.data.user === 2 ? 'черными' : ''}</span></p>
					</div>

					<div className="whoseMove">
						<p>Ход <span>{props.data.field.whoseMove === 1 ? 'белых' : 'черных'}</span></p>
					</div>
				</div>
				<div className="connectingLink-wrap">
						<p>Для подключения к игре ваш противник должен перейти по ссылке:</p>
						<p id="connectingLink" className="connectingLink">{`${window.location.host}/?id=${props.data.field.gameID}`}</p>
						<button id="btn-copy" className="btn-copy">Скопировать</button>
						<p className="connectingLink-message"><span id="connectingLink-message">Ссылка скопирована в буфер обмена</span></p>
				</div>

					{
						(props.data.field.whoseWin !== 0 && props.data.field.whoseWin !== undefined)
						?
						<div className="whoseWin-popup-wrap ">
									<div className="whoseWin-popup">
										<h2>Победили {props.data.field.whoseWin === 1 ? 'белые' : props.data.field.whoseWin === 2 ? 'черные' : ''}</h2>
										<form action="">
											<button id="new-game" className='btn'>Играть снова</button>
										</form>
									</div>
						</div>
						:
						''       
					}
			</div>
    </section>
  );
}

export default Field;