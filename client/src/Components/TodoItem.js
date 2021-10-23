import React from "react";
import { Button } from "react-bootstrap";

const TodoItem = (props) => {
  return (
    <>
      <li>{props.todo.name}</li>
      <Button variant="danger">Delete</Button>
    </>);
};

export default TodoItem;
