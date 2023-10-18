const { StatusCodes } = require("http-status-codes");
const { PermissionsModel } = require("../../../../models/permission");
const Controller = require("../../controller");

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
}

module.exports = {
  PermissionController: new PermissionController(),
};
