import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../store/reducers/userReducer';
import { FaFacebook } from "react-icons/fa";
import { TiSocialGooglePlus } from "react-icons/ti";
import { FaTelegram } from "react-icons/fa";

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const data: any = useSelector(state => state);
  useEffect(() => {
    dispatch(getAllUser());
  }, [])
  console.log("data", data.userReducer.users);

  const [email, setEmail] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  // hàm kiểm tra xem có tk ko
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  }
  const handleClickLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = data.userReducer.users.find((user: any) => user.email === email && user.password === pass);
    if (user) {
      window.location.href = 'http://localhost:5173/Home';
    } else {
      console.log('sai');
    }
  }
  return (
    <div className="form-container sign-in-container">
      <form 
      >
        <h1>Đăng nhập</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FaFacebook />
          </a>
          <a href="#" className="social">
            <TiSocialGooglePlus/>
          </a>
          <a href="#" className="social">
            <FaTelegram />
          </a>
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChangePassword}
        />
        <a href="#">Bạn quên mật khẩu?</a>
        <button onClick={handleClickLogin}>Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;

