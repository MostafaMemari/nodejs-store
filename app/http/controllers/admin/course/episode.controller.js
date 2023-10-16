const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const path = require("path");
const { getTime } = require("../../../../utils/functions");

class EpisodeController extends Controller {
  async addNewEpisode(req, res, next) {
    try {
      const { title, text, chapterID, courseID, filename, fileUploadPath } = await createEpisodeSchema.validateAsync(req.body);
      const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
      const second = await getVideoDurationInSeconds(videoUrl);
      const time = getTime(second);
      return res.json({
        title,
        text,
        chapterID,
        courseID,
        filename,
        fileUploadPath,
        time,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  EpisodeController: new EpisodeController(),
};
