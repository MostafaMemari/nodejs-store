const { StatusCodes } = require("http-status-codes");
const { CoursesModel } = require("../../../models/course");
const Controller = require("../controller");
const path = require("path");
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
      const { fileUploadPath, filename } = req.body;
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");

      const { title, short_text, text, tags, category, price, discount, type } = req.body;

      return res.status(StatusCodes.CREATED).json({ title, short_text, text, tags, category, price, discount, type, image });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CourseController: new CourseController(),
};
