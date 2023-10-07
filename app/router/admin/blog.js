const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/blogs/:
 *  get:
 *    tags: [Blog(AdminPanel)]
 *    summary: get all blogs
 *    responses:
 *      200:
 *        descriptions: success - get array of blogs
 *
 */
router.get("/", AdminBlogController.getListOfBlogs);

module.exports = {
  BlogAdminApiRoutes: router,
};
