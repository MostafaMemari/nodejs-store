const { StatusCodes } = require("http-status-codes");
const { UserModel } = require("../../../../models/user");
const Controller = require("../../controller");
const { deleteInvalidPropertyInObject } = require("../../../../utils/functions");
const createHttpError = require("http-errors");

class UserController extends Controller {
  async getAllUsers(req, res, next) {
    try {
      const { search } = req.query;
      const databaseQuery = {};

      if (search) databaseQuery["$text"] = { $search: search };

      const users = await UserModel.find(databaseQuery);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateUserProfile(req, res, next) {
    try {
      const userID = req.user._id;
      const data = req.body;
      const BlackListFields = ["mobile", "otp", "bills", "discount", "Roles", "Courses"];
      deleteInvalidPropertyInObject(data, BlackListFields);
      const profileUpdateResult = await UserModel.updateOne({ _id: userID }, { $set: data });
      if (!profileUpdateResult.modifiedCount) throw new createHttpError.InternalServerError("به روزسانی انجام نشد");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message: "به روزرسانی پروفایل با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async userProfile(req, res, next) {
    try {
      // bill , courses , discount ,
      const user = req.user;
      // const BlackListFields = ["mobile", "otp", "bills", "discount", "Roles", "Courses"];
      // deleteInvalidPropertyInObject(data, BlackListFields);
      // const profileUpdateResult = await UserModel.updateOne({ _id: userID }, { $set: data });
      // if (!profileUpdateResult.modifiedCount) throw new createHttpError.InternalServerError("به روزسانی انجام نشد");
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  UserController: new UserController(),
};
