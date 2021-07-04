
import { ArgumentsHost , BadRequestException, Catch } from '@nestjs/common';

import { BaseExceptionFilter } from '@nestjs/core';

import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DbExceptionFilter extends BaseExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    super.catch(new BadRequestException(exception.message), host);
  }
}