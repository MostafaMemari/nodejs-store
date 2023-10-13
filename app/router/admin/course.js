const { CourseController } = require("../../http/controllers/admin/course.controller");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/courses/list:
 *    get:
 *      tags: [Course(AdminPanel)]
 *      summery: get All of courses
 *      parameters:
 *        - in: query
 *          name: search
 *          description: text for search in title , text , short_text of (product)
 *          type: string
 *      responses:
 *        200:
 *          description: success
 */
router.get("/list", CourseController.getListOfProduct);

module.exports = {
  AdminApiCourseRouter: router,
};
