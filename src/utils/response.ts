import { Response } from 'express';

export class APIResponse {
  static success(res: Response, data: any, statusCode = 200, message?: string) {
    const responseObj: Record<string, any> = {
      success: true,
      status: statusCode,
      data,
    }

    if (message) responseObj.message = message;

    res.status(statusCode).json(responseObj);
  }

  static redirect(res: Response, url: string, statusCode = 302) {
    res.redirect(statusCode, url);
  }
}