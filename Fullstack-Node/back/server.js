//-------------------DEPENDANCE-------------------------

import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";

import "./config/db.js";
import "./config/mongodb.js";

import authRoutes from "./routes/auth.js";

import { connectDB } from "./config/mongodb.js";

connectDB();

dotenv.config();

// const __dirname = dirname(fileURLToPath(import.meta.url));

//--------------------PORT--------------

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const saltRounds = 10;

// Parse JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("Public"));

//--------------------SESSION--------------

// Middleware pour gérer les sessions

app.use(
  session({
    secret: process.env.SESSION_SECRETS,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
