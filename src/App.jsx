import './App.css'
import Header from "./components/Header"
import Editor from './components/Editor'
import List from './components/List'

import { useState, useRef } from 'react'

// const mockData = [
//     {
//       id : 0,
//       isDone : false,
//       content : "React study",
//       date : new Date().getTime(),
//     },
//     {
//       id : 1,
//       isDone : false,
//       content : "spring study",
//       date : new Date().getTime(),
//     },
//     {
//       id : 2,
//       isDone : false,
//       content : "kafka study",
//       date : new Date().getTime(),
//     },
//   ];

function App() {
  const [todos, setTodos] = useState([]) // Todo 목록 배열
  const idRef = useRef(0)

  const onCreate = (content) => { // 새 Todo 객체 생성 후 목록 맨 앞에 추가
    const newTodo = {
      id : idRef.current++,
      isDone : false,
      content : content,
      date : new Date().getTime(),
    }

    setTodos([newTodo, ...todos])

  }

  const onUpdate = (targetId) => { // 체크박스가 클릭된 TodoItem의 id를 받아옴
    // todos State 값들 중에 targetId와 일치하는 id를 갖는 TodoItem의 isDone 변경

    // 인수 : todos배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 바꾼 새로운 배열
    setTodos(todos.map((todo) => {
      if(todo.id === targetId) {
        return {
          ...todo,
          isDone : !todo.isDone // 토글 기능
        }
      }
      return todo;
    }))
  }

  const onDelete = (targetId => { // 삭제된 todoItem을 제외한 새로운 배열을 반환
    // 인수 : todos배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo)=> todo.id !== targetId))
  })

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate}/> 
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  )
}

export default App
