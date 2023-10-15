const createHttpError = require("http-errors");
const { CoursesModel } = require("../../../../models/course");
const { StatusCodes } = require("http-status-codes");
const Controller = require("../../controller");
const { CourseController } = require("./course.controller");
const { deleteInvalidPropertyInObject } = require("../../../../utils/functions");

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
  async getOneChapter(id) {
    const chapter = await CoursesModel.findOne({ "chapters._id": id }, { "chapters.$": 1 });
    if (!chapter) throw createHttpError.NotFound("فصلی با این شناسه یافت نشد");
    return chapter;
  }
  async removeChapterById(req, res, next) {
    try {
      const { chapterID } = req.params;
      const chapter = await this.getOneChapter(chapterID);
      const removeChapterResult = await CoursesModel.updateOne(
        { "chapters._id": chapterID },
        {
          $pull: { chapters: { _id: chapterID } },
        }
      );
      if (removeChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("خذف فصل انجام نشد");
      return res.status(StatusCodes.OK).json({
        data: {
          message: "حذف فصل با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateChapterById(req, res, next) {
    try {
      const { chapterID } = req.params;
      await this.getOneChapter(chapterID);
      const data = req.body;
      deleteInvalidPropertyInObject(data, ["_id"]);
      console.log(chapterID, data);
      const updateChapterResult = await CoursesModel.updateOne({ "chapters._id": chapterID }, { $set: { "chapters.$": data } });
      if (updateChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("بروزرسانی فصل مورد نظر انجام نشد");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "بروزرسانی با موفقیت انجام شد",
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
