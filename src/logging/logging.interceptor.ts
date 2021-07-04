
import { HttpException , Logger , Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Observable } from 'rxjs';


import { catchError , tap } from 'rxjs/operators';
import { Maybe } from '../common/util';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logResult = (statusCode: Maybe<number>) => {
      const status = statusCode?statusCode.toString() : "unavailable";
      const httpContext = context.switchToHttp();
      const request = httpContext.getRequest();
      const {url, ip, body, query} = request;
      const bodyStr = JSON.stringify(body);
      const queryStr = JSON.stringify(query);
      this.logger.log(`request: ${ip} ${url} query=${queryStr} body=${bodyStr} status=${status}`);
    };
    return next
      .handle()
      .pipe(
        tap(() => {
            const httpContext = context.switchToHttp();
            const {statusCode} = httpContext.getResponse();
            logResult(statusCode);
        }),
        catchError((err: HttpException) => {
          if (err instanceof HttpException) {
            logResult(err.getStatus());
          } else {
            logResult(undefined);
          }
          throw(err);
        }),
      );
  }
}
