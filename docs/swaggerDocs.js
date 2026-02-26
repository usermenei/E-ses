/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and profile management
 */
/**
 * @swagger
 * tags:
 *   - name: Coworkingspaces
 *     description: Coworking space management API
 */
/**
 * @swagger
 * tags:
 *   - name: Reservations
 *     description: Reservation management API
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - telephoneNumber
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           example: 65d123abc456def789012345
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: johndoe@email.com
 *         telephoneNumber:
 *           type: string
 *           example: 0812345678
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         numberOfEntries:
 *           type: number
 *           example: 15
 */


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */


/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 */


/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout current user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Coworkingspace:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - district
 *         - province
 *         - postalcode
 *         - tel
 *         - region
 *         - openTime
 *         - closeTime
 *       properties:
 *         id:
 *           type: string
 *           example: 65f123abc456def789012345
 *         name:
 *           type: string
 *           example: The Hive Bangkok
 *         address:
 *           type: string
 *           example: 123 ถนนสุขุมวิท
 *         district:
 *           type: string
 *           example: บางนา
 *         province:
 *           type: string
 *           example: กรุงเทพมหานคร
 *         postalcode:
 *           type: string
 *           example: 10260
 *         tel:
 *           type: string
 *           example: 021234567
 *         region:
 *           type: string
 *           example: Bangkok
 *         openTime:
 *           type: string
 *           example: "08:00"
 *         closeTime:
 *           type: string
 *           example: "20:00"
 */

/**
 * @swagger
 * /coworkingspaces:
 *   get:
 *     summary: Get all coworking spaces
 *     tags: [Coworkingspaces]
 *     parameters:
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *         description: Select specific fields (comma separated)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort fields (comma separated)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of coworking spaces
 */

/**
 * @swagger
 * /coworkingspaces/{id}:
 *   get:
 *     summary: Get a single coworking space by ID
 *     tags: [Coworkingspaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Coworking space ID
 *     responses:
 *       200:
 *         description: Coworking space data
 *       404:
 *         description: Coworking space not found
 */

/**
 * @swagger
 * /coworkingspaces:
 *   post:
 *     summary: Create new coworking space
 *     tags: [Coworkingspaces]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coworkingspace'
 *     responses:
 *       201:
 *         description: Coworking space created successfully
 *       400:
 *         description: Invalid data or duplicate
 */

/**
 * @swagger
 * /coworkingspaces/{id}:
 *   put:
 *     summary: Update coworking space by ID
 *     tags: [Coworkingspaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coworkingspace'
 *     responses:
 *       200:
 *         description: Coworking space updated
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /coworkingspaces/{id}:
 *   delete:
 *     summary: Delete coworking space by ID
 *     tags: [Coworkingspaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coworking space deleted successfully
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - apptDate
 *         - coworkingSpace
 *       properties:
 *         id:
 *           type: string
 *           example: 65f456abc789def123456789
 *         apptDate:
 *           type: string
 *           format: date-time
 *           example: 2026-03-01T10:00:00.000Z
 *         user:
 *           type: string
 *           example: 65d123abc456def789012345
 *         coworkingSpace:
 *           type: string
 *           example: 65f123abc456def789012345
 *         status:
 *           type: string
 *           enum: [pending, success, cancelled]
 *           example: pending
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations (Admin sees all, user sees own)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reservations
 *       403:
 *         description: Not authorized
 */

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation data
 *       404:
 *         description: Reservation not found
 *       403:
 *         description: Not authorized
 */

/**
 * @swagger
 * /coworkingspaces/{coworkingspaceId}/reservations:
 *   post:
 *     summary: Create reservation for a coworking space
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coworkingspaceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Coworking space ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - apptDate
 *             properties:
 *               apptDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-03-01T10:00:00.000Z
 *     responses:
 *       201:
 *         description: Reservation created
 *       400:
 *         description: Limit reached or invalid data
 *       404:
 *         description: Coworking space not found
 */

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Update reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservation updated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Reservation not found
 */

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Delete reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation deleted
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Reservation not found
 */

/**
 * @swagger
 * /reservations/{id}/confirm:
 *   put:
 *     summary: Admin confirm reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation confirmed successfully
 *       400:
 *         description: Reservation is not pending
 *       403:
 *         description: Admin only
 *       404:
 *         description: Reservation not found
 */

