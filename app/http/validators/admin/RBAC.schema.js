const Joi = require("@hapi/joi");
const { MongoIDPatern } = require("../../../utils/constans");

const addRoleSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(new Error("عنوان نقش صحیح نمی باشد")),
  permissions: Joi.array().items(Joi.string().pattern(MongoIDPatern)).error(new Error("دسترسی های ارسال شده صحیح نمی باشد")),
  description: Joi.string().min(0).max(30).error(new Error("توضیحات نقش نمی باشد")),
});
const addPermissionSchema = Joi.object({
  name: Joi.string().min(3).max(30).error(new Error("اسم دسترسی صحیح نمی باشد")),
  description: Joi.string().min(0).max(100).error(new Error("توضیحات دسترسی صحیح نمی باشد")),
});

module.exports = {
  addRoleSchema,
  addPermissionSchema,
};
