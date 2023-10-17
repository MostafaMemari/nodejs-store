const { UserController } = require("../../http/controllers/admin/user/user.controller");
const router = require("express").Router();

router.get("/list", UserController.getAllUsers);

module.exports = {
  AdminApiUserRouter: router,
};
