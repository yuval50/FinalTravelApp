"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const app_1 = __importDefault(require("../app"));
beforeAll(async () => {
    await User_1.default.deleteMany();
    console.log("Connecting to MongoDB...");
    await mongoose_1.default.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected!");
});
afterAll(async () => {
    console.log("Disconnecting MongoDB...");
    await mongoose_1.default.connection.close();
    console.log("MongoDB disconnected.");
});
describe("Auth Tests", () => {
    let refreshToken;
    test("Test User Registration", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post('/users/register').send({
            username: 'test_user',
            email: 'test_user@gmail.com',
            password: 'password123',
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.username).toBe('test_user');
    });
    test("Test User Login", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post('/users/login').send({
            email: 'test_user@gmail.com',
            password: 'password123',
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');
        refreshToken = response.body.refreshToken;
    });
    test("Test Token Refresh", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/users/refresh')
            .send({ refreshToken });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');
    });
});
