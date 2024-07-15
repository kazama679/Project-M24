import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { getAllUser } from '../../store/reducers/userReducer';

const Home: React.FC = () => {

  const data: any = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [statusBorder, setStatusBorder] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllUser());
    dispatch(getAllCategory());
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    window.scrollTo(0, 0); // đảm bảo cuộn lên đầu trang
    setLoggedInUser(user);
  }, []);

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
  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  //chuyển đến giỏ hàng
  const nextToCart = () => {
    navigate('/Cart');
  }
  //chuyển đến trang chủ
  const nextToHome = () => {
    navigate('/Home');
  }
  // bắn dữ liệu để hiển thị product
  const handleShowProduct = (product: any) => {
    navigate(`/Card`, { state: { product } });
  }
  // đăng xuất user
  const logOut = () => {
    localStorage.removeItem('loggedInUser'); // Xóa Local
    navigate('/');
  }
  if (loggedInUser === '' || loggedInUser === null) {
    navigate('/');
  }
  // tài khoản của tôi
  const myAccount = () => {

  }
  // đơn mua
  const myPay = () => {

  }
  // lấy ra vị trí của user đăng nhập trong db.json
  const indexUser: number = data.userReducer.users.findIndex((user: any) => user.id === loggedInUser?.id); // ? là Optional chaining (thu hoạch an toàn)
  // tìm kiếm theo tên sản phẩm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }
  // chọn năm sản phẩm
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  }
  // chọn loại sản phẩm
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  }
  // chọn khoảng giá sản phẩm
  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrice(e.target.value);
  }
  // Lọc danh sách sản phẩm dựa trên từ khóa tìm kiếm, năm, loại và khoảng giá được chọn
  const filteredProducts = data.productReducer.products.filter((product: any) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear ? product.created_at.slice(-4) === selectedYear : true;
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = selectedPrice ?
      (selectedPrice === 'duoi10' ? product.price < 10000000 :
        selectedPrice === '10-20' ? product.price >= 10000000 && product.price <= 20000000 :
          selectedPrice === 'tren20' ? product.price > 20000000 : true) : true;
    return matchesSearch && matchesYear && matchesCategory && matchesPrice;
  });
  // reset lại lọc
  const handleReset = () => {
    setSearchTerm('');
    setSelectedYear('');
    setSelectedCategory('');
    setSelectedPrice('');
    const selects = document.querySelectorAll('.search-inventory-select');
    selects.forEach(select => {
      select.value = '';
    });
    const inputs = document.querySelectorAll('.search-inventory-input');
    inputs.forEach(input => {
      input.value = '';
    });
  };
  // di chuyển đến danh mục
  const nextToCategory=()=>{
    window.scrollTo(0, 450);
    setStatusBorder(true)
    setTimeout(() => {
      setStatusBorder(false)
    }, 1000);
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
        <div className="dropdownContainer">
          <div className="dropdownMenu">
            <img className="dropdownMenu-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="" />
            <div className="dropdownMenu-name">{loggedInUser ? loggedInUser.name : 'Chưa đăng nhập'}</div>
          </div>
          <div className="hover-content">
            <p onClick={myAccount}>Tài khoản của tôi</p>
            <p onClick={myPay}>Đơn mua</p>
            <p onClick={logOut}>Đăng xuất</p>
          </div>
        </div>
      </div>

      <div className='allBanner-header2'>
        <div className='allBanner-header2-text'>Laptops</div>
        <div className='allBanner-header2-top'>
          <div onClick={nextToHome}>TRANG CHỦ</div>
          <div  onClick={nextToCategory}>DANH MỤC</div>
          <div>DỊCH VỤ CỦA CHÚNG TÔI</div>
          <div>BLOG</div>
          <div>MEGA MENU</div>
          <div>CỬA HÀNG</div>
          <div>TRANG</div>
        </div>
        <div onClick={nextToCart} className='allBanner-header2-cart'>
          <div className='allBanner-header2-cart-number'>{data.userReducer.users[indexUser]?.cart?.length}</div>
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
          <input
            onChange={handleSearch}
            value={searchTerm}
            className="search-inventory-search search-inventory-input"
            type="text"
            placeholder='Tìm kiếm Laptop'
          /></div>
        <div className="search-inventory-controls">
          <select onChange={handleYearChange} className="search-inventory-select">
            <option value="">Chọn năm</option>
            <option value="2024">Năm 2024</option>
            <option value="2023">Năm 2023</option>
            <option value="2022">Năm 2022</option>
            <option value="2021">Năm 2021</option>
          </select>
          <select onChange={handleCategoryChange} className="search-inventory-select" style={{ border: statusBorder ? '4px solid yellow' : 'none' }}>
            <option value="">Chọn loại</option>
            {data.categoryReducer.classify.map((item: any) => (
              <option value={item.name} key={item.id}>{item.name}</option>
            ))}
          </select>
          <select onChange={handlePriceChange} className="search-inventory-select">
            <option value="">Chọn giá</option>
            <option value="duoi10">Dưới 10 triệu</option>
            <option value="10-20">10 triệu - 20 triệu</option>
            <option value="tren20">Trên 20 triệu</option>
          </select>
          <button className="search-inventory-button search-button">
            <FaSearch />
            Tìm Kiếm
          </button>
          <button onClick={handleReset} className="search-inventory-button reset-button">
            <FaRedo />
          </button>
        </div>
      </div>
      {filteredProducts.length === 0 ? (<div className="recent-cars">
        <h1 className="title">
          <span className="highlight">Không tìm thấy sản phẩm</span>
        </h1>
        <p className="subtitle">
          Vui lòng tìm kiếm sản phẩm khác!
        </p>
      </div>) : (<div className="recent-cars">
        <h1 className="title">
          RECENT <span className="highlight">Laptop</span>
        </h1>
        <p className="subtitle">
          Curabitur tellus leo, euismod sit amet gravida at, egestas sed commodo.
        </p>
      </div>)}
      {/* hiển thị danh sách sản phẩm */}
      <div className="car-list">
        {filteredProducts.map(item => (
          <div key={item.id} className="car-card">
            <img src={item.image} className="car-image" />
            <div className="car-details">
              <h2 className="car-name">{item.name}</h2>
              <div className="car-details-buy">
                <button onClick={() => handleShowProduct(item)} className="buy-online">Xem sản phẩm</button>
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
      {/* end-hiển thị danh sách sản phẩm */}
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