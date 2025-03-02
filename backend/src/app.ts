import fastify from "fastify"
import { appDataSource } from "./typeorm/data-source"
import dbConn from "typeorm-fastify-plugin"

export const app = fastify()

app.register(dbConn, {
  connection: appDataSource
})

app.get('/hello', (req, res) => res.send('Hello world'))
