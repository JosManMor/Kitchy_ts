import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus() as HttpStatus;
    const exceptionResponse = exception.getResponse();

    let message = 'An unexpected error occurred';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const msg = (exceptionResponse as { message: string | string[] }).message;
      message = Array.isArray(msg) ? msg.join(', ') : msg;
    }

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `[${request.method}] ${request.url} -> ${exception.message}`,
        exception.stack,
      );
    } else {
      this.logger.warn(`[${request.method}] ${request.url} -> ${message}`);
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      error: HttpStatus[status],
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
