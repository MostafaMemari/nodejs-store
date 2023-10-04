const router = require("express").Router();
const homeController = require("../../http/controllers/api/home.controller");
/**
 * @swagger
 * tags:
 *  name : IndexPage
 *  description : index page route and data
 */
/**
 * @swagger
 * /:
 *  get:
 *    summary: index of routes
 *    tags : [IndexPage]
 *    description: get All need data for index page
 *    responses:
 *      200:
 *        description: success
 *      404:
 *        description: not found
 */

router.get("/", homeController.indexPage);

module.exports = {
  HomeRoutes: router,
};
