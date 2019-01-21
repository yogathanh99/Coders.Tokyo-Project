import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'; // ES6

import './toDoItem.css'
import check from '../../img/check.svg'
import checkComplete from '../../img/check-complete.svg'

class ToDoItem extends Component{
  render() {
    const { content, onClick } = this.props;
    let url = check
    if (content.isComplete) {
      url=checkComplete
    }
    return (
      <div className={classNames('ToDoItem', {
        'ToDoItem-complete': content.isComplete
      })}>
        <img onClick={onClick} src={url} width={32} height={32} alt="check"/>
        <p>{content.title}</p>
      </div>
    )
  }
}

ToDoItem.propTypes = {
  content: PropTypes.shape({
    isComplete: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func
}

export default ToDoItem