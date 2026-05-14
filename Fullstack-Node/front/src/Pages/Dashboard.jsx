import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Home from "./Home";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/dashboard", {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 401) {
          navigate("/login"); // pas connecté donc redirection
        } else {
          setAuthorized(true); // session valide
        }
      } catch (err) {
        navigate("/login"); // erreur réseau donc redirection
      } finally {
        setLoading(false); // vérification terminée
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/");
    } catch (err) {
      console.error("Erreur déconnexion :", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!authorized) {
    return null; // redirection déjà faite
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center w-120 h-120 bg-emerald-800 ml-180 text-2xl">
        <section className="flex flex-col items-center justify-center w-120   text-2xl">
          <h2>BIENVENUE DANS VOTRE DASHBOARD</h2> <br />
        </section>
        <Link to="/dashboard/blogBack">
          <Button>Blog</Button>
        </Link>
        <Link to="/dashboard/todoBack" className="m-6">
          <Button>To Do List</Button>
        </Link>
        <Button type="button" onClick={handleLogout} variant="danger">
          Se Déconnecter
        </Button>
      </section>
    </>
  );
}

export default Dashboard;
