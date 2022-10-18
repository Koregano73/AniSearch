import express from 'express';
// import express as "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
const app = express();
const port = 3000;
import path from 'path';
import mongoose from 'mongoose';
import userRouter from './controllers/userController';
import cookieRouter from './controllers/cookieController';
import dotenv from 'dotenv';

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../build')));
dotenv.config();

type ServerError = {
  log: string,
  status: number,
  message: {err: string},
};

// login page
const myURI = '';

const URI = process.env.MONGO_URI;
mongoose.connect(URI)
  .catch((err:ServerError) => {return err});

app.get('/', (req:Request, res:Response) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

// login
app.post('/login', userRouter.verifyUser, cookieRouter.setSSIDCookie, (req:Request, res:Response) => {
  res.status(200).json({ session: res.locals.loggedIn });
});

// register
app.post('/register', userRouter.createUser, (req:Request, res:Response) => {
  res.status(200).json({ user: res.locals.user });
});

//add new search entry to user's library
app.post('/homepage', userRouter.addToLibrary, (req:Request, res:Response) => {
  res.status(200).json({ entry: res.locals.saved });
});

// load all user's library data to library page
app.get('/library', userRouter.getLibrary, (req:Request, res:Response) => {
  return res.status(200).json(res.locals.library);
});

// delete entry from library
app.delete('/library', userRouter.deleteLibrary, (req:Request, res:Response) => {
  return res.status(200).json(res.locals.newLibrary);
})
// redirect to user page to search and add
app.use('*', (req:Request, res:Response) => {
  res.redirect('/');
});


// global error handler
app.use((err:ServerError, req:Request, res:Response) => {
  const defaultErr:ServerError = {
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
