import "./List.css"
import TodoItem from "./TodoItem"
import { useState } from "react"

const List = ({todos}) => { // 부모 컴포넌트인 App.jsx에서 props로 전달받는 Todo항목 배열인 todos를 가져옴

  const [search, setSearch] = useState(""); // 검색어 저장 상태

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const getFilteredData = () => {
    if(search == "") {
      return todos;
    }
    return todos.filter((todo) => // 화살표 함수에서 {}를 빼면 암묵적으로 값을 return 함
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredData = getFilteredData();

  return (
    <div className="List">
      <h4>🌱 Todo List</h4>
      <input value={search} onChange={onChangeSearch} placeholder="검색어를 입력하세요" />
      <div className="todos_wrapper">
        {filteredData.map((todo) => {
          return <TodoItem key={todo.id} {...todo}/>
        })}
      </div>
    </div>
  )
}

export default List;