import { useState } from "react";
import viteLogo from "/vite.svg";
import Button from "react-bootstrap/Button";

function Item({ items, onDelete }) {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-fuchsia-800 mx-auto p-10 text-white flex flex-col"
        >
          <h1>{item.title}</h1>
          <hr />
          <h2>{item.description}</h2>
          <br />
          <Button onClick={() => onDelete(item.id)}>Supprimer</Button>
        </div>
      ))}
    </>
  );
}

export default Item;
