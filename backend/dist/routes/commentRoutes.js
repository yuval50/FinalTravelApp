"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController_1 = require("../controllers/CommentController");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
router.post('/', AuthController_1.authMiddleware, CommentController_1.addComment);
router.get('/', CommentController_1.getAllComments);
router.get('/post/:postId', CommentController_1.getCommentsByPost);
router.put('/:id', AuthController_1.authMiddleware, CommentController_1.updateComment);
router.delete('/:id', AuthController_1.authMiddleware, CommentController_1.deleteComment);
exports.default = router;
/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all existing comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Add a new comment to a user
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This is my comment"
 *               postId:
 *                 type: string
 *                 example: "6123456789abcdef01234567"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /comments/post/{postId}:
 *   get:
 *     summary: Get all comments for an existing specific post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: List of comments for the specified post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Post not found
 */
/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update an existing comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated comment content"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 */
/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete an existing comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
