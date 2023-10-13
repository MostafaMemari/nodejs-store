const { StatusCodes } = require("http-status-codes");
const { CoursesModel } = require("../../../models/course");
const Controller = require("../controller");
const path = require("path");
const { createCourseSchema } = require("../../validators/admin/course.schema");
const createHttpError = require("http-errors");
class CourseController extends Controller {
  async getListOfProduct(req, res, next) {
    const { search } = req.query;
    let courses = null;
    if (search)
      courses = await CoursesModel.find({ $text: { $search: search } })
        .sort({ _id: -1 })
        .lean();
    else courses = await CoursesModel.find({}).sort({ _id: -1 }).lean();

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      courses,
    });
    try {
    } catch (error) {
      next(error);
    }
  }
  async addCourse(req, res, next) {
    try {
      await createCourseSchema.validateAsync(req.body);

      const { fileUploadPath, filename } = req.body;
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");

      const teacher = req.user._id;

      const { title, short_text, text, tags, category, price, discount, type } = req.body;
      const course = await CoursesModel.create({
        title,
        short_text,
        text,
        tags,
        category,
        price,
        discount,
        type,
        image,
        time: "00:00:00",
        status: "notStarted",
        teacher,
      });
      if (!course?._id) throw createHttpError.InternalServerError("دوره ثبت نشد");
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "دوره با موفقیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CourseController: new CourseController(),
};
