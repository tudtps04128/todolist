import React, { PureComponent} from 'react'
import logo from './logo.svg';
import './App.css';
import './css/todo.css'
import Header from './components/Header'
import TodoList from './components/TodoList'
import Footer from './components/Footer'
const isNotCheckedAll = (todos = []) => todos.find(todo =>!todo.isCompleted)
class App extends PureComponent{
  state = {
    todosList:[{
      id:1,
      text: 'todo 1',
      isComplete:true
    },{
      id:2,
      text: 'todo 2',
      isComplete:false
    }],
    todoEditingId :'',
    isCheckedAll:true
  }
  componentWillMount(){
    this.setState({
      isCheckedAll: !isNotCheckedAll(this.state.todosList)
    })
  }
  addTodo = (todo={}) =>{
    this.setState(preState =>({
      todosList: [...preState.todosList,todo]
    }))
  }

  getTodoEditingId = (id = '') => {
    this.setState({todoEditingId:id })
  }

  onEditTodo = (todo = {}, index = -1) => {
    if (index >=0 ){
      const {todosList: list}=this.state
      list.splice(index, 1, todo)
      this.setState({todosList: list, todoEditingId:'' })
    }
  }
  markCompleted = (id ='') =>{
    const {todosList} = this.state
    const updatedList = todosList.map(todo =>todo.id === id ? ({...todo, isCompleted: !todo.isCompleted}):todo)
    this.setState(preState => ({
      todosList:updatedList,
      isCheckedAll : !isNotCheckedAll(updatedList)
    }))
  }
  checkAllTodos = () =>{
    const {todosList,isCheckedAll} = this.state
    this.setState(preState => ({
      todosList:todosList.map(todo =>({...todo, isCompleted: !isCheckedAll})),
      isCheckedAll: !preState.isCheckedAll
    }))
  }
  render(){
    const {todosList, todoEditingId,isCheckedAll} = this.state 
  return (
    <div className="todoapp">
    
        <Header 
        addTodo={this.addTodo}
        isCheckedAll={isCheckedAll}
        />
        <TodoList  
        todosList = {todosList}
        getTodoEditingId = {this.getTodoEditingId}
        todoEditingId = {todoEditingId}
        onEditTodo={this.onEditTodo}
        markCompleted = {this.markCompleted}
        isCheckedAll={isCheckedAll}
        checkAllTodos={this.checkAllTodos}

        />
        <Footer />
        
    </div>
  )
}
}
export default App;
