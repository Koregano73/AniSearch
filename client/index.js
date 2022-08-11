import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// hydrate used for already rendered HTML
render(
  // eslint-disable-next-line react/jsx-filename-extension
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
);
