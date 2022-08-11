const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./controllers/userController');

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../build')));
// login page
const mongoURI = 'mongodb://localhost/soloproject';
mongoose.connect(mongoURI);
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

// login
app.post('/login', userRouter.verifyUser, (req, res) => {
  res.status(200).json({ session: res.locals.loggedIn });
});

// register
app.post('/register', userRouter.createUser, (req, res) => {
  res.status(200).json({ user: res.locals.user });
});
// redirect to user page to search and add
app.use('*', (req, res) => {
  res.redirect('/');
});
// global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express Error handler caught in unknown middleware err',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errObj = Object.assign(defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
