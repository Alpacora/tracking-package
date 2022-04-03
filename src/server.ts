import 'reflect-metadata'
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { UserResolver } from './user/resolvers/UserResolver';
import { TrackerResolver } from './tracker/resolvers/TrackerResolver';

async function main() {

  const app = express();

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      TrackerResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    container: Container
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req
      }
      return context;
    }
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(process.env.SERVER_PORT, () => console.log("Server running at http://localhost:4000/graphql"));
}

main();
