const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const trackRoutes = require("./src/routes/trackRoutes");
const fineticRoutes = require("./src/routes/fineticRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./src/middlewares/requireAuth");
require("./src/models/User");
require("./src/models/Track");

const app = express();
app.use(bodyParser.json());

app.use(authRoutes);
app.use(trackRoutes);
app.use(fineticRoutes);

connectDB();

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
