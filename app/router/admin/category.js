const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/category/add:
 *  post:
 *    tags: [Caregory(AdminPanel)]
 *    summery: create new category Title
 *    parameters:
 *      - in: header
 *        example : Bearer Token...
 *        name: access-token
 *        required: true
 *        type: string
 *        value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5Njc4MjE2MSwiZXhwIjoxNjk3Mzg2OTYxfQ.h6BPUATFRrETK-hBJlqXHyE3ywIqrem6DKq0kfYxxeo
 *      - in: formData
 *        type: string
 *        required: true
 *        name: title
 *      - in: formData
 *        type: string
 *        required: false
 *        name: parent
 *    responses:
 *      201:
 *        description: success
 */

router.post("/add", CategoryController.addCategory);
/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *    tags: [Caregory(AdminPanel)]
 *    summery: get All parent of category or category Heads
 *    parameters:
 *      - in: header
 *        example : Bearer Token...
 *        name: access-token
 *        required: true
 *        type: string
 *        value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5Njc4MjE2MSwiZXhwIjoxNjk3Mzg2OTYxfQ.h6BPUATFRrETK-hBJlqXHyE3ywIqrem6DKq0kfYxxeo
 *    responses:
 *      200:
 *        description: success
 */
router.get("/parents", CategoryController.getAllParents);
/**
 * @swagger
 * /admin/category/chidren/{parent}:
 *  get:
 *    tags: [Caregory(AdminPanel)]
 *    summery: get All parent of category or category Heads
 *    parameters:
 *      - in: header
 *        example : Bearer Token...
 *        name: access-token
 *        required: true
 *        type: string
 *        value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5Njc4MjE2MSwiZXhwIjoxNjk3Mzg2OTYxfQ.h6BPUATFRrETK-hBJlqXHyE3ywIqrem6DKq0kfYxxeo
 *      - in: path
 *        name: parent
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: success
 */
router.get("/chidren/:parent", CategoryController.getChildofParents);
/**
 * @swagger
 * /admin/category/all:
 *  get:
 *    tags: [Caregory(AdminPanel)]
 *    summery: get All categories
 *    parameters:
 *      - in: header
 *        example : Bearer Token...
 *        name: access-token
 *        required: true
 *        type: string
 *        value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5Njc4MjE2MSwiZXhwIjoxNjk3Mzg2OTYxfQ.h6BPUATFRrETK-hBJlqXHyE3ywIqrem6DKq0kfYxxeo
 *    responses:
 *      200:
 *        description: success
 */
router.get("/all", CategoryController.getAllCategory);
/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *    tags: [Caregory(AdminPanel)]
 *    summery: remove category with object-id
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
 *        description: success
 */
router.delete("/remove/:id", CategoryController.removeCategory);
/**
 * @swagger
 * /admin/category/list-of-all:
 *  get:
 *    parameters:
 *      - in: header
 *        example : Bearer Token...
 *        name: access-token
 *        required: true
 *        type: string
 *        value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM4ODM2NjUxMCIsImlhdCI6MTY5Njc4MjE2MSwiZXhwIjoxNjk3Mzg2OTYxfQ.h6BPUATFRrETK-hBJlqXHyE3ywIqrem6DKq0kfYxxeo
 *    tags: [Caregory(AdminPanel)]
 *    summery: get All categories without populate and nested structure
 *    responses:
 *      200:
 *        description: success
 */
router.get("/list-of-all", CategoryController.getAllCategoryWidthOutPopulate);
/**
 * @swagger
 * /admin/category/{id}:
 *  get:
 *    tags: [Caregory(AdminPanel)]
 *    summery: find category bu object-id
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
 *        description: success
 */
router.get("/:id", CategoryController.getCategoryByID);
/**
 * @swagger
 * /admin/category/update/{id}:
 *  patch:
 *    tags: [Caregory(AdminPanel)]
 *    summery: edit or update category title with object id
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
 *        required: true
 *    responses:
 *      200:
 *        description: success
 *      500:
 *        description: internalServerError
 */
router.patch("/update/:id", CategoryController.editCategoryTitle);

module.exports = {
  CategoryRoutes: router,
};
