

import { Router } from 'express';
import authController from "../controllers/authcontroller";
const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: The Authentication API
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/User'
 *     responses:
 *       200:
 *         description: The newly created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/User'
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/User'
 *     responses:
 *       200:
 *         description: The access and refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/Tokens'
 */

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Logs out a user
 *     tags: [Auth]
 *     description: Provide the refresh token in the authorization header.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout completed successfully
 */


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Fetches the username by user ID
 *     tags: [Auth]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's username
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: "john_doe"  
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */


router.post('/login', authController.login);
router.post('/register',authController.register);
router.post('/logout',authController.logout);
router.post('/refresh',authController.refresh);
router.get('/:id', authController.getUsernameById);

export default router;
