import React, { useEffect } from 'react';
import '../../styles/Home.scss';
import avtADM from '../../images/Đen và Xanh mòng két Minh họa Thể thao Điện tử Game Logo (1).png';

export default function Home() {
  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">Welcome back, QiQiShop</h1>
      </div>
      <div className="header__right">
        <div className="header__search">
          <input className="header__search-input" type="text" placeholder="Search" />
        </div>
        <div className="header__notifications">
          <i className="header__icon icon-bell"></i>
        </div>
        <div className="header__profile">
          <img className='avtADM' src={avtADM} alt="" />
          <span className="header__profile-name">Admin</span>
          <i className="header__icon icon-dropdown"></i>
        </div>
      </div>
    </header>
  );
}