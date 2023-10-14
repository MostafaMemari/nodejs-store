const { StatusCodes } = require("http-status-codes");
const { CoursesModel } = require("../../../models/course");
const Controller = require("../controller");
const path = require("path");
const { createCourseSchema } = require("../../validators/admin/course.schema");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
class CourseController extends Controller {
  async getListOfCourse(req, res, next) {
    const { search } = req.query;
    let courses = null;
    if (search)
      courses = await CoursesModel.find({ $text: { $search: search } })
        .sort({ _id: -1 })
        .lean();
    else courses = await CoursesModel.find({}).sort({ _id: -1 }).lean();

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      data: {
        courses,
      },
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

      if (Number(price) > 0 && type === "free") throw createHttpError.BadRequest("برای دوره رایگان نمیتوان قیمت ثبت کرد");

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
        data: {
          message: "دوره با موفقیت ایجاد شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCourseById(req, res, next) {
    try {
      const { id } = req.params;
      const course = await CoursesModel.findById(id);
      if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async addCahpter(req, res, next) {
    try {
      const { id, title, text } = req.body;
      await this.findCourseById(id);
      const saveChapterResult = await CoursesModel.updateOne(
        { _id: id },
        {
          $push: {
            chapters: { title, text, episodes: [] },
          },
        }
      );
      if (saveChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("فصل افزوده نشد");
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "فصل با موفقیت ایجاد شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findCourseById(id) {
    if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمی باشد");
    const course = await CoursesModel.findById(id);
    if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
    return course;
  }
}

module.exports = {
  CourseController: new CourseController(),
};
