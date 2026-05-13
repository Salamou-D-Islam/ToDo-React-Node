import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import "../config/passport.js";
import prisma from "../db/psql.js";
import isAuthenticated from "../routes/auth.js";
const router = express.Router();

router.get("/dashboard/blogBack", isAuthenticated, async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Non autorisé" });
    }
    const userId = req.user.id;
    const result = await prisma.blog.findMany({
      where: { authorId: userId },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/dashboard/blogBack", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, description, createdAt } = req.body;
    const date = new Date();
    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        createdAt: date,
        authorId: userId,
      },
    });
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/dashboard/blogBack/:id", async (req, res, next) => {
  try {
    const blogId = req.blog.id;
    const deleteBlog = await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
    res.status(204).json(deleteBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
