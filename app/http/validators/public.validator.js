const Joi = require("@hapi/joi");
const { MongoIDPatern } = require("../../utils/constans");
const createHttpError = require("http-errors");

const objectIdValidator = Joi.object({
  id: Joi.string().pattern(MongoIDPatern).error(new Error("شناسه وارد شده صحیح نمی باشد")),
});

module.exports = {
  objectIdValidator,
};
