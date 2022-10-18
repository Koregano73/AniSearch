import { Request, Response, NextFunction } from 'express';

export const cookieController = {
  setSSIDCookie: (req:Request, res:Response, next:NextFunction) => {
    res.cookie('ssid', res.locals.userId, {
      secure: true,
      httpOnly: true,
    })
    return next();
  },

}