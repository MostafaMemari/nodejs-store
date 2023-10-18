const { StatusCodes } = require("http-status-codes");
const { RoleModel } = require("../../../../models/role");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");

class RoleController extends Controller {
  async getAllRoles(req, res, next) {
    try {
      const roles = await RoleModel.find({}).populate({ path: "permission" });
      return res.status(StatusCodes.OK).json({
        statuseCode: StatusCodes.OK,
        data: {
          roles,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async createNewRole(req, res, next) {
    try {
      const { title, permissions } = await addRoleSchema.validateAsync(req.body);
      await this.findRoleWithTitle(title);
      const role = await RoleModel.create({ title, permissions });
      if (!role) throw createHttpError.InternalServerError("نقش ایجاد نشد");
      return res.status(StatusCodes.OK).json({
        statuseCode: StatusCodes.OK,
        data: {
          message: "نقش با موفقیت ایجاد شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findRoleWithTitle(title) {
    const role = await RoleModel.findOne({ title });
    if (role) throw createHttpError.BadRequest("نقش یا رول مورد نظر قبلا ثبت شده است");
  }
}

module.exports = {
  RoleController: new RoleController(),
};
