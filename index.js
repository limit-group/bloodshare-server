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
const authRouter = require("./routes/auth.route");
const profileRouter = require("./routes/profile.route");
const donationRouter = require("./routes/donation.route");
const addressRouter = require("./routes/address.route");
const broadcastRouter = require("./routes/broadcast.route");
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("", donationRouter);
app.use("/address", addressRouter);
app.use("", broadcastRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("", (req, res) => {
  res.json({
    message: "Dona Server Running...",
  });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
