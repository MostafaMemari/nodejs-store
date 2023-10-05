const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constans");
function randomNumberGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}
function signAccessToken(userID) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userID);
    const payload = {
      mobile: user.mobile,
    };
    const options = { expiresIn: "1h" };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سروری"));
      resolve(token);
    });
  });
}
function signRefreshToken(userID) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userID);
    const payload = {
      mobile: user.mobile,
    };
    const options = { expiresIn: "1y" };
    JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سروری"));
      resolve(token);
    });
  });
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (error, payload) => {
      if (error) reject(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
      resolve(mobile);
    });
  });
}

module.exports = {
  randomNumberGenerator,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
