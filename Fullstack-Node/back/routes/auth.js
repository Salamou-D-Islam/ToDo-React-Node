import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import e from "express";

const router = express.Router();
const prisma = new PrismaClient();
const saltRounds = 10;

// ---------------- REGISTER ----------------
router.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Email déjà utiliser" });

    // Hash le mot de passe
    const hashedPassword = await bycrypt.hash(password, saltRounds);

    // Crée un nouvel utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    res.json({
      message: "Utilisateur crée",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", passport.authenticate("local"), (req, res) => {
  // passport met l'utilisateur connecté dans req.user
  res.json({ message: "Connecté avec succès", user: req.user });
});

// ---------------- LOGOUT ----------------
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

export default router;
