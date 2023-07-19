import {NextFunction, Request, Response} from 'express';

const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;
  if (authToken !== process.env.AUTH_TOKEN) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: 'Unauthorized',
    });
  }

  next();
};

export default authGuard;
