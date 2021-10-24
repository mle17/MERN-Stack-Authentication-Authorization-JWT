import React from "react";
import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

const TodoItem = (props) => {
  const [editTodoName, setEditTodoName] = useState(props.todo.name);
  const [todo, setTodo] = useState(props.todo);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <li>{todo.name}</li>
      <Button
        variant="danger"
        onClick={(e) => props.onDelete(e, props.todo._id)}
      >
        Delete
      </Button>

      {/* Edit option */}
      {isEditing ? (
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setEditTodoName(e.target.value)}
          />
          <Button
            variant="secondary"
            id="button-addon2"
            onClick={(e) => {
              props.onEdit(e, { ...props.todo, name: editTodoName });
              setTodo({ ...props.todo, name: editTodoName })
              setIsEditing(false);
            }}
          >
            Submit
          </Button>
        </InputGroup>
      ) : (
        <Button
          variant="secondary"
          id="button-addon2"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
      )}
    </>
  );
};

export default TodoItem;
