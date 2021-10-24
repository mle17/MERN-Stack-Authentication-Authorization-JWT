import React from "react";
import { Button } from "react-bootstrap";
import TodoService from "../Services/TodoService";

const TodoItem = (props) => {
  return (
    <>
      <li>{props.todo.name}</li>
      <Button variant="danger" 
        onClick={e=>props.onDelete(e,props.id)}>Delete</Button>
    </>);
};

export default TodoItem;
