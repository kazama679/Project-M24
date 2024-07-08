import React, { useEffect, useState } from 'react';
import { addUser, getAllUser } from '../../store/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

const Register: React.FC = () => {
  const dispatch = useDispatch()
  const data: any = useSelector(state => state);
  useEffect(() => {
    dispatch(getAllUser());
  }, [])
  console.log("data", data.userReducer.users);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [pass2, setPass2] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const [messName, setMessName] = useState<boolean>(false);
  const [messCheckName, setMessCheckName] = useState<boolean>(false);
  const [messEmail, setMessEmail] = useState<boolean>(false);
  const [messPass, setMessPass] = useState<boolean>(false);
  const [messPhone, setMessPhone] = useState<boolean>(false);
  const [messAddress, setMessAddress] = useState<boolean>(false);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value)
  }
  const handleChangePasswordx2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass2(e.target.value)
  }
  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }
  // ngày
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const handleCLickSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(1);
    let isValid = true;
    
    if (name === '') {
      setMessName(true);
      isValid = false;
    } else {
      setMessName(false);
    }

    const isNameDuplicate = data.userReducer.users.some((user: any) => user.name === name);
    if (isNameDuplicate) {
      setMessCheckName(true);
      isValid = false;
    } else {
      setMessCheckName(false);
    }

    if (email === '') {
      setMessEmail(true);
      isValid = false;
    } else {
      setMessEmail(false);
    }

    if (pass !== pass2) {
      setMessPass(true);
      isValid = false;
    } else {
      setMessPass(false);
    }

    if (phone === '') {
      setMessPhone(true);
      isValid = false;
    } else {
      setMessPhone(false);
    }

    if (address === '') {
      setMessAddress(true);
      isValid = false;
    } else {
      setMessAddress(false);
    }

    if (isValid) {
      // thêm user
      const newUser = {
        id: Math.floor(Math.random() * 99999999),
        name: name,
        email: email,
        status: true,
        password: pass,
        phone: phone,
        address: address,
        created_at: formattedDate,
        updated_at: formattedDate,
      };
      dispatch(addUser(newUser));
      // chuyển hướng login
      window.location.href = 'http://localhost:5173';
    }
  };



  return (
    <div className="form-container sign-up-container">
      <form 
      // onSubmit={handleOnSubmit}
      >
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          // value={state.name}
          // onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          // value={state.email}
          // onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          // value={state.password}
          // onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;



{/* <div className="signup-form">
      <form className="signup-form__form" onSubmit={handleCLickSave}>
        <h2 className="signup-form__title">Đăng kí tài khoản</h2>
        <div className="signup-form__input-group">
          <input
            type="text"
            name="name"
            placeholder="Tên đăng nhập"
            className="signup-form__input"
            onChange={handleChangeName}
          />
          <div style={{ display: `${messName ? "block" : "none"}` }} className='mess'>Tên đăng nhập không được để trống</div>
          <div style={{ display: `${messCheckName ? "block" : "none"}` }} className='mess'>Tên đăng nhập không được phép trùng</div>
        </div>
        <div className="signup-form__input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="signup-form__input"
            onChange={handleChangeEmail}
          />
          <div style={{ display: `${messEmail ? "block" : "none"}` }} className='mess'>Email không được để trống</div>
        </div>
        <div className="signup-form__input-group">
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            className="signup-form__input"
            onChange={handleChangePassword}
          />
        </div>
        <div className="signup-form__input-group">
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="signup-form__input"
            onChange={handleChangePasswordx2}
          />
          <div style={{ display: `${messPass ? "block" : "none"}` }} className='mess'>Mật khẩu không trùng nhau</div>
        </div>
        <div className="signup-form__input-group">
          <input
            type="text"
            placeholder="Số điện thoại"
            className="signup-form__input"
            onChange={handleChangePhone}
          />
          <div style={{ display: `${messPhone ? "block" : "none"}` }} className='mess'>Số điện thoại không được để trống</div>
        </div>
        <div className="signup-form__input-group">
          <input
            type="text"
            placeholder="Địa chỉ"
            className="signup-form__input"
            onChange={handleChangeAddress}
          />
          <div style={{ display: `${messAddress ? "block" : "none"}` }} className='mess'>Địa chỉ không được để trống</div>
        </div>

        <div className="signup-form__checkbox-group">
          <input
            type="checkbox"
            name="agreeToTerms"
            className="signup-form__checkbox"
          />
          <label className="signup-form__label">
            Tôi đồng ý với <a href="#">Điều khoản Dịch vụ</a>
          </label>
        </div>
        <button type="submit" className="signup-form__button">Đăng ký</button>
      </form>
      <div className="signup-form__already-member">
        <img className='signup-form__image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtPsTo0O4HPdTD9J01zGVBExsmHwGK-kC6sA&s" alt="" />
        <a href="/">Bạn đã có tài khoản?</a>
      </div>
    </div> */}