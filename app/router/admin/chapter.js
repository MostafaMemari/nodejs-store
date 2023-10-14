const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");

const router = require("express").Router();

router.put("/add", ChapterController.addCahpter);
router.get("/list/:courseID", ChapterController.chaptersOfCourse);

module.exports = {
  AdminApiChapterRouter: router,
};
