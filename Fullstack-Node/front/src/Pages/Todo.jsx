import { useState } from "react";
import { useForm } from "react-hook-form";
import ToDoItem from "../Component/ToDoItem";
import Button from "react-bootstrap/Button";

function Todo() {
  const [toDoTtems, setToDoTtems] = useState([]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      todo: "",
    },
  });

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
          <div className="bg-emerald-800 mx-auto p-10 text-white flex flex-col ml-200 mb-120">
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
          <div className="bg-fuchsia-800 p-10 text-white ml-200 -mt-90 mb-20">
            <h1>To Do List</h1> <br />
            <hr />
            <ToDoItem toDoTtems={toDoTtems} onDelete={onDeleteTodo} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Todo;
