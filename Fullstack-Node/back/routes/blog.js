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

router.post("/dashboard/blogBack", isAuthenticated, async (req, res, next) => {
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

router.delete(
  "/dashboard/blogBack/:id",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const blogId = parseInt(req.params.id);
      console.log("ID reçu du front :", blogId, "Type :", typeof blogId);
      const deleteBlog = await prisma.blog.delete({
        where: {
          id: blogId,
        },
      });
      if (!deleteBlog)
        return res.status(404).json({ error: "Record not found" });
      return res.status(200).send("Blog deleted successfully");
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Database error occurred", details: err.message });
    }
  },
);

export default router;
