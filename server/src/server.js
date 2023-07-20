const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const route = require("./api/routes/index.route");
const appConfig = require("./config/app.config");

//? Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const corsOptions = {
  // origin: 'http://localhost:3001',
  exposedHeaders: "Authorization",
  // accept client get value in header
};
app.use(cors(corsOptions));
app.use(morgan("dev"));

//? Export API
app.get("/", (req, res, next) => {
  res.status(200).json({
    name: "Suport CTU - Backend",
    code: "CT466",
    author: "Nguyen Anh Nam, Nguyen Bach Khiem",
  });
});
route(app);

//Catch Error
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Log Error
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

//? Listening
const PORT = appConfig.port;
app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Server listening`);
});
