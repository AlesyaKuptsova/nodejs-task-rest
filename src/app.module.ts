import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { LoggingModule } from './logging/logging.module';
import { AuthModule } from './auth/auth.module';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { DbExceptionFilter } from './common/db-excetion.filter';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    LoggingModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['POSTGRES_HOST'],
      port: Number(process.env['POSTGRES_PORT']),
      username: process.env['POSTGRES_USER'],
      password: process.env['POSTGRES_PASSWORD'],
      database: process.env['POSTGRES_DB'],
      entities: [path.join(__dirname, '/entity/*.ts')],
      migrations: ['./migration/*.ts'],
      migrationsTableName: 'custom_migration_table',
      migrationsRun: true,
      }),
      ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: DbExceptionFilter,
    },
  ],
})
export class AppModule {}
