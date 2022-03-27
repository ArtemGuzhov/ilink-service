import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express, { json } from "express";
import http from "http";
import mongoose from "mongoose";
import { schema } from "./shema";
import { dataSources } from "./chuckApi";
import bodyParser from "body-parser";

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(bodyParser.json());

  await mongoose
    .connect(
      "mongodb+srv://guzhov:qwerty123@cluster0.jvbg4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log(error));

  const server = new ApolloServer({
    schema,
    dataSources,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 8008 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:8008/`);
}

startApolloServer();
