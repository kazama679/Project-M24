// Pay.tsx
import React, { useEffect, useState } from 'react';
import '../../styles/Pay.scss';
import { getAllUser, updateUserCart } from '../../store/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, getAllOrder, updateOrder } from '../../store/reducers/orderReducer';
import { Navigate, useLocation } from 'react-router-dom';
import { getAllProduct, updateProduct } from '../../store/reducers/productReducer';

const Pay: React.FC = () => {
    const location = useLocation();
    const { note } = location.state || { note: '' };
    const data: any = useSelector(state => state);
    const [loggedInUser, setLoggedInUser] = useState<any>(null);
    const [mess1, setMess1] = useState<boolean>(false);
    const [mess2, setMess2] = useState<boolean>(false);
    const [mess3, setMess3] = useState<boolean>(false);
    const [mess4, setMess4] = useState<boolean>(false);
    const [mess5, setMess5] = useState<boolean>(false);
    const [mess6, setMess6] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0); // đảm bảo cuộn lên đầu trang
        dispatch(getAllUser());
        dispatch(getAllOrder());
        dispatch(getAllProduct());
        const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(user);
    }, [dispatch]);
    // format tiền
    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
    // lấy ra vị trí của user đăng nhập trong db.json
    const indexUser: number = data.userReducer.users.findIndex((user: any) => user.id === loggedInUser?.id); // ? là Optional chaining (thu hoạch an toàn)
    const [name, setName] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [phone, setPhone] = useState<any>('')

    // tính tổng tiền 
    const totalAll = () => {
        let totalPrice = 0;
        data.userReducer.users[indexUser]?.cart.forEach((item: any) => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice;
    }
    // phí ship 
    const [moneyShip, setMoneyShip] = useState<number>(0);
    const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'HaNoi') {
            setMoneyShip(30000);
        } else {
            setMoneyShip(50000);
        }
    }
    // phương thức thanh toán
    const [payTo, setpayTo] = useState<string>('');
    const handleAddressSelectPay = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'NhanHang') {
            setpayTo('NhanHang');
        } else {
            setpayTo('ChuyenKhoan');
        }
    }
    // format ngày
    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    // tạo ra id có cả số và chữ
    function generateRandomString(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';
        for (let i = 0; i < length; i++) {
            if (i < 5) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            } else if (i === 5) {
                result += '-';
            } else {
                result += digits.charAt(Math.floor(Math.random() * digits.length));
            }
        }
        return result;
    }
    // thanh toán
    const handleSavePay = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMess1(false)
        setMess2(false)
        setMess3(false)
        setMess4(false)
        setMess5(false)

        let check: boolean = true;
        if (name === '') {
            setMess3(true)
            setTimeout(() => {
                setMess3(false)
            }, 3000);
            check = false
        }
        if (phone === ``) {
            setMess4(true)
            setTimeout(() => {
                setMess4(false)
            }, 3000)
            check = false
        }
        if (address === '') {
            setMess5(true)
            setTimeout(() => {
                setMess5(false)
            }, 3000)
            check = false
        }
        if (moneyShip === 0) {
            setMess2(true)
            setTimeout(() => {
                setMess2(false)
            }, 3000)
            check = false
        }
        if (payTo === '') {
            setMess1(true)
            setTimeout(() => {
                setMess1(false)
            }, 3000)
            check = false
        }
        if (check) {
            const newOrder = {
                id: generateRandomString(10),
                name: name,
                status: 'choDuyet',
                phone: phone,
                address: address,
                created_at: formattedDate,
                updated_at: formattedDate,
                cart: data.userReducer.users[indexUser]?.cart,
                note: note,
                ship: moneyShip,
                payTo: payTo
            };
            dispatch(addOrder(newOrder));
            setMess6(true)
            setTimeout(() => {
                setMess6(false)
                const updatedUser = { ...data.userReducer.users[indexUser], cart: [] };
                dispatch(updateUserCart(updatedUser));
                window.location.href = 'http://localhost:5173/Home'
                // tiến hành đi giảm số lượng product khi đặt hàng thành công
                data.userReducer.users[indexUser]?.cart.forEach((item: any) => {
                    const updatedProduct = {
                        ...item,
                        stock: item.stock - item.quantity
                    };
                    dispatch(updateProduct(updatedProduct));
                });
            }, 2000)
        }
    }
    console.log(77777, data.productReducer.products);

    return (
        <div className="shipping-form">
            <div className="shipping-form-child">
                <h1>Thanh toán</h1>
                <h3>Thông tin giao hàng</h3>
                <form>
                    <input
                        type="text"
                        value={name}
                        placeholder="Họ và tên"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value)
                        }}
                    />
                    {mess3 ? <div className="shipping-form-child-address">Vui lòng nhập tên người nhận hàng!</div> : <></>}
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPhone(e.target.value)
                    }} type="tel" value={phone} placeholder="Số điện thoại" />
                    {mess4 ? <div className="shipping-form-child-address">Vui lòng nhập số điện thoại người nhận hàng!</div> : <></>}
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAddress(e.target.value)
                    }} type="text" value={address} placeholder="Địa chỉ" />
                    {mess5 ? <div className="shipping-form-child-address">Vui lòng nhập địa chỉ nhận hàng!</div> : <></>}
                    <select onChange={handleAddressSelect}>
                        <option>Chọn tỉnh / thành</option>
                        <option value={'HaNoi'}>Hà Nội</option>
                        <option value={'unHaNoi'}>Ngoại thành</option>
                    </select>
                    {mess2 ? <div className="shipping-form-child-address">Vui lòng chọn địa chỉ!</div> : <></>}
                    <select onChange={handleAddressSelectPay}>
                        <option>Chọn phương thức thanh toán</option>
                        <option value={'NhanHang'}>Thanh toán khi nhận hàng</option>
                        <option value={'ChuyenKhoan'}>Thanh toán qua ngân hàng</option>
                    </select>
                    {mess1 ? <div className="shipping-form-child-address">Vui lòng chọn phương thức thanh toán!</div> : <></>}
                    <button onClick={handleSavePay} type="submit">Thanh toán</button>
                    {/* thông báo thêm sản phẩm thành công */}
                    <div style={{ display: `${mess6 ? 'block' : 'none'}` }} className='notification'>
                        <div className='notification-icon'>✔</div>
                        <div className='notification-message'>Đã đặt hàng thành công</div>
                    </div>
                </form>
            </div>
            <div className='shipping-form-2'>
                <div className="cart-summary">
                    {data.userReducer.users[indexUser]?.cart.map((item: any) => {
                        return (<div className="item" key={item.id}>
                            <img src={item.image} alt="Inter Miami away 23-24 bản player full bộ" />
                            <div className="item-div">{item.quantity}</div>
                            <span className="item-span1">{item.name}</span>
                            <span className="item-span2">{formatVND(item.price * item.quantity)}</span>
                        </div>)
                    })}
                    <div className="down">
                        <input className="cart-summary-input" type="text" placeholder="Mã giảm giá" />
                        <button>Sử dụng</button>
                    </div>
                    <div className="total">
                        <span>Tạm tính</span>
                        <span>{formatVND(totalAll())}</span>
                    </div>
                    <div className="shipping-fee">
                        <span>Phí vận chuyển</span>
                        <span>{formatVND(moneyShip)}</span>
                    </div>
                    <div className="grand-total">
                        <b>Tổng cộng</b>
                        <span className="grand-total-all">{formatVND(totalAll() + moneyShip)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pay;
