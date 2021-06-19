import {createConnection, ConnectionOptions} from "typeorm";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config: ConnectionOptions = {
    type: "postgres",
    host: process.env['POSTGRES_HOST'],
    port: Number(process.env['POSTGRES_PORT']),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    entities: [
        path.join(__dirname, "/entity/*.ts"),
    ],
    synchronize: true,
}

async function withDB(func: ()=>void): Promise<void> {
    await createConnection(config);
    func();
}

export { withDB };