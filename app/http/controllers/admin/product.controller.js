const { ProductModel } = require("../../../models/products");
const { deleteFileInPublic } = require("../../../utils/functions");
const { createProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");
class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const productBody = await createProductSchema.validateAsync(req.body);
      let image = path.join(productBody.fileUploadPath, productBody.filename);
      image = image.replace(/\\/g, "/");

      const { title, short_text, text, tags, category, price, count, discount, height, weight, width, length } = req.body;
      const supplier = req.user._id;
      let feture = {};
      let type = "physical";
      if (width || height || weight || length) {
        if (!width) feture.width = 0;
        else feture.width = width;
        if (!height) feture.height = 0;
        else feture.height = height;
        if (!weight) feture.weight = 0;
        else feture.weight = weight;
        if (!length) feture.length = 0;
        else feture.length = length;
      } else {
        type = "virtual";
      }
      const product = await ProductModel.create({
        title,
        short_text,
        text,
        tags,
        category,
        price,
        count,
        discount,
        image,
        supplier,
        feture,
        type,
      });
      return res.status(201).json({
        statusCode: 201,
        message: "ثبت محصول با موفقیت ایجاد شد",
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async editProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async removeProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req, res, next) {
    try {
      const products = await ProductModel.find({});
      return res.status(200).json({
        statusCode: 200,
        products,
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  ProductController: new ProductController(),
};
