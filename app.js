const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const isAuth = require("./middleware/is-auth");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).single("image"));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json()); // to parse incoming JSON bodies

app.use(isAuth);

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
