const { CourseController } = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.get("/list", CourseController.getListOfCourse);
router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseController.addCourse);
router.patch("/update/:id", uploadFile.single("image"), CourseController.updateCourseById);
router.get("/:id", CourseController.getCourseById);

module.exports = {
  AdminApiCourseRouter: router,
};
