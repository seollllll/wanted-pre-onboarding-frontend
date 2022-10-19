import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../style/Join.css";

const Join = ({ setToken }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [message, setMessage] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [passwordEnabled, setPasswordEnabled] = useState(false);

  const submitHnadler = (event) => {
    event.preventDefault();

    setMessage(null);

    setMessage(`회원가입을 진행합니다.`);
  };

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

  const onHandleSubmit = (e) => {
    e.preventDefault();
    fetch("https://pre-onboarding-selection-task.shop/auth/signup", {
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
        console.log(response);
        window.location.href = "/";
      });
  };

  return (
    <div className="JoinForm">
      <div className="JoinTitle">회원가입</div>
      <form
        className="auth"
        method="post"
        action="/users/create"
        onSubmit={onHandleSubmit}
      >
        <div className="form-row">
          <label htmlFor="email">이메일</label>
          <input
            className="inputText"
            type="email"
            id="email"
            value={email}
            onChange={inputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">비밀번호</label>
          <input
            className="inputText"
            type="password"
            id="password"
            value={password}
            onChange={inputChange}
          />
        </div>
        {message && <p className="error">{message}</p>}

        <div className="actions">
          <button
            className="JoinBtn"
            type="submit"
            disabled={!(emailEnabled && passwordEnabled)}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join;
