const Joi = require("@hapi/joi");
const { MongoIDPatern } = require("../../../utils/constans");
const addCategorySchema = Joi.object({
  title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمی باشد")),
  parent: Joi.string().allow("").pattern(MongoIDPatern).error(new Error("شناسه وارد شده صحیح نمی باشد")),
});

module.exports = {
  addCategorySchema,
};
