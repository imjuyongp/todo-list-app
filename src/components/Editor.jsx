import "./Editor.css"
import { useState, useRef } from "react"

const Editor = ({onCreate}) => { // 부모(App)으로 부터 onCreate함수를 props로 받음. Todo 생성 시 호출
  const [content, setContent] = useState("") // 입력 필드의 텍스트 값을 저장
  const contentRef = useRef() // 입력 필드에 포커스를 주기 위한 참조

  // 이벤트 헨들러
  const onChangeContent = (e) => { // 입력 값이 변경될 때 content state 업데이트
    setContent(e.target.value);
  }

  const onKeyDown = (e) => { // Enter 키 입력 시 onSubmit 호출
    if(e.keyCode === 13) {
      onSubmit();
    }
  }

  // 제출(여기서는 추가)
  const onSubmit = () => { // 빈 값이면 입력창에 포커스, 아니면 onCreate 호출 후 입력 창 초기화
    if(content==="") { // 빈 문자열이면 
      contentRef.current.focus(); // 입력창에 포커스
      return;
    }
    onCreate(content); // 아니면 onCreate 호출
    setContent(""); // 입력 창 초기화
  }

  return (
    <div className="Editor">
      <input ref={contentRef} value={content} onKeyDown={onKeyDown} onChange={onChangeContent} placeholder="새로운 Todo..."/>
      <button onClick={onSubmit}>추가</button>
    </div>
  )
}

export default Editor;