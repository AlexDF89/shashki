import React, { Component } from 'react';
import './scss/app.scss';

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

export default App;
