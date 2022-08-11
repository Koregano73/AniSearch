import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Library from './components/Library';
import './stylesheets/style.css';

export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/homepage" element={<Homepage />} />
        <Route exact path="/library" element={<Library />} />
      </Routes>
    </div>
  );
}
