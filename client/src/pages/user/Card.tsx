import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaFacebook, FaGoogle, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaShippingFast, FaTwitch, FaYoutube } from 'react-icons/fa';
import { MdMailOutline, MdOutlinePhoneForwarded, MdOutlineWorkHistory } from 'react-icons/md';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { GiReturnArrow } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, updateUserCart } from '../../store/reducers/userReducer';
import { updateUserCartAPI } from '../../services/user.service';

const Card: React.FC = () => {
  const data: any = useSelector(state => state);
  const dispatch = useDispatch();
  const [mess, setMess] = useState<boolean>(false);

  const location = useLocation();
  const product = location.state?.product;
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const navigate = useNavigate();

  const handleMail = () => {
    window.location.href = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new'
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    dispatch(getAllUser());
    setLoggedInUser(user);
  }, [dispatch]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  // lấy ra vị trí của user đăng nhập trong db.json
  const indexUser: number = data.userReducer.users.findIndex((user: any) => user.id === loggedInUser?.id); // ? là Optional chaining (thu hoạch an toàn)

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  const nextToCart = () => {
    navigate('/Cart');
  }

  const nextToHome = () => {
    navigate('/Home');
  }

  const logOut = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm.</div>;
  }
  // tài khoản của tôi
  const myAccount = () => {

  }
  // đơn mua
  const myPay = () => {

  }

  // cập nhập trạng thái user
  const addToCart = (user: any, product: any, number: number) => {
    // Tìm sản phẩm trong giỏ hàng của người dùng
    const existingCartItem = user.cart.find((item: any) => item.id === product.id);
    console.log(1233333, existingCartItem, product.id, user.cart);
    let newCart;
    // Nếu sản phẩm đã có trong giỏ hàng
    if (existingCartItem) {
      // Tạo một mảng giỏ hàng mới, với số lượng sản phẩm được cộng thêm
      newCart = user.cart.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + number }
          : item
      );
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
      newCart = [...user.cart, { ...product, quantity: number }];
    }
    // Tạo một đối tượng người dùng mới với giỏ hàng đã được cập nhật
    const newUserCartItem = { ...user, cart: newCart };
    dispatch(updateUserCart(newUserCartItem));
    setMess(true);
    setTimeout(()=>{
      setMess(false);
    },2000)
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

      <div className='allBanner-header3'>
        <div className='allBanner-header2-text'>Laptops</div>
        <div className='allBanner-header2-top'>
          <div onClick={nextToHome}>TRANG CHỦ</div>
          <div>DANH MỤC</div>
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

      {/* Card */}
      <div className="product-card-all">
        <div className="product-card">
          <div className="product-image">
            <img src={product.image} alt="Laptop Lenovo Thinkpad" />
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <div className="rating">
              <span>5</span>
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className="star">★</span>
                ))}
              </div>
              <span>chính hãng</span>
            </div>
            <div className="price">
              <span className='returnProduct'>chính sách trả hành: <GiReturnArrow className='return' />Đổi trả 15 ngày</span>
            </div>
            <div className="price">
              <span className="price-text">Giá sản phẩm:</span>
              <span className="price-text new-price">{formatVND(product.price)}</span>
            </div>
            <div className="shipping">
              <div className="shipping-content"><b>Chi tiết sản phẩm:</b> {product.description}</div>
            </div>
            <div className="shipping">
              <span className="shipping-text"><FaShippingFast /> Miễn phí vận chuyển</span>
              <div>Vận Chuyển Tới: <b></b></div>
            </div>
            <div className="quantity">
              <label>Số Lượng</label>
              <div className="quantity-controls">
                <button onClick={handleDecrease} className="decrease">-</button>
                <input type="text" value={quantity} onChange={handleQuantityChange} />
                <button onClick={handleIncrease} className="increase">+</button>
              </div>
            </div>
            <div className="shipping">
              <div className="shipping-text-div"><MdOutlinePhoneForwarded className="shipping-text-div-icon" /> Hỗ trợ, tư vấn ngay qua <a className='shipping-text-a' href="https://www.facebook.com/?locale=en_EL">messenger FB</a> hoặc qua Zalo 0349199812</div>
            </div>
            <div className="pay">
              <button onClick={() => addToCart(data.userReducer.users[indexUser], product, quantity)} className="add-to-cart"><FaCartPlus />Thêm Vào Giỏ Hàng</button>
              <button className="buy-now">Mua Ngay</button>
            </div>
          </div>
        </div>
        {/* thông báo thêm sản phẩm thành công */}
        <div style={{display:`${mess ? 'block' : 'none'}`}} className='notification'>
          <div className='notification-icon'>✔</div>
          <div className='notification-message'>Thêm vào giỏ hàng thành công</div>
        </div>
      </div>
      {/* end Card */}
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

export default Card;