const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { AllRouter } = require("./router/router");
const morgan = require("morgan");
module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.createServer();
    this.connectToMongoDB();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("run > http://localhost:" + this.#PORT);
    });
  }
  connectToMongoDB() {
    mongoose
      .connect(this.#DB_URI)
      .then(() => console.log("Connect to DB successfully...."))
      .catch((err) => {
        console.log(err.message);
      });

    mongoose.connection.on("connected", () => {
      console.log("mongoose connected To DB");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("mongoose connection is disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("disconnected");

      process.exit(0);
    });
  }
  createRoutes() {
    this.#app.use(AllRouter);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        statusCode: 404,
        message: "آدرس مورد نظر یافت نشد",
      });
    });
    this.#app.use((error, req, res, next) => {
      const statusCode = error.status || 500;
      const message = error.message || "InternalServerError";

      return res.status(statusCode).json({
        statusCode,
        message,
      });
    });
  }
};
