"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
describe('User Endpoints', () => {
    beforeAll(async () => {
        await mongoose_1.default.connect(process.env.MONGO_URI);
    });
    afterEach(async () => {
        await User_1.default.deleteMany({});
    });
    afterAll(async () => {
        await mongoose_1.default.connection.close();
    });
    it(' register a new user', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/users/register').send({
            username: 'user1',
            email: 'user1@gmail.com',
            password: 'user1password',
        });
        expect(res.statusCode).toEqual(200);
    });
    it(' login the user', async () => {
        await (0, supertest_1.default)(app_1.default).post('/users/register').send({
            username: 'user1',
            email: 'user1@gmail.com',
            password: 'user1password',
        });
        const res = await (0, supertest_1.default)(app_1.default).post('/users/login').send({
            email: 'user1@gmail.com',
            password: 'user1password',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
    });
});
