/**
 * @swagger
 * components:
 *  schemas:
 *    GetOTP:
 *      type: object
 *      required:
 *        - mobile
 *      properties:
 *        mobile:
 *          type: string
 *          description: the user mobile for signup /singin
 *    CheckOTP:
 *      type: object
 *      required:
 *        - mobile
 *        - code
 *      properties:
 *        mobile:
 *          type: string
 *          description: the user mobile for signup /singin
 *        code:
 *          type: integer
 *          description: reviced code from getOTP
 *    RefreshToken:
 *      type: object
 *      required:
 *        - refreshToken
 *      properties:
 *        refreshToken:
 *          type: string
 *          description: enter refresh token for get fresh token and refreshtoken
 *
 */

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
 *      requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/GetOTP"
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetOTP"
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

/**
 * @swagger
 *  /user/check-otp:
 *    post:
 *      tags: [User-Authentication]
 *      summary: check-otp value in user controller
 *      description: check otp with code mobile and expires date
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: "#/components/schemas/CheckOTP"
 *          application/json:
 *             schema:
 *              $ref: "#/components/schemas/CheckOTP"
 *
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

/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *    tags: [User-Authentication]
 *    summary: send refresh token for get new token and refresh token
 *    description: fresh token
 *    requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/RefreshToken"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RefreshToken"
 *    responses:
 *      200:
 *        description: success
 *
 */
