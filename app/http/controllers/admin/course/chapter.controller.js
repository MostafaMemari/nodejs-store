const createHttpError = require("http-errors");
const { CoursesModel } = require("../../../../models/course");
const { StatusCodes } = require("http-status-codes");
const Controller = require("../../controller");
const { CourseController } = require("./course.controller");

class ChapterController extends Controller {
  async addCahpter(req, res, next) {
    try {
      const { id, title, text } = req.body;
      await CourseController.findCourseById(id);
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
  async chaptersOfCourse(req, res, next) {
    try {
      const { courseID: id } = req.params;
      console.log(id);
      const course = await this.getChapterOfCourse(id);

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
  async getChapterOfCourse(id) {
    const chapters = await CoursesModel.findOne({ _id: id }, { chapters: 1, title: 1 });
    if (!chapters) throw createHttpError.NotFound("دوره ای با این شناسه یافت نشد");
    return chapters;
  }
}

module.exports = {
  ChapterController: new ChapterController(),
};
