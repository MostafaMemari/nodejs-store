/**
 * @swagger
 * /admin/user/list:
 *  get:
 *    tags : [Users(AdminPanel)]
 *    summary: get All of users
 *    parameters:
 *      - in: query
 *        name: search
 *        type: string
 *        description: first_name last_name username mobile
 *    responses:
 *      200:
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/publicDefinition"
 *
 *
 */
