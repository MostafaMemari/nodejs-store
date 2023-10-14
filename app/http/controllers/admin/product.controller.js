const createHttpError = require("http-errors");
const { ProductModel } = require("../../../models/products");
const { deleteFileInPublic, listofImagesFormRequest, copyObject, setFeatures, deleteInvalidPropertyInObject } = require("../../../utils/functions");
const { createProductSchema } = require("../../validators/admin/product.schema");
const { objectIdValidator } = require("../../validators/public.validator");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const path = require("path");
const ProductBlackList = {
  BOOKMARKS: "bookmarks",
  LIKES: "likes",
  DISLIKES: "dislikes",
  COMMENTS: "comments",
  SUPPLIER: "supplier",
  WEIGHT: "weight",
  WIDTH: "width",
  LENGTH: "length",
  HEIGHT: "height",
  COLORS: "colors",
};
Object.freeze(ProductBlackList);
class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const images = listofImagesFormRequest(req?.files || [], req.body.fileUploadPath);
      const productBody = await createProductSchema.validateAsync(req.body);
      let image = path.join(productBody.fileUploadPath, productBody.filename);
      image = image.replace(/\\/g, "/");

      const { title, short_text, text, tags, category, price, count, discount, type } = req.body;
      const supplier = req.user._id;

      // let features = {
      //   width,
      //   height,
      //   weight,
      //   length,
      //   colors,
      // };

      const features = setFeatures(req.body);

      await ProductModel.create({
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
        features,
        type,
      });
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "ثبت محصول با موفقیت ایجاد شد",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      let blackListFields = Object.values[ProductBlackList];

      const data = copyObject(req.body);
      data.images = listofImagesFormRequest(req?.files || [], req.body.fileUploadPath);
      data.features = setFeatures(req.body);
      deleteInvalidPropertyInObject(data, blackListFields);
      const updateProductResult = await ProductModel.updateOne({ _id: product._id }, { $set: data });
      if (updateProductResult.modifiedCount == 0) throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "خطای داخلی" };
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "به روز رسانی با موفقیت انجام شد",
          data,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req, res, next) {
    try {
      const search = req?.query?.search || "";
      let products = null;
      if (search) {
        products = await ProductModel.find({
          $text: {
            $search: search,
          },
        });
      } else {
        products = await ProductModel.find({});
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          products,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          product,
        },
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
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "حذف محصول با موفقیت انجام شد",
        },
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
