import { useState } from "react";
import { useForm } from "react-hook-form";
import Item from "../Component/Item";
import Button from "react-bootstrap/Button";

function Blog() {
  const [items, setItems] = useState([]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  const onSubmit = async (data) => {
    setItems([...items, data]);
    reset();
  };

  const onDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <>
      <section className="flex">
        <div>
          <div className="bg-emerald-800 mx-auto p-10 text-white flex flex-col ml-200 mb-20">
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
      </section>
    </>
  );
}

export default Blog;
