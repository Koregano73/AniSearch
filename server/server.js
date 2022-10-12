const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./controllers/userController');
const cookieRouter = require('./controllers/cookieController');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../build')));

// login page
const myURI = 'mongodb+srv://Chris:test@gradassessment.ywrnwbq.mongodb.net/?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;
mongoose.connect(URI);
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

// login
app.post('/login', userRouter.verifyUser, cookieRouter.setSSIDCookie, (req, res) => {
  res.status(200).json({ session: res.locals.loggedIn });
});

// register
app.post('/register', userRouter.createUser, (req, res) => {
  res.status(200).json({ user: res.locals.user });
});

//add new search entry to user's library
app.post('/homepage', userRouter.addToLibrary, (req, res) => {
  res.status(200).json({ entry: res.locals.saved });
});

// load all user's library data to library page
app.get('/library', userRouter.getLibrary, (req, res) => {
  return res.status(200).json(res.locals.library);
});

// delete entry from library
app.delete('/library', userRouter.deleteLibrary, (req, res) => {
  return res.status(200).json(res.locals.newLibrary);
})
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
