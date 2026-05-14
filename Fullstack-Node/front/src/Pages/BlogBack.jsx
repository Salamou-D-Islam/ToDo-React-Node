import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Item from "../Component/Item";
import Button from "react-bootstrap/Button";
import { getAllBlogs, createBlog, deleteBlog } from "../services/blogApi.js";
import CircularProgress from "@mui/material/CircularProgress";

function BlogBack() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/dashboard/blogBack", {
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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getAllBlogs();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  const onSubmit = async (data) => {
    try {
      const newBlog = await createBlog(data);
      setItems([...items, newBlog]);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteBlog(id);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert("Impossible de supprimer l'article.");
    }
  };

  if (loading)
    return (
      <div className="mt-20 flex flex-col items-center text-white">
        <CircularProgress />
        <span>Chargement en cours… Veuillez patienter</span>
      </div>
    );

  return (
    <>
      <section className="flex">
        <div>
          <div className="bg-emerald-800 mx-auto p-10 text-white flex flex-col ml-200 mb-20">
            <h1 className="mx-auto mb-10">Add Card on DB</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border-3 p-10 flex flex-col border-white"
            >
              <label htmlFor="">Titre</label>
              <input
                type="text"
                name="title"
                className="border-2 border-white"
                {...register("title")}
              />

              <label htmlFor="">Description</label>
              <textarea
                name="description"
                id="description"
                className="border-2 border-white"
                {...register("description")}
              ></textarea>
              <br />
              <Button type="submit" variant="outline-success">
                Add Item
              </Button>
            </form>
          </div>
          <div className="flex">
            <Item items={items} onDelete={onDelete} />
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogBack;
