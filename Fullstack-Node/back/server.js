//-------------------DEPENDANCE-------------------------

import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config();

//--------------------PORT--------------

const app = express();
//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const port = process.env.PORT || 3000;

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

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le serveur backend !" });
});
//--------------------LISTEN--------------
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
