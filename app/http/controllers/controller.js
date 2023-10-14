const autoBind = require("auto-bind");
const { default: mongoose } = require("mongoose");
const { CoursesModel } = require("../../models/course");
const createHttpError = require("http-errors");

module.exports = class Controller {
  constructor() {
    autoBind(this);
  }
  async findCourseById(id) {
    if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمی باشد");
    const course = await CoursesModel.findById(id);
    if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
    return course;
  }
};
