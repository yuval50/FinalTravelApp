"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const Post_1 = __importDefault(require("../models/Post"));
let token;
beforeAll(async () => {
    await mongoose_1.default.connect(process.env.MONGO_URI);
    await (0, supertest_1.default)(app_1.default).post('/users/register').send({
        username: 'trypost',
        email: 'trypost@gmail.com',
        password: 'trypostpassword',
    });
    const res = await (0, supertest_1.default)(app_1.default).post('/users/login').send({
        email: 'trypost@gmail.com',
        password: 'trypostpassword',
    });
    token = res.body.accessToken;
});
afterEach(async () => {
    await Post_1.default.deleteMany({});
});
afterAll(async () => {
    await mongoose_1.default.connection.close();
});
describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
            title: 'My First Post',
            content: 'Content of the first post',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toEqual('My First Post');
    });
    it('should fetch all posts', async () => {
        await Post_1.default.create({
            title: 'My First Post',
            content: 'Content of the first post',
            userId: new mongoose_1.default.Types.ObjectId(),
        });
        const res = await (0, supertest_1.default)(app_1.default).get('/posts');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
