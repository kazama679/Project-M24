import React, { useState } from 'react';
import '../../styles/Home.scss';
import image1 from '../../images/1704734860930.jpg'
import image2 from '../../images/hinh-nen-may-tinh-4k-1.jpg'
import image3 from '../../images/Đen và Xanh mòng két Minh họa Thể thao Điện tử Game Logo (1).png'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext, MdOutlineWorkHistory } from 'react-icons/md';
import { FaFacebook, FaGoogle, FaIndustry, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaRedo, FaSearch, FaTwitch } from 'react-icons/fa';
import { RiShoppingCart2Fill } from 'react-icons/ri';

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const cars = [
    {
        id: 1,
        name: "MERCEDES-BENZ GT 600",
        price: "$223 000",
        year: 2022,
        fuel: "20/100",
        transmission: "Automatic",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo6DEp2UiiEi7yHvQwcheTA8Pn_1dlriYBZQ&s"
    },
    {
        id: 2,
        name: "ACURA ILX 2021",
        price: "$21 000",
        year: 2021,
        fuel: "18/100",
        transmission: "Automatic",
        image: "data:image/jpeg;base64,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"
    },
    {
        id: 3,
        name: "CHEVROLET TRAILBLAZER 2021",
        price: "$23 000",
        year: 2021,
        fuel: "18/100",
        transmission: "Automatic",
        image: "https://vinfastquangninh.com.vn/wp-content/uploads/2022/05/e03d03426c1ea740fe0f-min.jpg"
    }
];

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
            {/* Add more options here */}
          </select>
          <select className="search-inventory-select">
            <option>Chọn loại</option>
            {/* Add more options here */}
          </select>
          <select className="search-inventory-select">
            <option>Chọn giá</option>
            {/* Add more options here */}
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
            {cars.map(car => (
                <div key={car.id} className="car-card">
                    <img src={car.image} className="car-image" />
                    <div className="car-details">
                        <h2 className="car-name">{car.name}</h2>
                        <button className="buy-online">BUY ONLINE</button>
                        <div className="car-price">{car.price}</div>
                        <div className="car-info">
                            <span className="car-year">{car.year}</span>
                            <span className="car-fuel">{car.fuel}</span>
                            <span className="car-transmission">{car.transmission}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>


        <div className="footer-container">
            <div className="footer-section">
                <h4 className="footer-title">MOTORS <span className="highlight">WORDPRESS THEME</span></h4>
                <p>Fusce interdum ipsum egestas urna amet fringilla, et placerat ex venenatis. Aliquet luctus pharetra. Proin sed fringilla lectus...</p>
            </div>
            <div className="footer-section">
                <h4 className="footer-title">PHOTO GALLERY</h4>
                <div className="photo-gallery">
                    <img src="/path-to-image/photo1.jpg" alt="Photo 1" className="gallery-img" />
                    <img src="/path-to-image/photo2.jpg" alt="Photo 2" className="gallery-img" />
                    <img src="/path-to-image/photo3.jpg" alt="Photo 3" className="gallery-img" />
                </div>
            </div>
            <div className="footer-section">
                <h4 className="footer-title">LATEST BLOG POSTS</h4>
                <p>Cras condimentum a elit eget sagittis. Ut dignissim sapien feugiat purus tristique, vitae...</p>
            </div>
            <div className="footer-section">
                <h4 className="footer-title">SOCIAL NETWORK</h4>
                <div className="social-icons">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-google"></i>
                    <i className="fab fa-youtube"></i>
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
                <p>Monday - Friday: 09:00AM - 09:00PM</p>
                <p>Saturday: 09:00AM - 07:00PM</p>
                <p>Sunday: Closed</p>
            </div>
            <div className="footer-section">
                <h4 className="footer-title">SERVICE HOURS</h4>
                <p>Monday - Friday: 09:00AM - 09:00PM</p>
                <p>Saturday: 09:00AM - 07:00PM</p>
                <p>Sunday: Closed</p>
            </div>
            <div className="footer-section">
                <h4 className="footer-title">PARTS HOURS</h4>
                <p>Monday - Friday: 09:00AM - 09:00PM</p>
                <p>Saturday: 09:00AM - 07:00PM</p>
                <p>Sunday: Closed</p>
            </div>
            <div className="footer-bottom">
                <p>Copyright © 2021. Motors - WordPress Theme by StylemixThemes</p>
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