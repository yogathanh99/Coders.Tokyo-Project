import React, { Component } from 'react';
import './App.css'
import ToDoItem from './components/toDo/toDoItem'

class App extends Component {
  constructor() {
    super()
    this.state = {
      toDoItems: [
        { title: "Learn React", isComplete: true },
        { title: "Learn Vue" },
        { title: "Sleep" }
      ]
    }
  }

  onItemClick(item) {
    return () => {
      this.setState({
        toDoItems: this.state.toDoItems.map(i => i !== item ? {...i} : {...i, isComplete: !item.isComplete})
      })
    }
  }

  render() {
    const {toDoItems} = this.state
    return (
      <div className="App">
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
