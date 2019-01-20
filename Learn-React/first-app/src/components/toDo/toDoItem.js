import React, { Component } from 'react'
import classNames from 'classnames'
import './toDoItem.css'

class ToDoItem extends Component{

  render() {
    const { content, onClick } = this.props;
    return (
      <div onClick={onClick} className={classNames('ToDoItem', {
        'ToDoItem-complete': content.isComplete
      })}>
        <p>{content.title}</p>
      </div>
    )
  }
}

export default ToDoItem