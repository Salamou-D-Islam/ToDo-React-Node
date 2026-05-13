import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import "../config/passport.js";
import prisma from "../db/psql.js";
import isAuthenticated from "../routes/auth.js";

const router = express.Router();

router.get("/dashboard/todoBack", isAuthenticated, async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Non autorisé" });
    }
    const userId = req.user.id;
    const result = await prisma.todo.findMany({
      where: { authorId: userId },
    });
    res.status(200).json(result);
  } catch {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/dashboard/todoBack", isAuthenticated, async (req, res, next) => {
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
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete(
  "/dashboard/todoBack/:id",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const todoId = parseInt(req.params.id);
      console.log("ID reçu du front :", todoId, "Type :", typeof todoId);
      const deleteTodo = await prisma.todo.delete({
        where: {
          id: todoId,
        },
      });
      if (!deleteTodo)
        return res.status(404).json({ error: "Record not found" });
      return res.status(200).send("Item deleted successfully");
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Database error occurred", details: err.message });
    }
  },
);

export default router;
