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
          <Cell key={i} cell={cell} data={props.data} handleDrop={props.onHandleDrop} onHighlightTargets={props.onHighlightTargets} />
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
							<li>h</li>
							<li>g</li>
							<li>f</li>
							<li>e</li>
							<li>d</li>
							<li>c</li>
							<li>b</li>
							<li>a</li>
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
						<p className="connectingLink-message"><span id="connectingLink-message">Ссылка скопирована в буфер обмена</span></p>
						<button id="btn-copy" className="btn-copy">Скопировать</button>
						<button id="btn-rules-game" className="btn-rules-game" onClick={() => props.onShowRules(true)}>Правила игры</button>
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

					{
						props.rules
						?
						<div className="rules-wrap">
							<div className="rules-in">
							<span className="rules-close" onClick={() => props.onShowRules(false)}>X</span>
								<h2>Правила игры</h2>
								<ul>
									<li>Игра ведётся на доске 8х8 клеток, только на черных ячейках</li>
									<li>Бить можно произвольное количество шашек в любых направлениях</li>
									<li>Простые шашки ходят только вперёд</li>
									<li>Простая шашка может срубить назад</li>
									<li>Дамка ходит на любое число полей в любую сторону</li>
									<li>Шашка снимается с поля после боя</li>
									<li>Шашка превращается в дамку, достигнув восьмой (для белых) или первой (для черных) линии доски</li>
									<li>Если шашка во время боя проходит через дамочное поле, то она превращается в дамку и следующие бои (если они возможны) совершает уже как дамка</li>
									<li>Бить обязательно!</li>
									<li>Проигрывает тот, у кого не остается фигур, либо ходов!</li>
								</ul>
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