import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import './App.css';

class App extends React.Component {
  state = {
    todos: [],
    todo: '',
  };

  addTodo = todo => {
    const newTodos = [todo, ...this.state.todos];
    this.setState({
      todos: newTodos,
      todo: '',
    });
  };

  handleChange = e => {
    this.setState({
      todo: e.target.value,
    });
  };

  removedTodo = value => {
    this.setState({
      todos: this.state.todos.filter((_, index) => index !== value),
    });
  };

  render() {
    const {
      state: { todos, todo },
      addTodo,
      removedTodo,
      handleChange,
    } = this;
    return (
      <div className="App">
        <Input
          value={todo}
          onChange={handleChange}
          placeholder="Input here..."
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => addTodo(todo)}
        >
          Input
        </Button>
        {todos.map((todo, i) => (
          <p>
            {todo}
            <Button
              onClick={() => removedTodo(i)}
              variant="contained"
              color="primary"
            >
              X
            </Button>
          </p>
        ))}
      </div>
    );
  }
}

export default App;
