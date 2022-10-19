import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../style/Login.css";
import "../../fonts/default.css";

const AuthForm = ({ setToken }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [passwordEnabled, setPasswordEnabled] = useState(false);

  const inputChange = (event) => {
    const {
      target: { id, value },
    } = event;

    setMessage(null);

    if (id === "email") {
      setEmail(value);
      if (value === "") {
        setMessage(`이메일을 입력해주세요.`);
        setEmailEnabled(false);
      } else if (!value.includes("@") || !value.includes(".")) {
        setMessage(`이메일 형식으로 입력해주세요.`);
        setEmailEnabled(false);
      } else {
        setEmailEnabled(true);
      }
    }

    if (id === "password") {
      setPassword(value);
      if (value === "") {
        setMessage(`비밀번호를 입력해주세요.`);
        setPasswordEnabled(false);
      } else if (value.length < 8) {
        setMessage(`비밀번호는 8자리 이상 입력해주세요.`);
        setPasswordEnabled(false);
      } else {
        setPasswordEnabled(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://pre-onboarding-selection-task.shop/auth/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.access_token);
          window.location.href = "/todo";
        }
      });
  };

  return (
    <div className="LoginForm">
      <div
        className="LoginTitle"
        style={{
          fontFamily: "NanumSquareNeo-eHv",
          letterSpacing: "5px",
          fontSize: "30px",
          margin: " 5%",
        }}
      >
        로그인
      </div>
      <div className="form-row">
        <label htmlFor="email" style={{ marginRight: "10px" }}>
          아이디
        </label>
        <input
          className="inputText"
          type="email"
          id="email"
          value={email}
          onChange={inputChange}
          placeholder="example@wanted.com"
        />
      </div>
      <div className="form-row">
        <label htmlFor="password" style={{ marginRight: "10px" }}>
          비밀번호
        </label>
        <input
          className="inputText"
          type="password"
          id="password"
          value={password}
          onChange={inputChange}
        />

        <div className="actions">
          <Link to="/todo">
            <button
              className="loginBtn"
              type="submit"
              disabled={!(emailEnabled && passwordEnabled)}
              onClick={handleSubmit}
            >
              로그인
            </button>
          </Link>
          <div style={{ paddingBottom: "10%" }}>
            <Link to="/join">아직 회원이 아니신가요?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
