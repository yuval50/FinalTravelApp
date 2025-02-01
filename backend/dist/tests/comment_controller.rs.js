"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const Comment_1 = __importDefault(require("../models/Comment"));
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const app_1 = __importDefault(require("../app"));
let accessToken;
let refreshToken;
let postId;
let commentId;
beforeAll(async () => {
    await Comment_1.default.deleteMany();
    await Post_1.default.deleteMany();
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
beforeEach(async () => {
    console.log("Setting up test environment...");
    await (0, supertest_1.default)(app_1.default).post('/users/register').send({
        username: 'test_user',
        email: 'test_user@gmail.com',
        password: 'password123',
    });
    const loginRes = await (0, supertest_1.default)(app_1.default).post('/users/login').send({
        email: 'test_user@gmail.com',
        password: 'password123',
    });
    accessToken = loginRes.body.accessToken;
    refreshToken = loginRes.body.refreshToken;
    // Create a test post
    const postRes = await (0, supertest_1.default)(app_1.default)
        .post('/posts')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
        title: "Test Post",
        content: "Test Content",
    });
    postId = postRes.body._id;
});
describe("Comments Tests", () => {
    test("Test Create Comment", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post(`/comments`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
            content: "Test Comment",
            postId: postId,
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.content).toBe("Test Comment");
        commentId = response.body._id;
    });
    //   test("Test Get Comments by Post ID", async () => {
    //     const response = await request(app).get(`/comments/post/${postId}`);
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.length).toBe(1);
    //     expect(response.body[0].content).toBe("Test Comment");
    //   });
    test("Test Update Comment", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .put(`/comments/${commentId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
            content: "Updated Comment",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.content).toBe("Updated Comment");
    });
    //   test("Test Delete Comment", async () => {
    //     const response = await request(app)
    //       .delete(`/comments/${commentId}`)
    //       .set('Authorization', `Bearer ${accessToken}`);
    //     expect(response.statusCode).toBe(200);
    //     const getResponse = await request(app).get(`/comments/post/${postId}`);
    //     expect(getResponse.body.length).toBe(0);
    //   });
});
