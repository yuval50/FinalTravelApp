import { Request, Response } from 'express';
import PostModel from '../models/Post';

export const addPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, location, rating, images } = req.body;

    const userId = req.params.userId; // האם ה-UserId בא מה-params או ה-body? אם זה ב-body אז תשנה את זה.
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const newPost = await PostModel.create({
      title,
      content,
      userId,
      location,
      rating,
      images,
      likes: [],
      commentsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, location, rating, images } = req.body;
    const post = await PostModel.findByIdAndUpdate(
      req.params.id,
      { title, content, location, rating, images, updatedAt: new Date() },
      { new: true }
    );
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
