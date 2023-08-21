import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from 'react';
import api from "./utils/api"

function App() {
  const [todoList,setTodoList]=useState([])
  const [todoValue,setTodoValue]=useState('')
  const getTasks=async()=>{
const response = await api.get('/task')
console.log(response,'eeeeeeeeeeee')
setTodoList(response.data.data);
  }
// add task
  const addTask=async()=>{
try{
const response = await api.post('/task',{task:todoValue,IsComplete:false})
if(response.status === 200){
  console.log('성공!')
  setTodoValue("")
  getTasks()
}else{
  throw new Error('task can not be added!')
}
}catch(err){
console.log('error',err)
}
  }
// update task
const updateTask=async(id)=>{
  try{
    const task=todoList.find((item)=>item._id=== id)
    const res = await api.put(`/task/${id}`,{IsComplete:!task.IsComplete})
    if(res.status === 200){
      console.log('success')
      getTasks()
    }
  }catch(err){
    console.log('error',err)
  }
}

// delete task
const deleteTask=async(id)=>{
  try{
const res = await api.delete(`/task/${id}`);
if(res.status === 200){
  console.log('deleted')
  getTasks()
}

  }catch(err){
    console.log('error',err)
  }
}

  useEffect(()=>{
    getTasks()

  },[])
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event)=>setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button onClick={addTask} className="button-add">추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} updateTask={updateTask} deleteTask={deleteTask} />
    </Container>
  );
}

export default App;
