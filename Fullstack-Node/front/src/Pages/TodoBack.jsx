import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ToDoItem from "../Component/ToDoItem";
import Button from "react-bootstrap/Button";
import { getAllTodos, createTodo, deleteTodo } from "../services/todoApi.js";
import CircularProgress from "@mui/material/CircularProgress";

function TodoBack() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [toDoTtems, setToDoTtems] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      item: "",
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/dashboard/todoBack", {
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
        const data = await getAllTodos();
        setToDoTtems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  const onSubmitTodo = async (data) => {
    try {
      const newTodo = await createTodo(data);
      setToDoTtems([...toDoTtems, newTodo]);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const onDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setToDoTtems((prevItems) => prevItems.filter((item) => item.id !== id));
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
          <div className="bg-emerald-800 mx-auto p-10 text-white flex flex-col ml-200 mb-120">
            <h1 className="mx-auto mb-10">To Do List on DB</h1>
            <form
              onSubmit={handleSubmit(onSubmitTodo)}
              className="border-3 p-10 flex flex-col border-white"
            >
              <label htmlFor="">To Do Item</label>
              <input
                type="text"
                name="item"
                className="border-2 border-white"
                {...register("item")}
              />

              <br />
              <Button type="submit" variant="outline-success">
                Add Item
              </Button>
            </form>
          </div>
          <div className="bg-fuchsia-800 p-10 text-white ml-200 -mt-90 mb-20">
            <h1>To Do List</h1> <br />
            <hr />
            <ToDoItem toDoTtems={toDoTtems} onDeleteTodo={onDeleteTodo} />
          </div>
        </div>
      </section>
    </>
  );
}

export default TodoBack;
