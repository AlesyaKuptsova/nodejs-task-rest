import { Module } from '@nestjs/common';
import { CustomLogger } from './logger';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
    providers: [LoggingInterceptor, CustomLogger],
    exports: [LoggingInterceptor, CustomLogger],
})
export class LoggingModule {
}
