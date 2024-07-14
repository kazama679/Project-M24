// Pay.tsx
import React from 'react';
import '../../styles/Pay.scss';

const Pay: React.FC = () => {
    return (
        <div className="shipping-form">
            <div className="shipping-form-child">
                <h1>Thanh toán</h1>
                <h3>Thông tin giao hàng</h3>
                <form>
                    <input type="text" placeholder="Họ và tên" />
                    <input type="email" placeholder="Email" />
                    <input type="tel" placeholder="Số điện thoại" />
                    <input type="text" placeholder="Địa chỉ" />
                    <select>
                        <option>Chọn tỉnh / thành</option>
                        <option>Hà Nội</option>
                        <option>Ngoại thành</option>
                    </select>
                    <select>
                        <option>Chọn phương thức thanh toán</option>
                        <option>Thanh toán khi nhận hàng</option>
                        <option>Thanh toán qua ngân hàng</option>
                    </select>
                    <button type="submit">Thanh toán</button>
                </form>
            </div>
            <div className='shipping-form-2'>
                <div className="cart-summary">
                    <div className="item">
                        <img src="https://product.hstatic.net/200000580329/product/skaa7570_2dbd969863d8472794ddecaef54194b9_medium.jpg" alt="Inter Miami away 23-24 bản player full bộ" />
                        <span className="item-span1">T1 hoodie 2023</span>
                        <span className="item-span2">123123450,000₫</span>
                    </div>
                    <div className="item">
                        <img src="https://product.hstatic.net/200000580329/product/skaa7570_2dbd969863d8472794ddecaef54194b9_medium.jpg" alt="Inter Miami away 23-24 bản player full bộ" />
                        <span className="item-span1">T1 ho123333gsduyuty9u ayu9su9sodie 2023</span>
                        <span className="item-span2">123123450,000₫</span>
                    </div>
                    <div className="down">
                        <input className="cart-summary-input"  type="text" placeholder="Mã giảm giá" />
                        <button>Sử dụng</button>
                    </div>
                    <div className="total">
                        <span>Tạm tính</span>
                        <span>850,000₫</span>
                    </div>
                    <div className="shipping-fee">
                        <span>Phí vận chuyển</span>
                        <span>12312312</span>
                    </div>
                    <div className="grand-total">
                        <b>Tổng cộng</b>
                        <span className="grand-total-all">850,000₫</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pay;
