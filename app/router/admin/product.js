const { ProductController } = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      Color:
 *        type: array
 *        items:
 *          type: string
 *          enum:
 *            - black
 *            - white
 *            - gray
 *            - red
 *            - blue
 *            - green
 *            - orange
 *            - purple
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Products:
 *        type: object
 *        required:
 *          - title
 *          - short_text
 *          - text
 *          - tags
 *          - category
 *          - price
 *          - discount
 *          - count
 *        properties:
 *          title:
 *            type: string
 *            description: the title of products
 *          short_text:
 *            type: string
 *            description: the short_text of products
 *          text:
 *            type: string
 *            description: the text of products
 *          tags:
 *            type: array
 *            description: the tags of products
 *          category:
 *            type: string
 *            description: the category of products
 *          price:
 *            type: string
 *            description: the price of products
 *          count:
 *            type: string
 *            description: the count of products
 *          discount:
 *            type: string
 *            description: the discount of products
 *          images:
 *            type: array
 *            items:
 *              type: string
 *              format: binary
 *          height:
 *            type: string
 *            description: the height of products
 *            example: 0
 *          weight:
 *            type: string
 *            description: the weight of products
 *            example: 0
 *          width:
 *            type: string
 *            description: the with of products
 *            example: 0
 *          length:
 *            type: string
 *            description: the length of products
 *            example: 0
 *          type:
 *            type: string
 *            description: the type of product
 *            example: virtual - physical
 *          colors:
 *            $ref: '#/components/schemas/Color'
 */

/**
 * @swagger
 * /admin/products/add:
 *  post:
 *    tags : [Product(AdminPanel)]
 *    summary: create and save product
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/Products"
 *    responses:
 *      201:
 *        description: created new product
 *
 */
router.post("/add", uploadFile.array("images", 10), stringToArray("tags"), stringToArray("colors"), ProductController.addProduct);

/**
 * @swagger
 * /admin/products/all:
 *  get:
 *    tags : [Product(AdminPanel)]
 *    summary: get all products
 *    responses:
 *      201:
 *        description: created new product
 *
 */
router.get("/all", ProductController.getAllProduct);

/**
 * @swagger
 * /admin/products/{id}:
 *  get:
 *    tags : [Product(AdminPanel)]
 *    summary: get One product By ID
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: ObjectId of Product
 *    responses:
 *      200:
 *        description: success
 *
 */
router.get("/:id", ProductController.getOneProduct);

module.exports = {
  AdminApiProductRouter: router,
};
