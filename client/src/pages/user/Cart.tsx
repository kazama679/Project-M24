import React, { useEffect, useState } from 'react';
import '../../styles/Card.scss';
import '../../styles/Cart.scss';
import { FaCartPlus, FaFacebook, FaGoogle, FaInfoCircle, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaShippingFast, FaTwitch, FaYoutube } from 'react-icons/fa';
import { MdAssignmentReturn, MdMailOutline, MdOutlineWorkHistory } from 'react-icons/md';
import { RiDeleteBin6Line, RiShoppingCart2Fill } from 'react-icons/ri';
import { GiReturnArrow } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../store/reducers/productReducer';
import { getAllUser, updateUserCart } from '../../store/reducers/userReducer';

const Cart: React.FC = () => {
    const data: any = useSelector(state => state);
    const [loggedInUser, setLoggedInUser] = useState<any>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProduct());
        dispatch(getAllUser());
        const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(user);
    }, [dispatch]);
    // bấm vào feedback 
    const handleMail = () => {
        window.location.href = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new'
    }
    // format tiền
    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
    //chuyển đến trang chủ
    const nextToHome = () => {
        window.location.href = 'http://localhost:5173/Home'
    }
    // tài khoản của tôi
    const myAccount = () => {

    }
    // đơn mua
    const myPay = () => {

    }
    const logOut = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/');
    }
    // lấy ra vị trí của user đăng nhập trong db.json
    const indexUser: number = data.userReducer.users.findIndex((user: any) => user.id === loggedInUser?.id); // ? là Optional chaining (thu hoạch an toàn)
    // cập nhập quantity
    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            return;
        }
        const updatedCart = data.userReducer.users[indexUser]?.cart.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        const updatedUser = { ...data.userReducer.users[indexUser], cart: updatedCart };
        dispatch(updateUserCart(updatedUser));
    }
    // tính tổng tiền 
    const totalAll = () => {
        let totalPrice = 0;
        data.userReducer.users[indexUser]?.cart.forEach((item:any) => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice;
    }
    // xóa sản phẩm trong cart
    const deleteCart = (itemId: number) => {
        const updatedCart = data.userReducer.users[indexUser]?.cart.filter((item: any) => item.id !== itemId);
        const updatedUser = { ...data.userReducer.users[indexUser], cart: updatedCart };
        dispatch(updateUserCart(updatedUser));
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
                <div className='allBanner-header2-cart'>
                    <div className='allBanner-header2-cart-number'>{data.userReducer.users[indexUser]?.cart?.length}</div>
                    <RiShoppingCart2Fill />
                </div>
            </div>

            {/* Cart */}
            <div className="shopping-cart">
                <div className="shopping-cart__header">
                    <h2 className="shopping-cart__header-h2">Giỏ hàng của bạn</h2>
                </div>
                <div className="shopping-cart-child">
                    {data.userReducer.users[indexUser]?.cart?.length !== 0 ? (<div className="shopping-cart__items">
                        <div className="shopping-cart__items-p">Bạn đang có <b>{data.userReducer.users[indexUser]?.cart?.length} sản phẩm</b> trong giỏ hàng</div>
                        <div>
                            {data.userReducer.users[indexUser]?.cart?.map((item) => {
                                return (<div className="item">
                                    <div className="item-card">
                                        <img className='shopping-cart__item-img' src={item.image} alt="T1 hoodie 2023" />
                                        <div className="shopping-cart__details">
                                            <b className="shopping-cart__name">{item.name}</b>
                                            <div className="counter">
                                                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                                <input
                                                    type="text"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                />
                                                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <b>{formatVND(item.price)}</b>
                                        </div>
                                    </div>
                                    <div>
                                        <div onClick={()=>deleteCart(item.id)}><RiDeleteBin6Line className='icon-delete' /></div>
                                    </div>
                                </div>)
                            })}
                            <div className="shopping-cart__price">
                                <b>Thành tiền:</b>
                                <b className="shopping-cart__price-number">{formatVND(totalAll())}</b>
                            </div>
                        </div>
                        <div className="shopping-cart__notes">
                            <textarea placeholder="Ghi chú đơn hàng"></textarea>
                        </div>
                    </div>) : (<div className="shopping-cart-zero">
                        Giỏ hàng của bạn đang trống
                    </div>)
                    }
                    <div className="shopping-cart__summary">
                        <b className='shopping-cart__summary-b'>Thông tin đơn hàng</b>
                        <div className="shopping-cart__summary__child">
                            <b className="shopping-cart__summary__child1">Tổng tiền: </b>
                            <div className="shopping-cart__summary__child2">{formatVND(totalAll())}</div>
                        </div>
                        <div className="shopping-cart__summary-t">Bạn có thể nhập mã giảm giá ở trang thanh toán</div>
                        <button className="shopping-cart__checkout">Thanh toán</button>
                    </div>
                </div>
            </div>
            <div className='shopping-cart-end'>
                <button onClick={nextToHome} className="shopping-cart__continue"><b>Tiếp tục mua hàng</b></button>
            </div>
            {/* end Cart */}

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

export default Cart;