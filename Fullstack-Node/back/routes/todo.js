import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import "../config/passport.js";
import prisma from "../db/psql.js";

const router = express.Router();

router.get("/todoBack", async (req, res, next) => {
  try {
    const result = await prisma.todo.findMany();
  } catch {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/todoBack", async (req, res, next) => {
  try {
    const { item, createdAt } = req.body;
    const date = new Date();
    const blog = await prisma.todo.create({
      data: {
        item,
        createdAt: date,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
