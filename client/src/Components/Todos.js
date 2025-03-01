import React, { useState, useContext, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoService from "../Services/TodoService";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";
import { ListGroup } from "react-bootstrap";

const Todos = (props) => {
  const [todo, setTodo] = useState({ name: "" });
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    TodoService.getTodos().then((data) => {
      setTodos(data.todos);
    });
  }, []);

  const onCreate = (e) => {
    e.preventDefault();
    TodoService.postTodo(todo).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        TodoService.getTodos().then((getData) => {
          setTodos(getData.todos);
          setMessage(message);
        });
      } else if (message.msgBody === "UnAuthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  const onEdit = (e, todo) => {
    e.preventDefault();

    TodoService.updateTodo(todo).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        TodoService.getTodos().then((getData) => {
          setTodos(getData.todos);
          setMessage(message);
        });
      } else if (message.msgBody === "UnAuthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  const onDelete = (e, todo) => {
    e.preventDefault();
    TodoService.deleteTodo(todo).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        TodoService.getTodos().then((getData) => {
          setTodos(getData.todos);
          setMessage(message);
        });
      } else if (message.msgBody === "UnAuthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  const onChange = (e) => {
    setTodo({ name: e.target.value });
  };

  const resetForm = () => {
    setTodo({ name: "" });
  };

  return (
    <div>
      <ListGroup className="list-group">
        {todos.map((todo) => {
          return (
            <ListGroup.Item>
              <TodoItem
                key={todo._id}
                todo={todo}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <br />
      <form onSubmit={onCreate}>
        <label htmlFor="todo">Enter Todo</label>
        <input
          type="text"
          name="todo"
          value={todo.name}
          onChange={onChange}
          className="form-control"
          placeholder="Please Enter Todo"
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Submit
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Todos;
