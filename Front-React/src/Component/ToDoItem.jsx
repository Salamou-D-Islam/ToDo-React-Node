import { useState } from "react";
import viteLogo from "/vite.svg";
import Button from "react-bootstrap/Button";

function ToDoItem({ toDoTtems, onDelete }) {
  return (
    <>
      {toDoTtems.map((todoitem, index) => (
        <li>
          <ul key={index}>
            <p>{todoitem.todo}</p>
            <Button onClick={() => onDelete(index)}>Supprimer</Button>
          </ul>
        </li>
      ))}
    </>
  );
}

export default ToDoItem;
