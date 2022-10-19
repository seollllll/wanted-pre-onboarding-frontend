import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Template from "./components/todo/Template";
import TodoList from "./components/todo/TodoList";
import { MdAddCircle } from "react-icons/md";
import TodoInsert from "./components/todo/TodoInsert";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let nextId = 4;

const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [id, setId] = useState();
  const [todos, setTodos] = useState([]);

  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle((prev) => !prev);
  };

  const onCheckToggle = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const getTodo = () => {
    axios
      .get("https://pre-onboarding-selection-task.shop/todos", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((result) => {
        console.log(result);
        setTodoList(result.data);
        setTodos(result.data);
      });
  };

  const onInsertTodo = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        todo: text,
        isCompleted: false,
      };

      fetch("https://pre-onboarding-selection-task.shop/todos", {
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
        mode: "cors",
      })
        .then(() => {
          window.location.reload();
        })
        .then((result) => {
          console.log(todos);
          setTodos(result);
          setId(id + 1);
          // setTodos(todos.concat(todos));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [todos, id]
  );

  const onRemove = useCallback((id) => {
    axios({
      method: "delete",
      url: `https://pre-onboarding-selection-task.shop/todos/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      getTodo();
    });
  });

  const onUpdate = useCallback((id, text, isCompleted) => {
    console.log(id);

    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: text, isCompleted: isCompleted }),
    })
      .then((response) => {
        console.log(response);
        // setTodos(response);
        onInsertToggle();
        getTodo();
      })
      .catch((e) => {
        console.log(e);
      });
  });

  useEffect(() => {
    getTodo();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  });

  return (
    <Template todoLength={todos.length}>
      <TodoList
        todos={todos}
        onCheckToggle={onCheckToggle}
        onInsertToggle={onInsertToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
        onInsertTodo={onInsertTodo}
        onRemove={onRemove}
        onUpdate={onUpdate}
        todoList={todoList}
        setTodoList={setTodoList}
      />

      {insertToggle && (
        <TodoInsert
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle}
          onInsertTodo={onInsertTodo}
          onRemove={onRemove}
          onUpdate={onUpdate}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      )}
    </Template>
  );
};

export default App;
