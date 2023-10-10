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
 *          image:
 *            type: file
 *            description: the image of products
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

router.post("/add", uploadFile.single("image"), stringToArray("tags"), ProductController.addProduct);
// router.patch();
// router.delete();
// router.get();
// router.get();

module.exports = {
  AdminApiProductRouter: router,
};
