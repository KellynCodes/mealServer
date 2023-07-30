import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus: number;
    let message: any;
    if (exception instanceof HttpException) {
      message = exception.getResponse();
      httpStatus = exception.getStatus();
    } else {
      message = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Sorry! something unexpected happened.',
        error: 'Internal server error',
      };
      console.error(
        `Date: ${new Date().toUTCString()} || Exception: ${exception}`,
      );
    }
    const responseBody: {} = {
      message: message,
      Date: new Date().toUTCString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
