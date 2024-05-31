import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import Image from "next/image";

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {/* <div className="container">
        <div className="row">
          <div className="col"> */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image
              src={"/images/home/deskboard.jpg"}
              width={1920}
              height={1080}
              className="d-block w-100 h-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>新品到貨</h5>
              <p>全球最新熱門桌遊已上架，立即選購</p>
            </div>
          </div>
          <div className="carousel-item">
            <Image
              src={"/images/home/escape.jpg"}
              width={1300}
              height={1000}
              className="d-block w-100 h-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>密室逃脫</h5>
              <p>集合啦！想玩密室逃脫的朋朋們，一起出發囉！</p>
            </div>
          </div>

          <div className="carousel-item">
            <Image
              src={"/images/home/deskplay.jpg"}
              width={1920}
              height={1280}
              className="d-block w-100 h-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>桌遊媒合</h5>
              <p>一起與來自全台各地的好手同桌對決。</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* </div>
        </div>
      </div> */}
    </>
  );
}

export default HomeCarousel;

{
  /* <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <Image src={"/images/home/running.png"} width={1200} height={500} />
          <Carousel.Caption>
            <h3>密室逃脫</h3>
            <p>立即開始刺激緊張的冒險</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={"/images/home/deskplay.jpg"} width={1200} height={500} />
          <Carousel.Caption>
            <h3>桌遊商城</h3>
            <p>已上架本季最新商品，立即選購</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={"/images/home/boardgame.jpg"} width={1200} height={500} />
          <Carousel.Caption>
            <h3>桌遊歡聚</h3>
            <p>親友團聚想來場有趣活動嗎?</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */
}
