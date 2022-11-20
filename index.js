require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const port = process.env.PORT | 5000;
const app = express();
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
const facilityRouter = require("./routes/facility.route");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("", donationRouter);
app.use("", broadcastRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/address", addressRouter);
app.use("/facility", facilityRouter);

app.get("", (req, res) => {
  res.json({
    message: "Dona Server Running...",
  });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
