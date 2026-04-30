import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isProduction = process.env.NODE_ENV === 'production';

    this.logger.error(
      `[${request.method}] ${request.url} -> Unhandled Exception`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      isProduction
        ? {
            success: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'An unexpected error occurred',
          }
        : {
            success: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
            timestamp: new Date().toISOString(),
            path: request.url,
            message:
              exception instanceof Error
                ? exception.message
                : 'Unknown internal error',
            stacktrace:
              exception instanceof Error ? exception.stack : String(exception),
          },
    );
  }
}
