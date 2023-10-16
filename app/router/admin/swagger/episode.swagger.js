/**
 * @swagger
 *  components:
 *    schemas:
 *      AddEpisode:
 *        type: object
 *        required:
 *          - courseID
 *          - chapterID
 *          - title
 *          - text
 *          - video
 *          - type
 *        properties:
 *          courseID:
 *            type: string
 *            example: 652956a8501088ac440ab8eb
 *            description: type of courseID
 *          chapterID:
 *            type: string
 *            example: 652d28126f704694311b9418
 *            description: type of chapterID
 *          title:
 *            type: string
 *            example: تیتر اپیزود
 *            description: type of title episode
 *          text:
 *            type: string
 *            example: متن اپیزود
 *            description: type of text episode
 *          type:
 *            type: string
 *            description: the episode type (unlock or lock)
 *            enum:
 *              - lock
 *              - unlock
 *          video:
 *            type: string
 *            description: the video of video HH
 *            format: binary
 *
 */

/**
 * @swagger
 * /admin/episode/add:
 *  post:
 *    tags: [Episode(AdminPanel)]
 *    summary: create and save episode
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/AddEpisode"
 *    responses:
 *      201:
 *        description: created new course
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/publicDefinition"
 *
 */

/**
 * @swagger
 * /admin/episode/remove/{episodeID}:
 *  delete:
 *    tags : [Episode(AdminPanel)]
 *    summary: remove a episode of course
 *    parameters:
 *      - in: path
 *        name: episodeID
 *        type: string
 *        required: true
 *        description: ObjectId of episode
 *    responses:
 *      200:
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/definitions/publicDefinition"
 *
 */
