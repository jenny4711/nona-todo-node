import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({item,updateTask,deleteTask}) => {
  console.log(item.IsComplete,'item')
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button onClick={()=>deleteTask(item._id)} className="button-delete">삭제</button>
            <button onClick={()=>updateTask(item._id)} className="button-delete">{item.IsComplete?'끝남':'안끝남'}</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
