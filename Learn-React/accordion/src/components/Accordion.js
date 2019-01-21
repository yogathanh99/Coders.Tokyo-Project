import React, { Component } from 'react'

class Accordion extends Component{
  constructor() {
    super()
    this.state = {
      isCollapsed: true
    }

    this.onCollapse=this.onCollapse.bind(this)
  }

  onCollapse() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
  }

  render() {
    const { header, children } = this.props
    const { isCollapsed } = this.state
    return (
      <div className="Accordion">
        <div className="Header" onClick={this.onCollapse}>
          <h2>{header}</h2>
        </div>
        {
          !isCollapsed && <div className="content">{children}</div>
        }
      </div>
    )
  }
}

export default Accordion