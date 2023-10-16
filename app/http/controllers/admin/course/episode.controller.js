const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const path = require("path");
const { getTime } = require("../../../../utils/functions");
const { CoursesModel } = require("../../../../models/course");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

class EpisodeController extends Controller {
  async addNewEpisode(req, res, next) {
    try {
      const { title, text, chapterID, courseID, filename, fileUploadPath, type } = await createEpisodeSchema.validateAsync(req.body);
      const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
      const second = await getVideoDurationInSeconds(videoUrl);
      const time = getTime(second);
      const episode = {
        title,
        text,
        type,
        time,
        videoAddress,
      };
      const createEpisodeReuslt = await CoursesModel.updateOne(
        { _id: courseID, "chapters._id": chapterID },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        }
      );
      if (createEpisodeReuslt.modifiedCount == 0) throw createHttpError.InternalServerError("افزودن اپیزود انجام نشد");
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "افزودن اپیزود با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  EpisodeController: new EpisodeController(),
};
