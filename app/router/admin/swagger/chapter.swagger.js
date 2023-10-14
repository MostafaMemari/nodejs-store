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
