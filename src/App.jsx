import React, { Component } from 'react';
import './scss/app.scss';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import FieldContainer from './containers/FieldContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <FieldContainer />

      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
