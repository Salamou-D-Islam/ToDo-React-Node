import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import "../config/passport.js";
import prisma from "../db/psql.js";

const router = express.Router();
const saltRounds = 10;

// ---------------- REGISTER ----------------
router.post("/register", async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Création utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // AUTO-LOGIN
    req.logIn(user, (err) => {
      if (err) return next(err);

      const { password, ...safeUser } = user;

      return res.json({
        message: "Compte créé et connecté",
        user: safeUser,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Identifiants invalides",
      });
    }

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });

      const { password, ...safeUser } = user;

      res.json({
        message: "Connecté avec succès",
        user: safeUser,
      });
    });
  })(req, res, next);
});

// ---------------- LOGOUT ----------------
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // Supprime le cookie de session
      res.json({ message: "Logged out" });
    });
  });
});

// ---------------- DASHBOARD ----------------

// Middleware pour vérifier l'authentification
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Not authenticated" });
}

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.json({ message: "Bienvenue dans votre dashboard", user: req.user });
});

export default router;
