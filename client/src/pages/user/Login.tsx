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
  const [messLogin, setMessLogin] = useState<boolean>(false);
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
      setMessLogin(true);
      setTimeout(()=>{
        setMessLogin(false);
      },3000);
    }
  }
  return (
    <div className="form-container sign-in-container">
      <form className='form'
      >
        <h1>Đăng nhập</h1>
        <div className="social-container">
          <a href="https://www.facebook.com/" className="social">
            <FaFacebook />
          </a>
          <a href="https://myaccount.google.com/" className="social">
            <TiSocialGooglePlus/>
          </a>
          <a href="https://web.telegram.org/" className="social">
            <FaTelegram />
          </a>
        </div>
        <input className='input'
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChangeEmail}
        />
        <input className='input'
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChangePassword}
        />
        <div style={{ display: `${messLogin ? "block" : "none"}` }} className='mess'>Tài khoản hoặc mật khẩu không chính xác</div>
        <a href="#">Bạn quên mật khẩu?</a>
        <button className='button' onClick={handleClickLogin}>Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;