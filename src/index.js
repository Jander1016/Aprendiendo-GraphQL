const express = require("express");
const { graphqlHTTP } = require("express-graphql");
import schema  from "./schema";
import { connect } from "./database"

const app = express();

connect()

app.get("/", (req, res) => {
  res.json({
    message: "Hola HP",
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    context: {
      message: "Hola HP",
    }
  })
);

//Al colocar el port=0 busca el puerto libre de forma aleatoria
app.listen(3001, function () {
  console.log("Server listening on port " + this.address().port);
});
