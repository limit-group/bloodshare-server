require("dotenv").config();
const express = require("express");
var cors = require("cors");
const port = process.env.PORT | 5000;

const app = express();
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Function to serve all static files
// inside public directory.
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use("/avatars", express.static("avatars"));
const authRouter = require("./routes/user.route");
const donationRouter = require("./routes/donation.route");
const requestRouter = require("./routes/request.route");
const feedRouter = require("./routes/feed.route");

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
