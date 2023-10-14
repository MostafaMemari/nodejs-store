/**
 * @swagger
 * /admin/chapter/add:
 *  put:
 *    tags: [Chapter(AdminPanel)]
 *    summary: create new Chapter for courses
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AddChapter'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/AddChapter'
 *    responses:
 *      200:
 *        description: success
 *        content:
 *          application/josn:
 *            schema:
 *              $ref: "#/definitions/publicDefinition"
 *
 *
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      AddChapter:
 *        type: object
 *        required:
 *          - id
 *          - title
 *        properties:
 *          id:
 *            type: string
 *            example: 6529526761c17280b9f6cc3d
 *          title:
 *            type: string
 *            example: chapter zero - hero javascript
 *          text:
 *            type: string
 *            example: the chapterrrr
 */

/**
 * @swagger
 *  definitions:
 *    chapterOfCourseDefinition:
 *      type: object
 *      properties:
 *        statusCode:
 *          type: integer
 *          example: 200
 *        data:
 *          type: object
 *          properties:
 *            courses:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  example: 6529526761c17280b9f6cc3d
 *                title:
 *                  type: string
 *                  example: title of course
 *                chapters:
 *                  type: array
 *                  items:
 *                    type: object
 *                    example: {_id : "6529526761c17280b9f6cc3d" , title : "title of chapters" , text : "text of chapters"}
 */

/**
 * @swagger
 * /admin/chapter/list/{courseID}:
 *  get:
 *    tags : [Chapter(AdminPanel)]
 *    summary: get chapter of course
 *    parameters:
 *      - in: path
 *        name: courseID
 *        type: string
 *        required: true
 *        description: ObjectId of Course
 *    responses:
 *      200:
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/chapterOfCourseDefinition"
 *
 */
