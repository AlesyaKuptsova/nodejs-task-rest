import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
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
})
export class AppModule {}
