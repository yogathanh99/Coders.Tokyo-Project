import React, { Component } from 'react';
import './App.css';

import RenderList from './RenderList'
import Counter from './Counter'
import NumberProvider from './components/NumberProvider'
import NumberContext from './contexts/NumberContext'

const data = ["A", "B", "C"];

class App extends Component {
  render() {
    return (
      <NumberProvider>
        <div className="App">
          <NumberContext.Consumer>
            {({ number, update }) => (
              <div>
                <h2>{number}</h2>
                <button onClick={update}>Click me</button>
              </div>
            )}
          </NumberContext.Consumer>

          <RenderList data={data} render={item => <div>{item}</div>} />
          <Counter>{({count}) => <h2>{count}</h2>}</Counter>
        </div>
      </NumberProvider>
    );
  }
}

export default App;
