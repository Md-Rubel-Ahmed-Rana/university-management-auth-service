import { Response } from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */
type ResponseType = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: any;
};

const sendResponse = (res: Response, data: ResponseType): void => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  });
};

export default sendResponse;
