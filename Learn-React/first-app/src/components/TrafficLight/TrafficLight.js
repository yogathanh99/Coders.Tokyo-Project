import React, { Component } from 'react'
import classNames from 'classnames'
import './TrafficLight.css'

const RED=0, YELLOW =1, GREEN=2

class TrafficLight extends Component {
  constructor() {
    super()
    this.state = {
      currentColor: RED
    }
    setInterval(() => {
      this.setState({
        currentColor: this.getNextColort(this.state.currentColor)
      })
    }, 1000)

  }

  getNextColort(color) {
    switch (color) {
      case RED:
        return YELLOW
      case YELLOW:
        return GREEN
      case GREEN:
        return RED
      default:
        return RED
    }
  }

  render() {
    const {currentColor} = this.state
    return (
      <div className="TrafficLight">
        <div className={classNames('bulb', 'red', {active: currentColor === RED})} />
        <div className={classNames('bulb', 'yellow', {active: currentColor === YELLOW})} />
        <div className={classNames('bulb', 'green', {active: currentColor === GREEN})} />
      </div>
    )
  }
}

export default TrafficLight