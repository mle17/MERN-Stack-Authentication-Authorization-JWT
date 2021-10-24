// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import { Button, Form } from "react-bootstrap";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h3>Registration</h3>

        {/* Username */}
        <Form.Group>
          <Form.Label htmlFor="username" className="sr-only">
            Username
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={user.username}
            onChange={onChange}
            className="form-control"
            placeholder="Enter Username"
          />
        </Form.Group>

        {/* Password */}
        <Form.Group>
          <Form.Label htmlFor="password" className="sr-only">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
            className="form-control"
            placeholder="Enter Password"
          />
        </Form.Group>

        {/* User Role */}
        <Form.Group>
          <Form.Label htmlFor="role" className="sr-only">
            Role
          </Form.Label>
          <Form.Control
            type="text"
            name="role"
            value={user.role}
            onChange={onChange}
            className="form-control"
            placeholder="Enter role (admin/user)"
          />
        </Form.Group>
        <Button className="btn btn-lg btn-primary btn-block" type="submit">
          Register
        </Button>
      </Form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Register;
