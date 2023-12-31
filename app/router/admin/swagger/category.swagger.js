/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        title:
 *          type: string
 *          description: the title of category
 *        parent:
 *          type: string
 *          description: the title of category
 */

/**
 * @swagger
 * /admin/category/add:
 *  post:
 *    tags: [Caregory(AdminPanel)]
 *    summery: add category
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/Category"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Category"
 *    responses:
 *      200:
 *        description: success
 */
/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *    tags: [Caregory(AdminPanel)]
 *    summery: get All parent of category or category Heads
 *    responses:
 *      200:
 *        description: success
 */
/**
 * @swagger
 * /admin/category/chidren/{parent}:
 *  get:
 *    tags: [Caregory(AdminPanel)]
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
/**
 * @swagger
 * /admin/category/all:
 *  get:
 *    tags: [Caregory(AdminPanel)]
 *    summery: get All categories
 *    responses:
 *      200:
 *        description: success
 */
/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *    tags: [Caregory(AdminPanel)]
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
/**
 * @swagger
 * /admin/category/list-of-all:
 *  get:
 *    parameters:
 *    tags: [Caregory(AdminPanel)]
 *    summery: get All categories without populate and nested structure
 *    responses:
 *      200:
 *        description: success
 */
/**
 * @swagger
 * /admin/category/{id}:
 *  get:
 *    tags: [Caregory(AdminPanel)]
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
/**
 * @swagger
 * /admin/category/update/{id}:
 *  patch:
 *    tags: [Caregory(AdminPanel)]
 *    summery: edit or update category title with object id
 *    parameters:
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
