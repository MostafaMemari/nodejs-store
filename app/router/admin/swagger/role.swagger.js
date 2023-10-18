/**
 * @swagger
 *  definitions:
 *    ListOfRoles:
 *      type: object
 *      properties:
 *        statusCode:
 *          type: integer
 *          example: 200
 *        data:
 *          type: object
 *          properties:
 *            role:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    example: "62822e4ff68cdded54aa928d"
 *                  title:
 *                    type: string
 *                    example: "title of role"
 *                  description:
 *                    type: string
 *                    example: "desc of role"
 *                  permission:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          example: "62822e4ff68cdded54aa928d"
 *                        title:
 *                          type: string
 *                          example: "title of permission"
 *                        description:
 *                          type: string
 *                          example: "describe the permission"
 *
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Permissions:
 *        type: string
 *        enum:
 *          - blog
 *          - course
 *          - product
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Role:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        title:
 *          type: string
 *          description: the title of Role
 *        permissions:
 *          $ref: "#/components/schemas/Permissions"
 *    Edit-Role:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: the title of Role
 *        permissions:
 *          $ref: "#/components/schemas/Permissions"
 */

/**
 * @swagger
 * /admin/role/add:
 *  post:
 *    tags: [RBAC(AdminPanel)]
 *    summary: create new Role
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/Role'
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Role'
 *    responses:
 *      201:
 *        description: created new Role
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/publicDefinition"
 *
 */

/**
 * @swagger
 * /admin/role/update/{id}:
 *  patch:
 *    tags: [RBAC(AdminPanel)]
 *    summary: edit the Role
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/Edit-Role'
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Edit-Role'
 *    responses:
 *      200:
 *        description: update Role
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/publicDefinition"
 *
 */

/**
 * @swagger
 * /admin/role/remove/{id}:
 *  delete:
 *    tags: [RBAC(AdminPanel)]
 *    summary: delete the Role
 *    parameters:
 *      - in: delete
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: delete Role
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/publicDefinition"
 *
 */

/**
 * @swagger
 * /admin/role/list:
 *  get:
 *    tags: [RBAC(AdminPanel)]
 *    summary: list of Roles
 *    responses:
 *      200:
 *        description: update Role
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/ListOfRoles"
 *
 */
