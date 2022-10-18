const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const Library = require('../models/libraryModel');
const userController = {};

// create user- connect to mongodb user document schema and create a user if not in database
userController.createUser = (req, res, next) => {
  const salt_rounds = 10;
  const { username, password } = req.body;
  const saltedPassword = bcrypt.hashSync(password, salt_rounds);
  User.create({ username, password: saltedPassword })
    .then((user) => {
      res.locals.user = user;
      return next();
    })
    .catch((err) => next(err));
};

// middleware used when verifying user into the homepage application or other features
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) { return next('Missing username or password in userController.verifyUser.'); }
  User.findOne({ username })
    .then((user) => {
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

// additional middleware to check user in
userController.loginUser = (req, res, next) => {
  const { username, password } = req.params;
  if (!username || !password) { return next('Missing username or password in userController.loginUser.'); }
  User.findOne({ username, password })
    .then((user) => {
      res.locals.loggedIn = user;
      return next();
    })
    .catch((err) => next(err));
};

// middleware to add current entry from user into their library
userController.addToLibrary = (req, res, next) => {
  const cookieId = req.cookies.ssid;
  User.findOneAndUpdate({ _id: cookieId },{ $addToSet: {library: req.body}})
    .then(user => {
      res.locals.saved = user;
      return next();
    })
    .catch((err) => next(err));
};

// get the user's saved favorites
userController.getLibrary = (req, res, next) => {
  const cookieId = req.cookies.ssid;
  User.findOne({ _id: cookieId })
    .then(user => {
      res.locals.library = user.library;
      return next();
    })
    .catch((err) => next(err));
};

// delete the user's library entry
userController.deleteLibrary = (req, res, next) => {
  const cookieId = req.cookies.ssid;
  User.findOneAndUpdate({ _id: cookieId }, { $pull: {library: req.body}}, { returnOriginal: false })
  .then(user => {
      res.locals.newLibrary = user.library;
      return next();
    })
    .catch((err) => next(err));
}
module.exports = userController;
