import React from 'react'
import TodoForm from './TodoForm';
import Todo from './Todo'

export default class TodoList extends React.Component{
    state={
        todos: [],
        todoToShow: 'all',
        toggleAllComplete: true
    }

    addTodo= (todo)=>{
        const newTodos= [todo, ...this.state.todos]
        this.setState({
            todos: newTodos
        })
    }

    toggleComplete = (id)=>{
        this.setState({
            todos: this.state.todos.map(todo=>{
                if (todo.id===id){
                    return {
                        ...todo,
                        complete: !todo.complete
                    }
                }
                else{
                    return todo
                }
            })
        })
    }

    onDelete=(id)=>{
        this.setState({
            todos: this.state.todos.filter(todo=>todo.id!==id)
        })
    }

    removeTodosComplete=()=>{
        this.setState({
            todos: this.state.todos.filter(todo=> !todo.complete)
        })
    }

    updateTodoToShow = (s)=>{
        this.setState({
            todoToShow: s
        })
    }

    toggleAllTodosComplete = ()=>{
        this.setState({
            todos: this.state.todos.map(todo=>({
                ...todo,
                complete: this.state.toggleAllComplete
            })),
            toggleAllComplete: !this.state.toggleAllComplete
        })
    }

    render(){
        let todos=[]
        if (this.state.todoToShow==='all'){
            todos=this.state.todos
        }
        else if (this.state.todoToShow==='active'){
            todos=this.state.todos.filter(todo=> !todo.complete)
        }
        else if (this.state.todoToShow==='complete'){
            todos=this.state.todos.filter(todo=> todo.complete)
        }

        return(
            <div>
                <TodoForm onSubmit={this.addTodo}/>
                {todos.map(todo=>(
                    <Todo 
                        key={todo.id} 
                        todo={todo}
                        onDelete={()=> this.onDelete(todo.id)}
                        toggleComplete={()=> this.toggleComplete(todo.id)}/>
                ))}
                <div>Todo not complete: {this.state.todos.filter(todo=> !todo.complete).length}</div>
                <div>
                    <button onClick={()=> this.updateTodoToShow('all')}>All</button>
                    <button onClick={()=> this.updateTodoToShow('active')}>Active</button>
                    <button onClick={()=> this.updateTodoToShow('complete')}>Complete</button>
                </div>
                {
                    this.state.todos.some(todo=> todo.complete) ? (
                        <div>
                            <button onClick={this.removeTodosComplete}>Remove all complete</button>
                        </div>
                    ) : null
                }
                <div onClick={this.toggleAllTodosComplete}>
                    <button>Toggle all complete: {`${this.state.toggleAllComplete}`}</button>
                </div>
            </div>
        )
    }
}