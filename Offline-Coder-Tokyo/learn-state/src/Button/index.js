import React from 'react'

const Button = props => {
  return (
    <div>
      <button onClick={props.onIncrease}>+</button>
      <button onClick={props.onDecrease}>-</button>
    </div>
  )
}

export default Button
