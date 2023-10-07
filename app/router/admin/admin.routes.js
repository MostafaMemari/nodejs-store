const { CategoryRoutes } = require("./category");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *   -  name: Admin-Panel
 *      description : action of admin (add , remove , edit , and anu do)
 *   -  name: Caregory(AdminPanel)
 *      description : all method and about category section
 *
 */

router.use("/category", CategoryRoutes);

module.exports = {
  AdminRoutes: router,
};
