import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';

export default function Register() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent it from doing the submit default action
    const test = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((datas) => {
        console.log('this is datas', datas);
        if (datas.ok) {
          setMessage('Registration successful! Redirecting...');
          setTimeout(() => {
            navigate('/')}, 2000);
          return datas.json();
        }
        throw new Error('Something went wrong: status 500');
      })
      .catch((err) => {
        console.log('this is error', err);
        setMessage('Username already taken, please try again');
        navigate('/register');
      });
  };
  return (
    <div className='outerBox'>
      <header><strong>Register</strong></header>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" placeholder='Username' onChange={event => setUserName(event.target.value)}></input>
        </label>
        <label>
          Password:
          <input type="password" placeholder='Password' onChange={event => setPassword(event.target.value)}></input>
        </label>
        <input className='button' type="submit" value="Register"></input>
      </form>
      <div style={{color:"red"}}>{message}</div>
      <Link to="/">
        <button type="button">Back to Login</button>
      </Link>
    </div>
  );
}
