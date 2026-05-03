import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import "../config/passport.js";
import prisma from "../db/psql.js";

const router = express.Router();

router.get("/todoBack", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await prisma.todo.findMany({
      where: { authorId: userId },
    });
  } catch {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/todoBack", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { item, createdAt } = req.body;
    const date = new Date();
    const todo = await prisma.todo.create({
      data: {
        item,
        createdAt: date,
        authorId: userId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/todoBack/:id", async (req, res, next) => {
  try {
    const todoId = req.todo.id;
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
