require("dotenv").config();
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const port = process.env.PORT | 5000;
const app = express();
const swaggerDocument = require("./swagger.json");
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const authRouter = require("./core/user/route");
const donationRouter = require("./core/donation/route");
const requestRouter = require("./core/request/route");
const feedRouter = require("./core/feed/route");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", donationRouter);
app.use("/api", requestRouter);
app.use("/api/auth", authRouter);
app.use("/api", feedRouter);

app.get("", (req, res) => {
  res.json({
    message: "Dona Server Running...",
  });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});