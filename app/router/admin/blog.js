const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Blog:
 *      type: object
 *      required:
 *        - title
 *        - text
 *        - short_text
 *        - tags
 *        - category
 *        - image
 *      properties:
 *        title:
 *          type: string
 *          description: the title of blog
 *        text:
 *          type: string
 *          description: the text of blog
 *        short_text:
 *          type: string
 *          description: the short_text of blog
 *        tags:
 *          type: string
 *          description: the tags of blog
 *        category:
 *          type: string
 *          description: the category of blog
 *        image:
 *          type: file
 *          description: the image of blog
 */

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

/**
 * @swagger
 * /admin/blogs/add:
 *  post:
 *    tags: [Blog(AdminPanel)]
 *    summary: create blog document
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/Blog"
 *    responses:
 *      201:
 *        descriptions: created
 *
 */
router.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog);

/**
 * @swagger
 * /admin/blogs/{id}:
 *  get:
 *    summary: get blog By id and populate this field
 *    tags: [Blog(AdminPanel)]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true

 *    responses:
 *      200:
 *        descriptions: success
 */
router.get("/:id", AdminBlogController.getOneBlogById);

/**
 * @swagger
 * /admin/blogs/{id}:
 *  delete:
 *    summary: remove blog by ID
 *    tags: [Blog(AdminPanel)]
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true

 *    responses:
 *      200:
 *        descriptions: success
 */
router.delete("/:id", AdminBlogController.deleteBlogById);

/**
 * @swagger
 * /admin/blogs/update/{id}:
 *  patch:
 *    summary: update Blog document By Id
 *    tags: [Blog(AdminPanel)]
 *    consumes:
 *      - multioart/form-data
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *      - in: formData
 *        name: title
 *        type: string
 *      - in: formData
 *        name: text
 *        type: string
 *      - in: formData
 *        name: short_text
 *        type: string
 *      - in: formData
 *        name: tags
 *        example: tag1#tag2#tag3_foo
 *        type: string
 *      - in: formData
 *        name: category
 *        type: string
 *      - in: formData
 *        name: image
 *        type: file

 *    responses:
 *      200:
 *        descriptions: success
 */
router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.updateBlogById);

module.exports = {
  AdminApiBlogRouter: router,
};
