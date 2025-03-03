import { DataSource } from 'typeorm';
import 'dotenv/config'

export const appDataSource = new DataSource(process.env.NODE_ENV === "test" ?
  {
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    entities: ["src/migrations/entities/*.ts"]
  } : {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.NODE_ENV === "dev" ? true : false,
    logging: process.env.NODE_ENV === "dev" ? true : false,
    migrationsRun: false,
    ...(process.env.NODE_ENV === 'dev' ? {
      entities: ['src/typeorm/entities/*.ts'],
      migrations: ['src/typeorm/migrations/*.ts']
    } : {
      entities: ['src/typeorm/entities/*.js'],
      migrations: ['src/typeorm/migrations/*.js']
    })
  });
