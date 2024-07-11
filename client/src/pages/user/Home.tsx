import React, { useEffect, useState } from 'react';
import '../../styles/Home.scss';
import image1 from '../../images/slide_1.jpg'
import image2 from '../../images/hinh-nen-may-tinh-4k-1.jpg'
import image3 from '../../images/Đen và Xanh mòng két Minh họa Thể thao Điện tử Game Logo (1).png'
import { MdMailOutline, MdOutlineConfirmationNumber, MdOutlineNavigateBefore, MdOutlineNavigateNext, MdOutlineWorkHistory } from 'react-icons/md';
import { FaFacebook, FaGoogle, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaRedo, FaSearch, FaStar, FaTwitch, FaYoutube } from 'react-icons/fa';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../store/reducers/productReducer';
import { getAllCategory } from '../../store/reducers/categoryReducer';
import { FcCheckmark } from 'react-icons/fc';
import { GiCheckMark } from 'react-icons/gi';
import { CgCalendarDates } from 'react-icons/cg';
import { FaPlugCircleCheck } from 'react-icons/fa6';

const Home: React.FC = () => {

  const data: any = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
  }, []);
  console.log(data);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    image1,
    image2,
    image3
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // bấm vào feedback 
  const handleMail = () => {
    window.location.href = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new'
  }

  // format tiền
  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}
  return (
    <div className='allBanner'>
      <div className='allBanner-header'>
        <div><FaPhoneAlt /> +83 349 199 812</div>
        <div><FaMapMarkerAlt /> 27 Tân Triều, Hà Đông, Hà Nội</div>
        <div className='allBanner-header-top1'><MdOutlineWorkHistory /> Work Hours</div>
        <div className='allBanner-header-top2'>
          <div><FaFacebook /></div>
          <div><FaInstagram /></div>
          <div><FaTwitch /></div>
          <div><FaGoogle /></div>
        </div>
      </div>

      <div className='allBanner-header2'>
        <div className='allBanner-header2-text'>Laptops</div>
        <div className='allBanner-header2-top'>
          <div>TRANG CHỦ</div>
          <div>DANH MỤC</div>
          <div>DỊCH VỤ CỦA CHÚNG TÔI</div>
          <div>BLOG</div>
          <div>MEGA MENU</div>
          <div>CỬA HÀNG</div>
          <div>TRANG</div>
        </div>
        <div className='allBanner-header2-cart'>
          <div className='allBanner-header2-cart-number'>0</div>
          <RiShoppingCart2Fill />
        </div>
      </div>

      <div className="carousel">
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            >
              <img src={image} className="d-block w-100" alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" onClick={prevSlide}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden"><MdOutlineNavigateBefore /></span>
        </button>
        <button className="carousel-control-next" onClick={nextSlide}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden"><MdOutlineNavigateNext /></span>
        </button>
      </div>

      <div className="search-inventory">
        <div className="search-inventory-header">
          <FaSearch className="search-inventory-icon" />
          <span>Tìm kiếm Laptop</span>
        </div>
        <div className="search-inventory-controls">
          <select className="search-inventory-select">
            <option>Chọn năm</option>
            <option>Năm 2023</option>
            <option>Năm 2022</option>
            <option>Năm 2021</option>
            <option>Năm 2020</option>
          </select>
          <select className="search-inventory-select">
            <option>Chọn loại</option>
            {data.categoryReducer.classify.map((item)=>{
              return <option key={item.id}>{item.name}</option>
            })}
          </select>
          <select className="search-inventory-select">
            <option>Chọn giá</option>
            <option>Giá từ 10-15tr</option>
            <option>Giá từ 15-20tr</option>
            <option>Giá từ 20-25tr</option>
            <option>Giá từ 25-30tr</option>
          </select>
          <button className="search-inventory-button search-button">
            <FaSearch />
            Tìm Kiếm
          </button>
          <button className="search-inventory-button reset-button">
            <FaRedo />
          </button>
        </div>
      </div>

      <div className="recent-cars">
        <h1 className="title">
          RECENT <span className="highlight">Laptop</span>
        </h1>
        <p className="subtitle">
          Curabitur tellus leo, euismod sit amet gravida at, egestas sed commodo.
        </p>
      </div>

      <div className="car-list">
        {data.productReducer.products.map(item => (
          <div key={item.id} className="car-card">
            <img src={item.image} className="car-image" />
            <div className="car-details">
              <h2 className="car-name">{item.name}</h2>
              <div className="car-details-buy">
                <button className="buy-online">BUY ONLINE</button>
                <div className="car-price">{formatVND(item.price)}</div>
              </div>
              <div className="car-info">
                <span className="car-year"><GiCheckMark /> Chính hãng</span>
                <span className="car-fuel"><CgCalendarDates /> 2023</span>
                <span className="car-transmission"><FaPlugCircleCheck /> Sạc nhanh!</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-section">
        <div className="contact-text">
          BẠN CÓ CÂU HỎI? ĐỪNG NGẦN NGẠI HỎI...
        </div>
        <div className="contact-info">
          <div className="contact-item">
            <FaPhoneAlt className='faPhone' /> +83 349 199 812
          </div>
          <div className="contact-item contact-item2">
            <button className="feedback-button" onClick={handleMail}>
              <MdMailOutline className="feedback-button-mail-1" /> <div className="feedback-button-mail-2">FEEDBACK</div>
            </button>
          </div>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-title">LAPTOPS <span className="highlight">WORDPRESS THEME</span></h4>
          <p>Fusce interdum ipsum egestas urna amet fringilla, et placerat ex venenatis. Aliquet luctus pharetra. Proin sed fringilla lectus...</p>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">Bộ sưu tập ảnh</h4>
          <div className="photo-gallery">
            <img src="https://hoanghamobile.com/Uploads/2024/04/25/laptop-gaming-11.jpg" alt="Photo 1" className="gallery-img" />
            <img src="https://laptopaz.vn/media/news/2109_co-su-dung-laptop-choi-game-de-lam-do-hoa-duoc-khong-4.jpg" alt="Photo 2" className="gallery-img" />
            <img src="https://file.hstatic.net/1000026716/file/laptop-gaming-1_ab19abe37d5540cf8e40c0dd5839923a.jpg" alt="Photo 3" className="gallery-img" />
          </div>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">LATEST BLOG POSTS</h4>
          <p>Cras condimentum a elit eget sagittis. Ut dignissim sapien feugiat purus tristique, vitae...</p>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">SOCIAL NETWORK</h4>
          <div className="social-icons">
            <FaFacebook />
            <FaTwitch />
            <FaInstagram />
            <FaGoogle />
            <FaYoutube />
          </div>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">SUBSCRIBE</h4>
          <div className="subscribe-form">
            <input type="email" placeholder="Enter your email..." className="subscribe-input" />
            <button className="subscribe-button"><i className="fas fa-rss"></i></button>
          </div>
          <p>Get latest updates and offers.</p>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">SALES HOURS</h4>
          <p className="footer-section-text1">Monday - Friday: 09:00AM - 09:00PM</p>
          <p className="footer-section-text2">Saturday: 09:00AM - 07:00PM</p>
          <p className="footer-section-text2">Sunday: Closed</p>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">SERVICE HOURS</h4>
          <p className="footer-section-text1">Monday - Friday: 09:00AM - 09:00PM</p>
          <p className="footer-section-text2">Saturday: 09:00AM - 07:00PM</p>
          <p className="footer-section-text2">Sunday: Closed</p>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">PARTS HOURS</h4>
          <p className="footer-section-text1">Monday - Friday: 09:00AM - 09:00PM</p>
          <p className="footer-section-text2">Saturday: 09:00AM - 07:00PM</p>
          <p className="footer-section-text2">Sunday: Closed</p>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2021. Laptops - WordPress Theme by StylemixThemes</p>
          <div className="footer-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;