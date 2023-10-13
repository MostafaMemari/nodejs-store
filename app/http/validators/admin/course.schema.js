const Joi = require("@hapi/joi");
const { MongoIDPatern } = require("../../../utils/constans");
const createHttpError = require("http-errors");
const createCourseSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دوره صحیح نمیباشد")),
  text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
  category: Joi.string().regex(MongoIDPatern).error(createHttpError.BadRequest("دسته بندی دوره یافت نشد")),
  discount: Joi.number().error(createHttpError.BadRequest("تخفیف وارد شده صحیح نمی باشد")),
  type: Joi.string().regex(/(free|chash|special)/i),
  price: Joi.number().error(createHttpError.BadRequest("قیمت وارد شده صحیح نمی باشد")),
  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  fileUploadPath: Joi.allow(),
});

module.exports = {
  createCourseSchema,
};
