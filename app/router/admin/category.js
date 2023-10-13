const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();

router.post("/add", CategoryController.addCategory);

router.get("/parents", CategoryController.getAllParents);

router.get("/chidren/:parent", CategoryController.getChildofParents);

router.get("/all", CategoryController.getAllCategory);

router.delete("/remove/:id", CategoryController.removeCategory);

router.get("/list-of-all", CategoryController.getAllCategoryWidthOutPopulate);

router.get("/:id", CategoryController.getCategoryByID);

router.patch("/update/:id", CategoryController.editCategoryTitle);

module.exports = {
  AdminApiCategoryRouter: router,
};

// *    requestBody:
// *      required: true
// *      content:
// *        application/x-www-form-urlencoded:
// *          schema:
// *            $ref: "#/components/schemas/Category"
// *        application/json:
// *          schema:
// *            $ref: "#/components/schemas/Category"
