import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../src/components/auth/Join";
import Login from "../src/components/auth/Login";
import App from "./App";

const AppRouter = () => {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setLogin(true);
    } else {
      setToken(null);
      setLogin(false);
    }
  }, [token]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/todo" element={login ? <App /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
