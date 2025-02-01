"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true, // Ensure username is required
        unique: true, // Enforce uniqueness
        trim: true, // Remove leading/trailing spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: [String],
        default: [],
    }
});
const userModel = mongoose_1.default.model("Users", userSchema);
exports.default = userModel;
/**
* @swagger
* components:
* schemas:
* User:
* type: object
* required:
* - email
* - password
* properties:
* email:
* type: string
* description: The user email
* password:
* type: string
* description: The user password
* example:
* email: 'bob@gmail.com'
* password: '123456'
*/
