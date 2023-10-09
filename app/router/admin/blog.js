const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 * /admin/blogs/:
 *  get:
 *    tags: [Blog(AdminPanel)]
 *    summary: get all blogs
 *    parameters:
 *      - in: header
 *        example : Bearer Token...
 *        name: access-token
 *        required: true
 *        type: string
 *        value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5Njc4MjE2MSwiZXhwIjoxNjk3Mzg2OTYxfQ.h6BPUATFRrETK-hBJlqXHyE3ywIqrem6DKq0kfYxxeo
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
 *    consumes:
 *      - multioart/form-data
 *    parameters:
 *      - in: header
 *        example : Bearer Token...
 *        name: access-token
 *        required: true
 *        type: string
 *        value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5Njc4MjE2MSwiZXhwIjoxNjk3Mzg2OTYxfQ.h6BPUATFRrETK-hBJlqXHyE3ywIqrem6DKq0kfYxxeo
 *      - in: formData
 *        name: title
 *        required: true
 *        type: string
 *      - in: formData
 *        name: text
 *        required: true
 *        type: string
 *      - in: formData
 *        name: short_text
 *        required: true
 *        type: string
 *      - in: formData
 *        name: tags
 *        example: tag1#tag2#tag3_foo
 *        required: true
 *        type: string
 *      - in: formData
 *        name: category
 *        required: true
 *        type: string
 *      - in: formData
 *        name: image
 *        required: true
 *        type: file
 *    responses:
 *      200:
 *        descriptions: success - get array of blogs
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
 *      - in: header
 *        example : Bearer Token...
 *        name: access-token
 *        required: true
 *        type: string
 *        value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5Njc4MjE2MSwiZXhwIjoxNjk3Mzg2OTYxfQ.h6BPUATFRrETK-hBJlqXHyE3ywIqrem6DKq0kfYxxeo
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
 *      - in: header
 *        example : Bearer Token...
 *        name: access-token
 *        required: true
 *        type: string
 *        value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5Njc4MjE2MSwiZXhwIjoxNjk3Mzg2OTYxfQ.h6BPUATFRrETK-hBJlqXHyE3ywIqrem6DKq0kfYxxeo
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
 *      - in: header
 *        example : Bearer Token...
 *        name: access-token
 *        required: true
 *        type: string
 *        value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5Njc4MjE2MSwiZXhwIjoxNjk3Mzg2OTYxfQ.h6BPUATFRrETK-hBJlqXHyE3ywIqrem6DKq0kfYxxeo
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
  BlogAdminApiRoutes: router,
};
