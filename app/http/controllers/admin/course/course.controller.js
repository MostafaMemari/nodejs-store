const { StatusCodes } = require("http-status-codes");
const { CoursesModel } = require("../../../../models/course");
const Controller = require("../../controller");
const path = require("path");
const { createCourseSchema } = require("../../../validators/admin/course.schema");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const { copyObject, deleteInvalidPropertyInObject, deleteFileInPublic } = require("../../../../utils/functions");
class CourseController extends Controller {
  async getListOfCourse(req, res, next) {
    const { search } = req.query;

    let courses = null;
    if (search)
      courses = await CoursesModel.find({ $text: { $search: search } })
        .sort({ _id: -1 })
        .lean()
        .populate([
          { path: "category", select: { children: 0, parent: 0 } },
          { path: "teacher", select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } },
        ]);
    else
      courses = await CoursesModel.find({})
        .sort({ _id: -1 })
        .populate([
          { path: "category", select: { children: 0, parent: 0 } },
          { path: "teacher", select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } },
        ]);

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
  async updateCourseById(req, res, next) {
    try {
      const { id } = req.params;
      const course = await this.findCourseById(id);
      const data = copyObject(req.body);
      const { filename, fileUploadPath } = req.body;
      let blackListFields = [
        "likes",
        "deslikes",
        "bookmarks",
        "discount",
        "chapters",
        "students",
        "episodes",
        "comments",
        "filename",
        "fileUploadPath",
      ];
      deleteInvalidPropertyInObject(data, blackListFields);
      if (req.file) {
        data.image = path.join(fileUploadPath, filename);
        deleteFileInPublic(course.image);
      }
      const updateCourseResult = await CoursesModel.updateOne(
        { _id: id },
        {
          $set: data,
        }
      );
      if (!updateCourseResult.modifiedCount) throw new createHttpError.InternalServerError("بروزرسانی دوره انجام نشد");
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "بروزرسانی دوره با موفقیت انجام شد",
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
