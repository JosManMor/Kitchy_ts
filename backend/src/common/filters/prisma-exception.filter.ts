import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { Request, Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database error';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'Resource already exists';
        break;

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Resource not found';
        break;

      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid related resource';
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Database operation failed';
    }

    this.logger.error(
      `Prisma error ${exception.code}: ${exception.message}`,
      exception.stack,
    );

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
