"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getCommentsByPost = exports.getAllComments = exports.addComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const addComment = async (req, res) => {
    try {
        const { content, postId } = req.body;
        if (!req.params.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const newComment = await Comment_1.default.create({
            content,
            postId,
            userId: req.params.userId,
        });
        res.status(201).json(newComment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addComment = addComment;
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment_1.default.find();
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllComments = getAllComments;
const getCommentsByPost = async (req, res) => {
    try {
        const comments = await Comment_1.default.find({ postId: req.params.postId });
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCommentsByPost = getCommentsByPost;
const updateComment = async (req, res) => {
    try {
        const comment = await Comment_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment_1.default.findByIdAndDelete(req.params.id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteComment = deleteComment;
