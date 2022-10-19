import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { MdAddCircle } from "react-icons/md";
import "../../style/TodoList.css";

const TodoList = ({
  todos,
  onCheckToggle,
  onInsertToggle,
  onInsertTodo,
  onChangeSelectedTodo,
  selectedTodo,
  onRemove,
  onUpdate,
  todoList,
  setTodoList,
}) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onInsertTodo(value);
    setValue("");
  };

  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
    }
  }, [selectedTodo]);

  return (
    <div className="TodoList">
      <form className="add-todo-button" onSubmit={onSubmit}>
        <input
          style={{
            borderRight: "none",
            borderLeft: "none",
            borderTop: "none",
            height: "50px",
            fontSize: "20px",
          }}
          placeholder="할 일을 입력하세요"
          value={value}
          onChange={onChange}
        ></input>
        <button
          type="submit"
          style={{ border: "none", backgroundColor: "transparent" }}
        >
          <MdAddCircle oIosClose size="60" color="#2C786C" />
        </button>
      </form>

      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onCheckToggle={onCheckToggle}
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;
