import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { Nav } from "react-bootstrap";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);

  const onClickLogoutHandler = () => {
    AuthService.logout()
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(false);
        }
      });
  };

  const UnauthenticatedNavBar = () => {
    return (
      <>
        <Nav.Link href="/">
          <li className="nav-item nav-link">Home</li>
        </Nav.Link>
        <Nav.Link href="/login">
          <li className="nav-item nav-link">Login</li>
        </Nav.Link>
        <Nav.Link href="/register">
          <li className="nav-item nav-link">Register</li>
        </Nav.Link>
      </>
    );
  };

  const AuthenticatedNavBar = () => {
    return (
      <>
        <Nav.Link href="/">
          <li className="nav-item nav-link">Home</li>
        </Nav.Link>
        <Nav.Link href="/todos">
          <li className="nav-item nav-link">Todos</li>
        </Nav.Link>
        {user.role === "admin" ? (
          <Nav.Link href="/admin">
            <li className="nav-item nav-link">Admin</li>
          </Nav.Link>
        ) : null}
        <button
          type="button"
          className="btn btn-link nav-item nav-link"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
      </>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Nav.Link href="/">
        <div className="navbar-brand">Todo Boilerplate</div>
      </Nav.Link>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          {isAuthenticated ? <AuthenticatedNavBar/> : <UnauthenticatedNavBar/>}
        </ul>
      </div>
    </nav>  );
};

export default Navbar;
