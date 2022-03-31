import 'reflect-metadata'
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './user/resolvers/UserResolver';

async function main() {

  const app = express();

  const schema = await buildSchema({
    resolvers: [
      UserResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({
    schema
  });


  await server.start();

  server.applyMiddleware({ app });

  app.listen(4000, () => console.log("Server running at http://localhost:4000/"));
}

main();
