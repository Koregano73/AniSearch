import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  
  render() {
    const handleSubmit = async (event) => {
      event.preventDefault();
      await registerUser({username, password})
    };

    return (
      <div>
        <header>Please work god please 2</header>
        <form method="post">
          <label>
            Username:
            <input type="text" placeholder='Username'></input>
          </label>
          <label>
            Password:
            <input type="password" placeholder='Password'></input>
          </label>
          <input type="submit" value="Register"></input>
        </form>
        <Link to="/">
          <button type="button">Back to Login</button>
        </Link>
      </div>
    )
  }
}

export default Register;
