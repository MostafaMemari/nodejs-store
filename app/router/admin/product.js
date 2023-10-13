const { ProductController } = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post("/add", uploadFile.array("images", 10), stringToArray("tags"), stringToArray("colors"), ProductController.addProduct);

router.patch("/edit/:id", uploadFile.array("images", 10), stringToArray("tags", "colors"), ProductController.editProduct);

router.get("/all", ProductController.getAllProduct);

router.get("/:id", ProductController.getOneProduct);

router.delete("/remove/:id", ProductController.removeProductById);

module.exports = {
  AdminApiProductRouter: router,
};
