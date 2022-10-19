import React, { useState, useEffect } from "react";
import { MdAddCircle } from "react-icons/md";
import { TiTrash, TiPencil } from "react-icons/ti";
import "../../style/TodoInsert.css";

const TodoInsert = ({
  onInsertToggle,
  onInsertTodo,
  selectedTodo,
  onRemove,
  onUpdate,
}) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onInsertTodo(value);
    setValue("");
    onInsertToggle();
  };

  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.todo);
    }
  }, [selectedTodo]);
  return (
    <div>
      <div className="background" onClick={onInsertToggle}></div>
      <form
        className="insertForm"
        onSubmit={
          selectedTodo
            ? () => {
                onUpdate(selectedTodo.id, value, selectedTodo.isCompleted);
              }
            : onSubmit
        }
      >
        <input
          placeholder="please type"
          value={value}
          onChange={onChange}
        ></input>

        {selectedTodo ? (
          <div className="rewrite">
            <TiPencil
              onClick={() => {
                onUpdate(selectedTodo.id, value, selectedTodo.isCompleted);
              }}
            />
            <TiTrash
              onClick={() => {
                onRemove(selectedTodo.id);
              }}
            />
          </div>
        ) : (
          <button type="submit">
            <MdAddCircle />
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoInsert;
