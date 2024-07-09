import React, { useEffect } from 'react';
import '../../styles/Home.scss';

export default function Home() {
  useEffect(() => {
    // Khởi tạo carousel với tùy chọn tự động chuyển ảnh
    const carouselElement = document.querySelector('#carouselExampleFade');
    if (carouselElement) {
      const carousel = new window.bootstrap.Carousel(carouselElement, {
        interval: 5000, // Tự động chuyển ảnh sau 5 giây
        ride: 'carousel'
      });
    }
  }, []);

  return (
    <>
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://vinfastnewway.com.vn/wp-content/uploads/2022/08/vinfast-vf-8-mau-xam.jpg" className="d-block w-100" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img src="https://i1-vnexpress.vnecdn.net/2023/01/10/Vinfast-VF8-VnExpress-22-JPG.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=6kPyA09fP15vRKcZ-DMGQA&t=image" className="d-block w-100" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img src="https://hips.hearstapps.com/hmg-prod/images/2023-vinfast-vf8-9305-64638baaa41e3.jpg?crop=0.701xw:0.642xh;0.144xw,0.306xh&resize=980:*" className="d-block w-100" alt="Third slide" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}