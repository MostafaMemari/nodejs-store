const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { SECRET_KEY } = require("./constans");
function randomNumberGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}
function signAccessToken(userID) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userID);
    const payload = {
      mobile: user.mobile,
      userID: user._id,
    };
    const options = { expiresIn: "1h" };
    JWT.sign(payload, SECRET_KEY, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطای سروری"));
      resolve(token);
    });
  });
}

module.exports = {
  randomNumberGenerator,
  signAccessToken,
};
