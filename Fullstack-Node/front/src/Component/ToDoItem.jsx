import { useState } from "react";
import viteLogo from "/vite.svg";
import Button from "react-bootstrap/Button";

function ToDoItem({ toDoTtems, onDeleteTodo }) {
  return (
    <>
      {toDoTtems.map((todoitem) => (
        <li>
          <ul key={todoitem.id}>
            <p>{todoitem.item}</p>
            <Button onClick={() => onDeleteTodo(todoitem.id)}>Supprimer</Button>
          </ul>
        </li>
      ))}
    </>
  );
}

export default ToDoItem;
