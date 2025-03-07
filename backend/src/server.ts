import "reflect-metadata"
import 'dotenv/config'
import fastify from "fastify"
import dbConn from "typeorm-fastify-plugin"
import { ApolloServer } from "@apollo/server"
import fastifyApollo, { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"
import cors from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart';
import { appDataSource } from "./typeorm/data-source"
import { buildGraphQLSchema } from "./buildGraphQLSchema"
import { handleError } from "./error/handleError"
import { ContextType } from "./context/context.dto"
import { contextApolloServer } from "./context"
import cloudinary from "./utils/uploadToCloudinary"
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary"

export const server = async () => {
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3333
  const app = fastify()

  app.register(fastifyMultipart)

  app.register(cors, {
    origin: [
      'http://localhost:3000',
      'https://clarkefrontend.vercel.app',
      'http://localhost:4173'
    ],
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

  app.get('/hello', (_req, res) => res.send('Hello world!'))

  app.post('/upload', async (req, reply) => {
    const data = await req.file();

    const buffer = await data?.toBuffer();

    const uploadToCloudinary: () => Promise<UploadApiErrorResponse | UploadApiResponse | undefined> = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer);
      });
    };

    const result = await uploadToCloudinary();

    reply.send({
      message: 'Upload bem-sucedido!',
      url: result!.secure_url,
    });
  });

  app.listen({
    host: '0.0.0.0',
    port: PORT
  }).then(() => console.log(`🚀 Server runnning http://localhost:${PORT}\n🚀 GraphQL http://localhost:${PORT}/graphql`))
}

server()