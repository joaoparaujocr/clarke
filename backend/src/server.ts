import "reflect-metadata"
import fastify from "fastify"
import { appDataSource } from "./typeorm/data-source"
import dbConn from "typeorm-fastify-plugin"
import { ApolloServer } from "@apollo/server"
import { buildGraphQLSchema } from "./buildGraphQLSchema"
import fastifyApollo, { fastifyApolloDrainPlugin } from "@as-integrations/fastify";

export const server = async () => {
  const PORT = 3333
  const app = fastify()

  app.register(dbConn, {
    connection: appDataSource
  })

  const schema = await buildGraphQLSchema()

  const apolloServer = new ApolloServer({ schema, plugins: [fastifyApolloDrainPlugin(app)], });
  await apolloServer.start();

  await app.register(fastifyApollo(apolloServer));

  app.get('/hello', (req, res) => res.send('Hello world'))

  app.listen({
    host: '0.0.0.0',
    port: PORT
  }).then(() => console.log(`🚀 Server runnning http://localhost/${PORT}\nGraphQL http://localhost/${PORT}`))
}

server()