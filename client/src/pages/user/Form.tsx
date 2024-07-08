import React, { useState } from "react";
import "../../styles/Login.scss";
import Login from "../user/Login";
import Register from "../user/Register";
import image from '../../images/Đen và Xanh mòng két Minh họa Thể thao Điện tử Game Logo (1).png'

export default function Form() {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text:any) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
      <div className={containerClass} id="container">
        <Login />
        <Register />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                Bạn đã có tài khoản
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Đăng nhập
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <div>
                <img src={image} alt="" className="imageLogo"/>
              </div>
              <p>Bạn chưa có tài khoản?</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
