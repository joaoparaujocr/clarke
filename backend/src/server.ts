import "reflect-metadata"
import 'dotenv/config'
import fastify from "fastify"
import { appDataSource } from "./typeorm/data-source"
import dbConn from "typeorm-fastify-plugin"
import { ApolloServer } from "@apollo/server"
import { buildGraphQLSchema } from "./buildGraphQLSchema"
import fastifyApollo, { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"
import cors from '@fastify/cors'
import { handleError } from "./error/handleError"
import { ContextType } from "./context/context.dto"
import { contextApolloServer } from "./context"

export const server = async () => {
  const PORT = 3333
  const app = fastify()

  app.register(cors, {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    hook: 'preHandler',
  });

  app.register(dbConn, {
    connection: appDataSource
  })

  app.register(fastifyJwt, {
    secret: process.env.SECRET_KEY as string,
    sign: {
      expiresIn: "60m"
    },
    cookie: {
      signed: false,
      cookieName: 'refreshToken'
    }
  })

  app.register(fastifyCookie)

  app.setErrorHandler(handleError)

  const schema = await buildGraphQLSchema()

  const apolloServer = new ApolloServer<ContextType>({
    schema,
    plugins: [fastifyApolloDrainPlugin(app)],
    introspection: true
  });

  await apolloServer.start();

  await app.register(fastifyApollo(apolloServer), {
    path: '/graphql',
    context: contextApolloServer
  });

  app.get('/hello', (_req, res) => res.send('Hello world'))

  app.listen({
    host: '0.0.0.0',
    port: PORT
  }).then(() => console.log(`🚀 Server runnning http://localhost:${PORT}\n🚀 GraphQL http://localhost:${PORT}/graphql`))
}

server()