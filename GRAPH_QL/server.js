import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import bodyParser from "body-parser";
import cors from "cors";


async function startServer() {
  const app = express()

  const server = new ApolloServer({
    typeDefs: `
    type Query{
      sayHello:String
    }
    `,
    resolvers: {
      Query: {
        sayHello: () => "Hello from GraphQL"
      }
    }
  })

  app.use(bodyParser.json())
  app.use(cors())

  await server.start()

  app.use('/graphql', expressMiddleware(server))

  app.listen(4000, () => {
    console.log(`'server is running'port number 4000`)
  })



}

await startServer()