const { PermissionController } = require("../../http/controllers/admin/RBAC/permission.controller");

const router = require("express").Router();

router.get("/list", PermissionController.getAllPermissions);

module.exports = {
  AdminApiPermissionRouter: router,
};
