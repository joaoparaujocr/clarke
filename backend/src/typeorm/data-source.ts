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
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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
