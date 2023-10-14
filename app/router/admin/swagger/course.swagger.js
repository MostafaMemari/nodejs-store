/**
 * @swagger
 *  components:
 *    schemas:
 *      Types:
 *        type: string
 *        enum:
 *          - free
 *          - chash
 *          - special
 */

/**
 * @swagger
 * definitions:
 *  ListOfCourses:
 *    type: array
 *    items:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          example: 6529526761c17280b9f6cc3d
 *        title:
 *          type: string
 *          example: title of course
 *        short_text:
 *          type: string
 *          example: short_text of course
 *        text:
 *          type: string
 *          example: text of course
 *        status:
 *          type: string
 *          example: notStarted | Completed | Holding
 *        time:
 *          type: string
 *          example: 01:22:15
 *        price:
 *          type: integer
 *          example: 250000
 *        discount:
 *          type: integer
 *          example: 20
 *        studentCount:
 *          type: integer
 *          example: 20
 *        teacher:
 *          type: string
 *          example: MostafaMemari
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Inseert-Course:
 *        type: object
 *        required:
 *          - title
 *          - short_text
 *          - text
 *          - tags
 *          - category
 *          - price
 *          - discount
 *          - image
 *          - type
 *        properties:
 *          title:
 *            type: string
 *            description: the title of course
 *            example: عنوان دوره
 *          short_text:
 *            type: string
 *            description: the short_text of course
 *            example: متن کوتاه تست شده
 *          text:
 *            type: string
 *            description: tthe text of course
 *            example: متن توضیحات کامل دوره به صورت تستی
 *          tags:
 *            type: array
 *            description: the tags of course
 *          category:
 *            type: string
 *            description: the category of course
 *            example: 6521150eeb73580ae4f6cb99
 *          price:
 *            type: string
 *            description: the price of course
 *            example: 250000
 *          discount:
 *            type: string
 *            description: the discount of course
 *            example: 250000
 *          image:
 *            type: string
 *            format: binary
 *          type:
 *            type: string
 *            description: the type of course
 *            $ref: '#/components/schemas/Types'

 */

/**
 * @swagger
 *  /admin/courses/list:
 *    get:
 *      tags: [Course(AdminPanel)]
 *      summery: get All of courses
 *      parameters:
 *        - in: query
 *          name: search
 *          description: text for search in title , text , short_text of (product)
 *          type: string
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/josn:
 *              schema:
 *                $ref: "#/definitions/ListOfCourses"
 */
/**
 * @swagger
 * /admin/courses/add:
 *  post:
 *    tags: [Course(AdminPanel)]
 *    summary: create and save course
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/Inseert-Course"
 *    responses:
 *      201:
 *        description: created new course
 *
 */
/**
 * @swagger
 * /admin/courses/{id}:
 *  get:
 *    tags : [Course(AdminPanel)]
 *    summary: get One course By ID
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        description: ObjectId of Course
 *    responses:
 *      200:
 *        description: success
 *
 */
