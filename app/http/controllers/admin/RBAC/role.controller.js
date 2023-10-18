const { StatusCodes } = require("http-status-codes");
const { RoleModel } = require("../../../../models/role");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");

class RoleController extends Controller {
  async getAllRoles(req, res, next) {
    try {
      const roles = await RoleModel.find({}).populate({ path: "permission" });
      return res.status(StatusCodes.CREATED).json({
        statuseCode: StatusCodes.CREATED,
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
  async removeRole(req, res, next) {
    try {
      const { field } = req.params;
      const role = await this.findRoleWithIdOrTitle(field);
      const removeRoleResult = await RoleModel.deleteOne({ _id: role._id });
      if (!removeRoleResult.deletedCount) throw createHttpError.InternalServerError("حذف نقش انجام نشد");
      return res.status(StatusCodes.OK).json({
        statuseCode: StatusCodes.OK,
        data: {
          message: "حذف نقش با موفقیت انجام شد",
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
  async findRoleWithIdOrTitle(field) {
    const findQuery = mongoose.isValidObjectId(field) ? { _id: field } : { title: field };
    const role = await RoleModel.findOne(findQuery);
    if (!role) throw createHttpError.NotFound("نقش مورد نظر یافت نشد");
    return role;
  }
}

module.exports = {
  RoleController: new RoleController(),
};
