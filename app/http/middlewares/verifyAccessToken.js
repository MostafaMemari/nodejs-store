const createHttpError = require("http-errors");
const { UserModel } = require("../../models/user");
const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");

function verifyAccessToken(req, res, next) {
  const headers = req.headers;
  const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) {
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (error, payload) => {
      if (error) return next(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) return createHttpError.Unauthorized("حساب کاربری یافت نشد");
      req.user = user;
      return next();
    });
  } else return next(createHttpError.Unauthorized("مجددا وارد حساب کاربری خود شوید"));
}
module.exports = {
  verifyAccessToken,
};
