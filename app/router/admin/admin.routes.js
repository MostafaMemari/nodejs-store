const { AdminApiBlogRouter } = require("./blog");
const { AdminApiCategoryRouter } = require("./category");
const { AdminApiCourseRouter } = require("./course");
const { AdminApiProductRouter } = require("./product");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *   -  name: Admin-Panel
 *      description: action of admin (add , remove , edit , and anu do)
 *   -  name: Course(AdminPanel)
 *      description: managment course section like manage episode , chapter and courses
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
router.use("/courses", AdminApiCourseRouter);

module.exports = {
  AdminRoutes: router,
};
