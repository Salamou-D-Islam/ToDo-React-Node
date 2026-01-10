import passport from "passport";
import prisma from "../db/psql.js";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Cherche l'utilisateur par email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return done(null, false, { message: "Incorrect email" });

        // Compare le mot de passe avec le hash
        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Incorrect password" });

        // Tout est ok → renvoie l'utilisateur
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Sérialisation / désérialisation de l'utilisateur pour les sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
