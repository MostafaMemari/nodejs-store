const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *  name : User-Authentication
 *  description : user-auth section
 */
/**
 * @swagger
 *  /user/get-otp:
 *    post:
 *      tags: [User-Authentication]
 *      summary: login user in userpanel with phone number
 *      description: one time password (OTP) login
 *      parameters:
 *      - name: mobile
 *        description: fa-IRI phone number
 *        in: formData
 *        required: true
 *        type: string
 *      responses:
 *        201:
 *          description: Success
 *        400:
 *          description: Bad requiest
 *        401:
 *          description: Inauthorization
 *        500:
 *          description: Internal server error
 */

router.post("/get-otp", UserAuthController.getOtp);
/**
 * @swagger
 *  /user/check-otp:
 *    post:
 *      tags: [User-Authentication]
 *      summary: check-otp value in user controller
 *      description: check otp with code mobile and expires date
 *      parameters:
 *      - name: mobile
 *        description: fa-IRI phone number
 *        in: formData
 *        required: true
 *        type: string
 *      - name: code
 *        description : enter sms code recived
 *        in: formData
 *        required: true
 *        type: string
 *      responses:
 *        201:
 *          description: Success
 *        400:
 *          description: Bad requiest
 *        401:
 *          description: Inauthorization
 *        500:
 *          description: Internal server error
 */
router.post("/check-otp", UserAuthController.checkOtp);
/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *    tags: [User-Authentication]
 *    summary: send refresh token for get new token and refresh token
 *    description: fresh token
 *    parameters:
 *      - in: body
 *        required: true
 *        type: string
 *        name: refreshToken
 *    responses:
 *      200:
 *        description: success
 *
 */
router.post("/refresh-token", UserAuthController.refreshToken);
module.exports = {
  UserAuthRouter: router,
};
