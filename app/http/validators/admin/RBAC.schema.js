const Joi = require("@hapi/joi");

const addRoleSchema = Joi.object({
  title: Joi.string().min(3).max(30).error(new Error("عنوان نقش صحیح نمی باشد")),
  permissions: Joi.allow(),
});

module.exports = {
  addRoleSchema,
};
