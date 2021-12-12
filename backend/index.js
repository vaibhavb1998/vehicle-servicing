// packages
const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./database/db");
const createError = require("http-errors");
const cors = require("cors");

// routes
const apiRoutes = require("./api/routes");

// express server
const app = express();

// bodyParser middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// env variables
require("dotenv").config();

// cors
app.use(
  cors({
    exposedHeaders: "authorization, x-refresh-token, x-token-expiry-time",
    origin: (origin, callback) => {
      if (true) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// connect mongodb
mongoose
  .connect(dbConfig.db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Successfully Connected."))
  .catch((err) => console.log("MongoDB connection error: ", err));

// routes
app.use("/api", apiRoutes);

// backend server
const port = 5000;
app.listen(port, () => console.log(`\nServer up and running on port ${port}!`));

// error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
