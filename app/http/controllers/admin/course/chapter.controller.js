const createHttpError = require("http-errors");
const Controller = require("../../controller");
const { CoursesModel } = require("../../../../models/course");
const { StatusCodes } = require("http-status-codes");

class ChapterController extends Controller {
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
}

module.exports = {
  ChapterController: new ChapterController(),
};
