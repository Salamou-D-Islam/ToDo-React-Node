import { useState } from "react";
import { useForm } from "react-hook-form";
import Item from "./Component/Item";
import ToDoItem from "./Component/ToDoItem";
import Button from "react-bootstrap/Button";

function App() {
  const [items, setItems] = useState([]);
  const [toDoTtems, setToDoTtems] = useState([]);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      desc: "",
      todo: "",
    },
  });

  const onSubmit = async (data) => {
    setItems([...items, data]);
    reset();
  };

  const onDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
  const onSubmitTodo = async (data) => {
    setToDoTtems([...toDoTtems, data]);
    reset();
  };

  const onDeleteTodo = (index) => {
    setToDoTtems(toDoTtems.filter((_, i) => i !== index));
  };
  return (
    <>
      <section className="flex">
        <div>
          <div className="bg-blue-700 mx-auto p-10 text-white flex flex-col ml-100 mb-20">
            <h1 className="mx-auto mb-10">Add Card</h1>
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
                name="desc"
                id="desc"
                className="border-2 border-white"
                {...register("desc")}
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
        <div>
          <div className="bg-blue-700 mx-auto p-10 text-white flex flex-col ml-100 mb-120">
            <h1 className="mx-auto mb-10">To Do List</h1>
            <form
              onSubmit={handleSubmit(onSubmitTodo)}
              className="border-3 p-10 flex flex-col border-white"
            >
              <label htmlFor="">To Do Item</label>
              <input
                type="text"
                name="title"
                className="border-2 border-white"
                {...register("todo")}
              />

              <br />
              <Button type="submit" variant="outline-success">
                Add Item
              </Button>
            </form>
          </div>
          <div className="bg-fuchsia-800 p-10 text-white ml-100 -mt-90 mb-20">
            <h1>To Do List</h1> <br />
            <hr />
            <ToDoItem toDoTtems={toDoTtems} onDelete={onDeleteTodo} />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
