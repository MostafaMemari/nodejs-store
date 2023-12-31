const Joi = require("@hapi/joi");
const { MongoIDPatern } = require("../../../utils/constans");
const createHttpError = require("http-errors");
const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
  text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  filename: Joi.string()
    .pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
  category: Joi.string().pattern(MongoIDPatern).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
  fileUploadPath: Joi.allow(),
});

module.exports = {
  createBlogSchema,
};
