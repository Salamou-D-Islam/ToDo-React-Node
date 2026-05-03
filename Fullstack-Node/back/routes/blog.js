import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import "../config/passport.js";
import prisma from "../db/psql.js";

const router = express.Router();

router.get("/blogBack", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await prisma.blog.findMany({
      where: { authorId: userId },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/blogBack", async (req, res, next) => {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/blogBack/:id", async (req, res, next) => {
  try {
    const blogId = req.blog.id;
    const deleteBlog = await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
