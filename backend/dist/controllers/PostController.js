"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.getAllPosts = exports.addPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const addPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.params.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const newPost = await Post_1.default.create({
            title,
            content,
            userId,
        });
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addPost = addPost;
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post_1.default.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllPosts = getAllPosts;
const getPostById = async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPostById = getPostById;
const updatePost = async (req, res) => {
    try {
        const post = await Post_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json(post);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const post = await Post_1.default.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deletePost = deletePost;
