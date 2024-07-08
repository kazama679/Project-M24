import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../store/reducers/userReducer';

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
        // onSubmit={handleOnSubmit}
      >
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          // value={state.email}
          // onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          // value={state.password}
          // onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Login;


// onChange={handleChangeEmail}
// onChange={handleChangePassword}
// onClick={handleClickLogin}