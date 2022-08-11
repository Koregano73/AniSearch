const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.userId, {
    secure: true,
    httpOnly: true,
  })
  return next();
}

module.exports = cookieController;