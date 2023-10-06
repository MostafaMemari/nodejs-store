const redisClient = require("../utils/init-redis");
const { HomeRoutes } = require("./api");
const { UserAuthRouter } = require("./user/auth");

const router = require("express").Router();

router.use("/user", UserAuthRouter);
router.use("/", HomeRoutes);

module.exports = {
  AllRouter: router,
};
