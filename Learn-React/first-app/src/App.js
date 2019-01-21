import React, { Component } from 'react';
import './App.css'
import ToDoItem from './components/toDo/toDoItem'
import tick from './img/check-mark.svg'

class App extends Component {
  constructor() {
    super()
    this.state = {
      newItem: '',
      toDoItems: [
        { title: "Learn React", isComplete: true },
        { title: "Learn Vue", isComplete: true },
        { title: "Sleep", isComplete: false }
      ]
    }
    this.onInput = this.onInput.bind(this)
    this.onChange= this.onChange.bind(this)
  }

  onItemClick(item) {
    return () => {
      this.setState({
        toDoItems: this.state.toDoItems.map(i => i !== item ? {...i} : {...i, isComplete: !item.isComplete})
      })
    }
  }

  onInput(event) {
    if (event.keyCode === 13) {
      let value = event.target.value.trim()
      if (!value) return

      this.setState({
        newItem: '',
        toDoItems: [
          { title: value, isComplete: false },
          ...this.state.toDoItems
        ]
      })
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    })
  }

  render() {
    const {toDoItems, newItem} = this.state
    return (
      <div className="App">
        <div className='Header'>
          <img src={tick} witdh={32} height={32} alt="tick"/>
          <input
            type='text'
            placeholder="Add new item"
            onKeyUp={this.onInput}
            onChange={this.onChange}
            value={newItem}
          />
        </div>
        {
          toDoItems.length > 0 ?
            toDoItems.map((item, index) =>
              <ToDoItem
                key={index}
                content={item}
                onClick={this.onItemClick(item)}
              />) : 'Nothing here.'
        }
      </div>
    );
  }
}

export default App;
