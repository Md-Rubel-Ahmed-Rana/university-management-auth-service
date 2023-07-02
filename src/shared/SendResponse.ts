import { Response } from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */
type ResponseType = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
  };
  data?: any;
};

const sendResponse = (res: Response, data: ResponseType): void => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  });
};

export default sendResponse;
