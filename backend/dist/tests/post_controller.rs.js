"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const app_1 = __importDefault(require("../app"));
let accessToken;
let refreshToken;
const testUser = {
    username: "asd",
    email: "test@user.com",
    password: "testpassword",
};
let postId = "";
beforeAll(async () => {
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
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
});
describe("Posts Tests", () => {
    test("Posts test get all", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/posts");
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    });
    test("Test Create Post", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/posts")
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
            title: "Test Post",
            content: "Test Content",
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Test Post");
        expect(response.body.content).toBe("Test Content");
        postId = response.body._id;
    });
    // test("Test get post by owner", async () => {
    //   const response = await request(app).get(`/posts?owner=${testUser._id}`);
    //   expect(response.statusCode).toBe(200);
    //   expect(response.body.length).toBe(1);
    //   expect(response.body[0].title).toBe("Test Post");
    //   expect(response.body[0].content).toBe("Test Content");
    // });
    test("Test get post by id", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get(`/posts/${postId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Test Post");
        expect(response.body.content).toBe("Test Content");
    });
    test("Test Create Post 2", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/posts")
            .set({ authorization: "Bearer " + accessToken })
            .send({
            title: "Test Post 2",
            content: "Test Content 2",
        });
        expect(response.statusCode).toBe(201);
    });
    test("Posts test get all 2", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    });
    test("Test Delete Post", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .delete(`/posts/${postId}`)
            .set({ authorization: "Bearer " + accessToken });
        expect(response.statusCode).toBe(200);
        const response2 = await (0, supertest_1.default)(app_1.default).get(`/posts/${postId}`);
        expect(response2.statusCode).toBe(404);
    });
    test("Test Create Post fail", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/posts")
            .set({ authorization: "Bearer " + accessToken })
            .send({
            content: "Test Content 2",
        });
        expect(response.statusCode).toBe(400);
    });
});
