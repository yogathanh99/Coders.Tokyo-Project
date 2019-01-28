import React, { Component } from 'react';

import NumberContext from '../contexts/NumberContext'

class NumberProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 5
    }
    this.updateNumber=this.updateNumber.bind(this)
  }

  updateNumber = () => {
    this.setState({
      number: Math.random()
    })
  }

  render() {
    return (
      <NumberContext.Provider value={{
        number: this.state.number,
        update: this.updateNumber
      }}>
        {this.props.children}
      </NumberContext.Provider>
    );
  }
}


export default NumberProvider;