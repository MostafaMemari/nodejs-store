const createHttpError = require("http-errors");
const { ProductModel } = require("../../../models/products");
const { deleteFileInPublic, listofImagesFormRequest } = require("../../../utils/functions");
const { createProductSchema } = require("../../validators/admin/product.schema");
const { objectIdValidator } = require("../../validators/public.validator");
const Controller = require("../controller");
const path = require("path");
class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const images = listofImagesFormRequest(req?.files || [], req.body.fileUploadPath);
      const productBody = await createProductSchema.validateAsync(req.body);
      let image = path.join(productBody.fileUploadPath, productBody.filename);
      image = image.replace(/\\/g, "/");

      const { title, short_text, text, tags, category, price, count, discount, height, weight, width, length, colors, type } = req.body;
      const supplier = req.user._id;
      let feture = {
        width,
        height,
        weight,
        length,
        colors,
      };
      const product = await ProductModel.create({
        title,
        short_text,
        text,
        tags,
        category,
        price,
        count,
        discount,
        images,
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
      const { id } = req.params;
      const product = await this.findProductById(id);
      return res.status(200).json({
        statusCode: 200,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const removeProductResult = await ProductModel.deleteOne({ _id: product._id });
      if (removeProductResult.deletedCount == 0) throw createHttpError.InternalServerError("حذف محصول با خطا مواجه شد");
      return res.status(200).json({
        statusCode: 200,
        message: "حذف محصول با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async findProductById(productID) {
    const { id } = await objectIdValidator.validateAsync({ id: productID });
    const product = await ProductModel.findById(id);
    if (!product) throw createHttpError.NotFound("محصولی یافت نشد");
    return product;
  }
}

module.exports = {
  ProductController: new ProductController(),
};
