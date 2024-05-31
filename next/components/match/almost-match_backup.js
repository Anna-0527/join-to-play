import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import Link from 'next/link'



// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'

// import required modules
import { FreeMode, Autoplay, Pagination } from 'swiper/modules'

export default function AlmostMatch() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        freeMode={true}
        breakpoints={{
          
         
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, FreeMode]}
        className="matchSwiper"
      >
        <SwiperSlide>
        
          <div className=" p-3">
            <div className="card almost-escape p-3">
              <div
                className="card-body"
                //TODO
                // data-bs-toggle="offcanvas"
                href="#"
                role="button"
                aria-controls="see-match-file"
              >
                <h5 className="card-title">絕地求生</h5>
                <h6 className="card-subtitle mb-2 text-muted">台北市中山區</h6>
                <p className="card-text">目前人數： 6 / 上限人數：7</p>
                <p className="card-text">查看更多</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-3">
            <div className="card almost-board p-3">
              <div
                className="card-body"
                // TODO
                // data-bs-toggle="offcanvas"
                href="#"
                role="button"
                aria-controls="see-match-file"
              >
                <h5 className="card-title">來玩桌遊</h5>
                <h6 className="card-subtitle mb-2 text-muted">台北市中山區</h6>
                <p className="card-text">目前人數： 6 / 上限人數：7</p>
                <p className="card-text">查看更多</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-3">
            <div className="card almost-escape p-3">
              <div
                className="card-body"
                // TODO
                // data-bs-toggle="offcanvas"
                href="#"
                role="button"
                aria-controls="see-match-file"
              >
                <h5 className="card-title">絕地求生</h5>
                <h6 className="card-subtitle mb-2 text-muted">台北市中山區</h6>
                <p className="card-text">目前人數： 6 / 上限人數：7</p>
                <p className="card-text">查看更多</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" p-3">
            <div className="card almost-board p-3">
              <div
                className="card-body"
                // TODO
                // data-bs-toggle="offcanvas"
                href="#"
                role="button"
                aria-controls="see-match-file"
              >
                <h5 className="card-title">來玩桌遊</h5>
                <h6 className="card-subtitle mb-2 text-muted">台北市中山區</h6>
                <p className="card-text">目前人數： 6 / 上限人數：7</p>
                <p className="card-text">查看更多</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" p-3">
            <div className="card almost-escape p-3">
              <div
                className="card-body"
                //TODO
                // data-bs-toggle="offcanvas"
                href="#"
                role="button"
                aria-controls="see-match-file"
              >
                <h5 className="card-title">絕地求生</h5>
                <h6 className="card-subtitle mb-2 text-muted">台北市中山區</h6>
                <p className="card-text">目前人數： 6 / 上限人數：7</p>
                <p className="card-text">查看更多</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" p-3">
            <div className="card almost-board p-3">
              <div
                className="card-body"
                // TODO
                // data-bs-toggle="offcanvas"
                href="#"
                role="button"
                aria-controls="see-match-file"
              >
                <h5 className="card-title">來玩桌遊</h5>
                <h6 className="card-subtitle mb-2 text-muted">台北市中山區</h6>
                <p className="card-text">目前人數： 6 / 上限人數：7</p>
                <p className="card-text">查看更多</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" p-3">
            <div className="card almost-escape p-3">
              <div
                className="card-body"
                //TODO
                // data-bs-toggle="offcanvas"
                href="#"
                role="button"
                aria-controls="see-match-file"
              >
                <h5 className="card-title">絕地求生</h5>
                <h6 className="card-subtitle mb-2 text-muted">台北市中山區</h6>
                <p className="card-text">目前人數： 6 / 上限人數：7</p>
                <p className="card-text">查看更多</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <style jsx>{`
        .almost-escape {
          background-image: url(/images/match/escape-card-bg.jpg);
          background-color: #c6fff8;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          border: none;
          box-shadow: 0px 2px 5px #00000046;
          opacity:0.8;
          transition: all 0.5s;
        }

        .almost-escape:hover {
          opacity:1;
          background: #91f3de80;
          box-shadow: none;
          color:#005544;
        }

        .almost-board {
          background-image: url(/images/match/board-card-bg.png);
          background-color: #c6fff8;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          border: none;
          box-shadow: 0px 2px 5px #00000046;
          transition: all 0.5s;
          opacity:0.8;
        }

        .almost-board:hover {
          opacity:1;
          background: #e47a45;
          color: rgba(255, 220, 182,0.8);
          box-shadow: none;
        }
      `}</style>
    </>
  )
}
