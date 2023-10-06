const router = require("express").Router();
const homeController = require("../../http/controllers/api/home.controller");
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
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
 *    parameters:
 *    - in: header
 *      name: access-token
 *      example: Bearer YourToken
 *    responses:
 *      200:
 *        description: success
 *      404:
 *        description: not found
 */

router.get("/", verifyAccessToken, homeController.indexPage);

module.exports = {
  HomeRoutes: router,
};
