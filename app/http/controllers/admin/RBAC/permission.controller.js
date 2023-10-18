const { StatusCodes } = require("http-status-codes");
const { PermissionsModel } = require("../../../../models/permission");
const Controller = require("../../controller");
const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");
const createHttpError = require("http-errors");

class PermissionController extends Controller {
  async getAllPermissions(req, res, next) {
    try {
      const permissions = await PermissionsModel.find({});
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          permissions,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async createNewPermission(req, res, next) {
    try {
      const { name, description } = await addPermissionSchema.validateAsync(req.body);
      await this.findPermissionWithName(name);
      const permission = await PermissionsModel.create({ name, description });
      if (!permission) throw createHttpError.InternalServerError("سطح دسترسی جدید ایجاد نشد");
      return res.status(StatusCodes.CREATED).json({
        statuseCode: StatusCodes.CREATED,
        data: {
          message: "سطح دسترسی جدید با موفقیت ایجاد شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removePermission(req, res, next) {
    try {
      const { id } = req.params;
      await this.findPermissionWithId(id);
      const removePermissionResult = await PermissionsModel.deleteOne({ _id: id });
      if (!removePermissionResult.deletedCount) throw createHttpError.InternalServerError("سطح دسترسی حذف نشد");
      return res.status(StatusCodes.OK).json({
        statuseCode: StatusCodes.OK,
        data: {
          message: "سطح دسترسی جدید با موفقیت حذف شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findPermissionWithName(name) {
    const permission = await PermissionsModel.findOne({ name });
    if (permission) throw createHttpError.BadRequest("سطح دسترسی مورد نظر قبلا ثبت شده است");
  }
  async findPermissionWithId(_id) {
    const permission = await PermissionsModel.findOne({ _id });
    if (!permission) throw createHttpError.NotFound("سطح دسترسی یافت نشد");
  }
}

module.exports = {
  PermissionController: new PermissionController(),
};
