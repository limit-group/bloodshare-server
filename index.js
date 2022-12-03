require("dotenv").config();
const express = require("express");
var cors = require('cors')
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const port = process.env.PORT | 5000;
const app = express();
const swaggerDocument = require("./swagger.json");
app.use(cors())
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

// app.use("api/", {
  
// })
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/", donationRouter);
app.use("/api/", broadcastRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/address", addressRouter);

app.get("", (req, res) => {
  res.json({
    message: "Dona Server Running...",
  });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
