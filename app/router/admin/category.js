const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/category/add:
 *  post:
 *    tags: [Admin-Panel]
 *    summery: create new category Title
 *    parameters:
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
 *    tags: [Admin-Panel]
 *    summery: get All parent of category or category Heads
 *    responses:
 *      200:
 *        description: success
 */
router.get("/parents", CategoryController.getAllParents);
/**
 * @swagger
 * /admin/category/chidren/{parent}:
 *  get:
 *    tags: [Admin-Panel]
 *    summery: get All parent of category or category Heads
 *    parameters:
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
 *    tags: [Admin-Panel]
 *    summery: get All categories
 *    responses:
 *      200:
 *        description: success
 */
router.get("/all", CategoryController.getAllCategory);

/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *    tags: [Admin-Panel]
 *    summery: remove category with object-id
 *    parameters:
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
 * /admin/category/{id}:
 *  get:
 *    tags: [Admin-Panel]
 *    summery: find category bu object-id
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: success
 */
router.get("/:id", CategoryController.getCategoryByID);

module.exports = {
  CategoryRoutes: router,
};
