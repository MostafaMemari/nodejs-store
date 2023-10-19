const { verifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRouter } = require("./user/auth");

const router = require("express").Router();

router.use("/user", UserAuthRouter);
router.use("/developer", DeveloperRoutes);
router.use("/admin", verifyAccessToken, AdminRoutes);

router.use("/", HomeRoutes);

module.exports = {
  AllRouter: router,
};
