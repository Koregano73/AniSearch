import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header>Please work please I beg you</header>
        <form method="get">
          <label>
            Username:
            <input type="text" placeholder='Username'></input>
          </label>
          <label>
            Password:
            <input type="password" placeholder='Password'></input>
          </label>
          <input type="submit" value="Login"></input>
        </form>
        <Link to="/register">
          <button type="button">Register</button>
        </Link>
      </div>
    )
  }
}

export default Login;
