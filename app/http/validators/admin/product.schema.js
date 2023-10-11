const Joi = require("@hapi/joi");
const { MongoIDPatern } = require("../../../utils/constans");
const createHttpError = require("http-errors");
const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
  text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
  tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
  category: Joi.string().regex(MongoIDPatern).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
  type: Joi.string()
    .regex(/(virtual|physical)/i)
    .error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
  price: Joi.number().error(createHttpError.BadRequest("قیمت وارد شده صحیح نمی باشد")),
  count: Joi.number().error(createHttpError.BadRequest("تعداد وارد شده صحیح نمی باشد")),
  discount: Joi.number().error(createHttpError.BadRequest("تخفیف وارد شده صحیح نمی باشد")),
  height: Joi.number().allow(null, 0, "0", "").error(createHttpError.BadRequest("ارتفاع وارد شده صحیح نمی باشد")),
  weight: Joi.number().allow(null, 0, "0", "").error(createHttpError.BadRequest("وزن وارد شده صحیح نمی باشد")),
  width: Joi.number().allow(null, 0, "0", "").error(createHttpError.BadRequest("عرض وارد شده صحیح نمی باشد")),
  length: Joi.number().allow(null, 0, "0", "").error(createHttpError.BadRequest("طول وارد شده صحیح نمی باشد")),
  colors: Joi.array().min(0).max(20).error(createHttpError.BadRequest("رنگ ارسال شده صحیح نیم باشد")),

  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  fileUploadPath: Joi.allow(),
});

module.exports = {
  createProductSchema,
};
