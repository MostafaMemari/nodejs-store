const { AdminApiBlogRouter } = require("./blog");
const { AdminApiCategoryRouter } = require("./category");
const { AdminApiProductRouter } = require("./product");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *   -  name: Admin-Panel
 *      description: action of admin (add , remove , edit , and anu do)
 *   -  name: Product(AdminPanel)
 *      description: management products routes
 *   -  name: Caregory(AdminPanel)
 *      description: all method and about category section
 *   -  name: Blog(AdminPanel)
 *      description: make blog managment admin panel
 *
 */

router.use("/category", AdminApiCategoryRouter);
router.use("/blogs", AdminApiBlogRouter);
router.use("/products", AdminApiProductRouter);

module.exports = {
  AdminRoutes: router,
};
