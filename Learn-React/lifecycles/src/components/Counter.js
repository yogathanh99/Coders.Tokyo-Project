import React, { Component } from 'react'

export default class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }
  }

  increase() {
    this.setState({
      counter: this.state.counter+1
    })
  }

  decrease() {
    this.setState({
      counter: this.state.counter-1
    })
  }

  render() {
    return (
      <div className="Counter">
        <button onClick={() => this.decrease()}>-</button>
        <span>{this.state.counter}</span>
        <button onClick={()=>this.increase()}>+</button>
      </div>
    )
  }
}
