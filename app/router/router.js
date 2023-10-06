const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRouter } = require("./user/auth");

const router = require("express").Router();

router.use("/user", UserAuthRouter);
router.use("/developer", DeveloperRoutes);

router.use("/", HomeRoutes);

module.exports = {
  AllRouter: router,
};
