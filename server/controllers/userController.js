const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userController = {};
// create user- connect to mongodb user document schema and create a user if not in database
userController.createUser = (req, res, next) => {
  console.log(req.body);
  const salt_rounds = 10;
  const { username, password } = req.body;
  const saltedPassword = bcrypt.hashSync(password, salt_rounds);
  User.create({ username, password: saltedPassword })
    .then((user) => {
      console.log('this is user', user);
      res.locals.user = user;
      return next();
    })
    .catch((err) => next(err));
};

userController.verifyUser = (req, res, next) => {
  console.log('this is req.body', req.body);
  const { username, password } = req.body;
  if (!username || !password) { return next('Missing username or password in userController.verifyUser.'); }
  User.findOne({ username })
    .then((user) => {
      console.log('this user is verified', user);
      bcrypt.compare(password, user.password)
        .then(result => {
          res.locals.loggedIn = user;
          res.locals.userId = user._id;
          return next(); 
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

userController.loginUser = (req, res, next) => {
  console.log('this is params', req.params);
  const { username, password } = req.params;
  if (!username || !password) { return next('Missing username or password in userController.loginUser.'); }
  User.findOne({ username, password })
    .then((user) => {
      console.log('this user is verified', user);
      res.locals.loggedIn = user;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = userController;
