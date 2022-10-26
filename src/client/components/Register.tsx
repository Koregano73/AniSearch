import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();
  const handleSubmit = (event:React.FormEvent<EventTarget>) => {
    event.preventDefault(); // prevent it from doing the submit default action
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(() => {
        setMessage('Registration successful! Redirecting...');
        setTimeout(() => {
          navigate('/')}, 2000);
        return;
      })
      .catch(() => {
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
          <input type="text" placeholder='Username' onChange={(event:React.FormEvent<EventTarget>) => {
            const target = event.target as typeof event.target & { value: string };
            setUserName(target.value)}}>
          </input>
        </label>
        <label>
          Password:
          <input type="password" placeholder='Password' onChange={(event:React.FormEvent<EventTarget>) => {
            const target = event.target as typeof event.target & { value: string };
            setPassword(target.value)}}>
          </input>
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
