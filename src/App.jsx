import './App.css'
import Header from "./components/Header"
import Editor from './components/Editor'
import List from './components/List'

import { useState, useRef, useReducer} from 'react'

function reducer(state, action) {
  switch(action.type) {
    case 'CREATE' : return [action.data, ...state] 
    case 'UPDATE' : return state.map(
      (item)=>item.id === action.targetId
      ? {...item, isDone: !item.isDone} 
      : item
    );
    case 'DELETE' : return state.filter((item)=> item.id !== action.targetId)
    default : return state;
  }

}

function App() {
  // const [todos, setTodos] = useState([]) // Todo 목록 배열
  const [todos, dispatch] = useReducer(reducer, []); // todos배열의 상태변화는 reducer함수에서 관리 (초기 값은 빈 배열 => 상태를 배열로 저장함)
  const idRef = useRef(0)

  const onCreate = (content) => { // 새 Todo 객체 생성 후 목록 맨 앞에 추가
    dispatch({
      type : "CREATE",
      data : {
        id : idRef.current++,
        isDone : false,
        content : content,
        date : new Date().getTime(),
      }
    })
  }

  const onUpdate = (targetId) => { // 체크박스가 클릭된 TodoItem의 id를 받아옴
    dispatch({
      type : "UPDATE",
      targetId : targetId,
    })
  };

  const onDelete = (targetId) => { // 삭제된 todoItem을 제외한 새로운 배열을 반환
    dispatch({
      type : "DELETE",
      targetId : targetId,
    })
  }

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate}/> 
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  )
}

export default App
