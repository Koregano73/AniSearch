import React, { useState } from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

export default function Login() {
  const [username, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();
  const handleSubmit = async (e:React.FormEvent<EventTarget>) => {
    e.preventDefault(); 
    try {
      const userLogin = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      if (userLogin.ok) {
        setMessage('Logged In! Redirecting...');
        setTimeout(() => {
          navigate('/homepage')}, 2000);
        return userLogin.json();
      }
      throw new Error('Something went wrong: status 500');
    }
    catch (err) {
      setMessage('Incorrect username/password, please try again.');
      navigate('/');
    }
  }
  return (
    <div className='outerBox'>
      <header><strong>AniSearch Account Login</strong></header>
      <form onSubmit={void handleSubmit} >
        <label>
          Username:
          <input type="text" placeholder='Username' onChange={(event:React.FormEvent<EventTarget>) => {
            const target = event.target as typeof event.target & { value: string }
            setUserName(target.value)}}></input>
        </label>
        <label>
          Password:
          <input type="password" placeholder='Password' onChange={(event:React.FormEvent<EventTarget>) => {
            const target = event.target as typeof event.target & { value: string }
            setPassword(target.value)}}></input>
        </label>
        <input className='button' type="submit" value="Login"></input>
      </form>
      <div style={{color:"red"}}>{message}</div>
      <Link to="/register">
        <button type="button">Register</button>
      </Link>
    </div>
  )
}


