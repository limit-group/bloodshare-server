require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const swaggerUi = require("swagger-ui-express");
const port = 5000;
const swaggerDocument = require("./swagger.json");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/users.routes");
app.use("/auth", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("", (req, res) => {
  res.json({
    message: "Dona Server Running...",
  });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
