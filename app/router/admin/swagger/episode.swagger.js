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
 *            example: 652bf3f9c966411c46fa2d6c
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
