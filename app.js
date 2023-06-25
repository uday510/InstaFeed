const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const isAuth = require("./middleware/is-auth");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json()); // to parse incoming JSON bodies

// app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://uday:S8KG7IWN4uMV8guA@cluster0.d8baq8k.mongodb.net/instafeed?retryWrites=true"
  )
  .then(() => {
    console.log(`Connected to Google Cloud Platform Tokyo Server.`);
    app.listen(4000);
  })
  .catch((err) => console.log(err));
