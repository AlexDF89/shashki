import React, { Component } from 'react';
import './scss/app.scss';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import './js/script';

import FieldContainer from './containers/FieldContainer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="back-to-main">
          <a href="http://webdev-master.ru">Вернуться на главную</a>
        </div>

        <FieldContainer />

      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
