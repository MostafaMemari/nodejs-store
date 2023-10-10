const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constans");
const redisClient = require("./init-redis");
const fs = require("fs");
const path = require("path");

function randomNumberGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}
function signAccessToken(userID) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userID);
    const payload = {
      mobile: user.mobile,
    };
    const options = { expiresIn: "1w" };
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
    JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سروری"));
      await redisClient.SETEX(userID.toString(), 365 * 24 * 60 * 60, token);
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
      const refreshToken = await redisClient.get(user?._id.toString() || "key_default");
      if (!refreshToken) reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"));
      if (token === refreshToken) return resolve(mobile);
    });
  });
}
function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
}
function listofImagesFormRequest(files, fileUploadPath) {
  if (files?.length > 0) {
    return files.map((file) => path.join(fileUploadPath, file.filename)).map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
}
module.exports = {
  randomNumberGenerator,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  deleteFileInPublic,
  listofImagesFormRequest,
};
