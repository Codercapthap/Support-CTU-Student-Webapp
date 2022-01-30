const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const cors = require("cors");
const route = require("./api/routes/index.route");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logger
app.use(morgan("dev"));

//todo routes
route(app);

//todo config variable
const appConfig = require("./config/app.config");

app.use(cors());

//todo set public folder
app.use(express.static(path.join(__dirname, "public")));

//Catch Error
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

//todo set port
const PORT = process.env.PORT || appConfig.PORT;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server listening on port http://localhost:${PORT}`);
});
