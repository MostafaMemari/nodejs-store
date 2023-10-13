const { CourseController } = require("../../http/controllers/admin/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      Types:
 *        type: string
 *        enum:
 *          - free
 *          - chash
 *          - special
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Inseert-Course:
 *        type: object
 *        required:
 *          - title
 *          - short_text
 *          - text
 *          - tags
 *          - category
 *          - price
 *          - discount
 *          - image
 *          - type
 *        properties:
 *          title:
 *            type: string
 *            description: the title of course
 *            example: عنوان دوره
 *          short_text:
 *            type: string
 *            description: the short_text of course
 *            example: متن کوتاه تست شده
 *          text:
 *            type: string
 *            description: tthe text of course
 *            example: متن توضیحات کامل دوره به صورت تستی
 *          tags:
 *            type: array
 *            description: the tags of course
 *          category:
 *            type: string
 *            description: the category of course
 *            example: 6521150eeb73580ae4f6cb99
 *          price:
 *            type: string
 *            description: the price of course
 *            example: 250000
 *          discount:
 *            type: string
 *            description: the discount of course
 *            example: 250000
 *          image:
 *            type: string
 *            format: binary
 *          type:
 *            type: string
 *            description: the type of course
 *            $ref: '#/components/schemas/Types'

 */

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
router.get("/list", CourseController.getListOfCourse);

/**
 * @swagger
 * /admin/courses/add:
 *  post:
 *    tags: [Course(AdminPanel)]
 *    summary: create and save course
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/Inseert-Course"
 *    responses:
 *      201:
 *        description: created new course
 *
 */
router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseController.addCourse);

/**
 * @swagger
 * /admin/courses/{id}:
 *  get:
 *    tags : [Course(AdminPanel)]
 *    summary: get One course By ID
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: ObjectId of Course
 *    responses:
 *      200:
 *        description: success
 *
 */
router.get("/:id", CourseController.getCourseById);

module.exports = {
  AdminApiCourseRouter: router,
};
