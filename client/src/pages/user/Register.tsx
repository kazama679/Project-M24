import React, { useEffect, useState } from 'react';
import { addUser, getAllUser } from '../../store/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const data: any = useSelector(state => state);
  
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  
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
  const [messEmail2, setMessEmail2] = useState<boolean>(false);
  const [messPass, setMessPass] = useState<boolean>(false);
  const [messPhone, setMessPhone] = useState<boolean>(false);
  const [messAddress, setMessAddress] = useState<boolean>(false);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };
  const handleChangePasswordx2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass2(e.target.value);
  };
  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  const isPasswordStrong = (password: string): boolean => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleCLickSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    
    if (name === '') {
      isValid = false;
      setMessName(true);
      setTimeout(() => {
        setMessName(false);
      }, 3000);
    } else {
      setMessName(false);
    }

    const isNameDuplicate = data.userReducer.users.some((user: any) => user.name === name);
    if (isNameDuplicate) {
      isValid = false;
      setMessCheckName(true);
      setTimeout(() => {
        setMessCheckName(false);
      }, 3000);
    } else {
      setMessCheckName(false);
    }

    const isEmailDuplicate = data.userReducer.users.some((user: any) => user.email === email);
    if (isEmailDuplicate) {
      isValid = false;
      setMessEmail2(true);
      setTimeout(() => {
        setMessEmail2(false);
      }, 3000);
    } else {
      setMessEmail2(false);
    }

    if (email === '') {
      isValid = false;
      setMessEmail(true);
      setTimeout(() => {
        setMessEmail(false);
      }, 3000);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setMessEmail(false);
      setMessEmail2(true);
      isValid = false;
      setTimeout(() => {
        setMessEmail2(false);
      }, 3000);
    } else {
      setMessEmail(false);
      setMessEmail2(false);
    }

    if (!isPasswordStrong(pass)) {
      isValid = false;
      setMessPass(true);
      setTimeout(() => {
        setMessPass(false);
      }, 3000);
    } else if (pass !== pass2) {
      isValid = false;
      setMessPass(true);
      setTimeout(() => {
        setMessPass(false);
      }, 3000);
    } else {
      setMessPass(false);
    }

    if (phone === '') {
      isValid = false;
      setMessPhone(true);
      setTimeout(() => {
        setMessPhone(false);
      }, 3000);
    } else {
      setMessPhone(false);
    }

    if (address === '') {
      isValid = false;
      setMessAddress(true);
      setTimeout(() => {
        setMessAddress(false);
      }, 3000);
    } else {
      setMessAddress(false);
    }

    if (isValid) {
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
      window.location.href = 'http://localhost:5173';
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className='form'>
        <h1>Create Account</h1>
        <input className='input'
          type="text"
          name="name"
          placeholder="Tên đăng nhập"
          onChange={handleChangeName}
        />
        <div style={{ display: `${messName ? "block" : "none"}` }} className='mess'>Tên đăng nhập không được để trống</div>
        <div style={{ display: `${messCheckName ? "block" : "none"}` }} className='mess'>Tên đăng nhập không được phép trùng</div>
        <input className='input'
          type="email"
          name="email"
          onChange={handleChangeEmail}
          placeholder="Email"
        />
        <div style={{ display: `${messEmail ? "block" : "none"}` }} className='mess'>Email không được để trống</div>
        <div style={{ display: `${messEmail2 ? "block" : "none"}` }} className='mess'>Định dạng Email không đúng hoặc Email bị trùng</div>
        <input className='input'
          type="password"
          name="password"
          onChange={handleChangePassword}
          placeholder="Mật khẩu"
        />
        <input className='input'
          type="password"
          name="password"
          onChange={handleChangePasswordx2}
          placeholder="Nhập lại mật khẩu"
        />
        <div style={{ display: `${messPass ? "block" : "none"}` }} className='mess'>Mật khẩu phải đủ mạnh và không trùng nhau</div>
        <input className='input'
          type="text"
          placeholder="Số điện thoại"
          onChange={handleChangePhone}
        />
        <div style={{ display: `${messPhone ? "block" : "none"}` }} className='mess'>Số điện thoại không được để trống</div>
        <input className='input'
          type="text"
          placeholder="Địa chỉ"
          onChange={handleChangeAddress}
        />
        <div style={{ display: `${messAddress ? "block" : "none"}` }} className='mess'>Địa chỉ không được để trống</div>
        <button className='button' onClick={handleCLickSave}>Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;
