"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const router = (0, express_1.Router)();
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
router.post('/login', AuthController_1.default.login);
router.post('/register', AuthController_1.default.register);
router.post('/logout', AuthController_1.default.logout);
router.post('/refresh', AuthController_1.default.refresh);
exports.default = router;
