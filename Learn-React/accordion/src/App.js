import React, { Component } from 'react';
import './App.css';

import Accordion from './components/Accordion'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Accordion header="Hello">
          My name is Thanh
        </Accordion>
      </div>
    );
  }
}

export default App;
