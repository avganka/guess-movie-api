import {NextFunction, Request, Response} from 'express';

const ErrorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    const errorStatus = 400;
    res.status(errorStatus);
    res.json({
      success: false,
      status: errorStatus,
      message: error.message || 'Something went wrong',
    });
  }
};

export default ErrorHandler;
