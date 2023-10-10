const { ProductController } = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

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
 *          weight:
 *            type: string
 *            description: the weight of products
 *          width:
 *            type: string
 *            description: the with of products
 *          length:
 *            type: string
 *            description: the length of products
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

router.post("/add", uploadFile.array("images", 10), stringToArray("tags"), ProductController.addProduct);

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
// router.patch();
// router.delete();
// router.get();
// router.get();

module.exports = {
  AdminApiProductRouter: router,
};
