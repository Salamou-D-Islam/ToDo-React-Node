import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import "../config/passport.js";
import prisma from "../db/psql.js";

const router = express.Router();

router.get("/blogBack", async (req, res, next) => {
  try {
    const result = await prisma.blog.findMany();
  } catch {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/blogBack", async (req, res, next) => {
  try {
    const { title, description, createdAt } = req.body;
    const date = new Date();
    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        createdAt: date,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
