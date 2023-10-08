const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *   -  name: Admin-Panel
 *      description : action of admin (add , remove , edit , and anu do)
 *   -  name: Caregory(AdminPanel)
 *      description : all method and about category section
 *   -  name: Blog(AdminPanel)
 *      description : make blog managment admin panel
 *
 */

router.use("/category", CategoryRoutes);
router.use("/blogs", verifyAccessToken, BlogAdminApiRoutes);

module.exports = {
  AdminRoutes: router,
};
