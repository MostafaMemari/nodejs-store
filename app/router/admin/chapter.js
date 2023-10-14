const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");

const router = require("express").Router();

router.put("/add", ChapterController.addCahpter);

module.exports = {
  AdminApiChapterRouter: router,
};
