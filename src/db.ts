import { createConnection, ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import userService from './resources/users/user.service';
import { config as commonConfig } from './common/config';

dotenv.config();

const config: ConnectionOptions = {
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
};

async function withDB(func: () => void): Promise<void> {
  const connection = await createConnection(config);
  try {
    const adminPassword = commonConfig.ADMIN_PASSWORD;
    if(adminPassword) {
      userService.createUser({
        name: 'admin',
        login: 'admin',
        password: adminPassword,
      });
    }
    func();
  } catch (_) {
    await connection.close();
  }
}

export { withDB };
