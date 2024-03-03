import { Response } from "express";

class ResponseHandler {
  static success(res: Response, data: any, statusCode = 200, message?: string) {
    const responseObject: Record<string, any> = {
      timestamp: new Date().toISOString(),
      success: true,
      status: statusCode,
      data: data,
    };

    if (message) {
      responseObject.message = message;
    }

    res.status(statusCode).json(responseObject);
  }

  static redirect(res: Response, url: string, statusCode = 302) {
    res.redirect(statusCode, url);
  }
}

export { ResponseHandler };
