import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { TiTrash, TiPencil } from "react-icons/ti";
import "../../style/TodoItem.css";

const TodoItem = ({
  todo,
  onCheckToggle,
  onInsertToggle,
  selectedTodo,

  onChangeSelectedTodo,
  onUpdate,
  onRemove,
}) => {
  const { id, text, isCompleted } = todo;
  const [value, setValue] = useState("");

  return (
    <div className="TodoItem">
      <div
        className={`content ${isCompleted ? "isCompleted" : ""}`}
        onClick={() => {
          onCheckToggle(todo.id);
        }}
      >
        {todo.isCompleted ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div
          className="text"
          onClick={() => {
            onChangeSelectedTodo(todo);
            onInsertToggle();
          }}
        >
          {todo.todo}
        </div>

        <TiPencil
          style={{ marginRight: "15px" }}
          onClick={() => {
            onChangeSelectedTodo(todo);
            onInsertToggle();
          }}
        />
        <TiTrash
          onClick={() => {
            onRemove(todo.id);
          }}
        />
      </div>
    </div>
  );
};

export default TodoItem;
