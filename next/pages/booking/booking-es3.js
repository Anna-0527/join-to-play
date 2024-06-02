import React, { useState, useEffect } from "react";
import Head from "next/head";
import BookingLayout from "@/components/layout/booking-layout/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyCalendar from "@/components/booking/calendar";
import BookingForm from "@/components/booking/bookingForm";
import {
  GAMEFORES3,
  STORE_ESCAPEFORES3,
  BOOKING_ESCAPE,
} from "@/components/config";
import { useRouter } from "next/router";

const exclamationMark = {
  position: "absolute",
};

export default function BookingEs3() {
  const [formData, setFormData] = useState({
    booking_date: null, // 新增 booking_date 欄位
    booking_time: null, // 新增 booking_time 欄位
  });

  const router = useRouter();

  const [gameData, setGameData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
  });

  const [storeEscapeData, setStoreEscapeData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
  });

  const [bookingData, setBookingData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
  });

  const [showBookingForm, setShowBookingForm] = useState(false); // 控制 BookingForm 的顯示狀態

  const [storeId, setStoreId] = useState();
  const [gameId, setGameId] = useState();
  const [Data, setData] = useState();

  useEffect(() => {
    // game table的數據
    fetch(GAMEFORES3 + location.search)
      .then((response) => response.json())
      .then((data) => {
        setGameData(data);
        setGameId(data.rows[0].sid);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });

    // booking_escape table 的數據
    fetch(BOOKING_ESCAPE + location.search)
      .then((response) => response.json())
      .then((data) => {
        setBookingData(data);
      })
      .catch((error) => {
        console.error("Error fetching booking_escape data:", error);
      });
  }, [router.query]);

  // 從game store_id找到對應的store_escape的sid的資料
  useEffect(() => {
    fetch(GAMEFORES3 + location.search)
      .then((response) => response.json())
      .then((data) => {
        setGameData(data);
        // 從game表數據中獲取 store_id
        const storeId = data.rows.length > 0 ? data.rows[0].store_id : null;
        if (storeId) {
          // 根據 store_id 獲取對應的 store_escape 表數據
          fetch(`${STORE_ESCAPEFORES3}?store_id=${storeId}`)
            .then((response) => response.json())
            .then((storeEscapeData) => {
              setStoreEscapeData(storeEscapeData);
              setStoreId(storeId);
            })
            .catch((error) => {
              console.error("Error fetching store_escape data:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
  }, [router.query]);

  // 接收從es2點進來，可以吃到game的sid
  useEffect(() => {
    // Extract sid from router query
    if (router.isReady && router.query.sid) {
      const sid = router.query.sid;
      fetch(`${GAMEFORES3}?sid=${sid}`)
        .then((r) => r.json())
        .then((dataObj) => {
          setData(dataObj);
        })
        .catch((error) => {
          console.error("Error fetching game data:", error);
        });
    }
  }, [router.query.sid, router.isReady]);

  console.log(storeId);
  console.log(gameId);

  return (
    <>
      <Head>
        <title>遊戲詳情</title>
      </Head>

      {!gameData.success && storeEscapeData.success && bookingData.success ? (
        <div>loading ...</div>
      ) : (
        <div>
          {gameData.success &&
            gameData.rows.map((v) => (
              <>
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-bs-ride="carousel"
                  key={v.sid}
                >
                  <div className="carousel-inner bookingES3Banner">
                    <div className="carousel-item active bookingES3Banner-item">
                      <img
                        src={`/images/booking/${v.game_pic}.jpg`}
                        className="gameCarousel"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item bookingES3Banner-item">
                      <img
                        src="/images/booking/game7.jpg"
                        className="gameCarousel"
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
                <div className="gameDetail">
                  {/* 第一區 遊戲介紹 */}
                  <div className="gameInfo">
                    {/* 介紹左邊 */}
                    <div className="gameInfoImgDiv">
                      <p className="gameInfoImgText1 mx-auto">
                        闖入神秘空間···
                      </p>
                      <p className="gameInfoImgText2 mx-auto">
                        密室逃脫等你挑戰<span style={exclamationMark}>！</span>
                      </p>
                      <img
                        src="/images/booking/gameInfoImg.png"
                        className="gameInfoImg"
                      />
                    </div>
                    {/* 介紹右邊 */}
                    <div className="gameInfoTextDiv">
                      <h5 className="gameInfoTextTitle">{v.game_name}</h5>
                      <p className="gameInfoTextSubtitle">
                        ——— <strong>故事介紹</strong> ———
                      </p>
                      <p className="gameInfoTextContent">{v.game_info}</p>
                      <div className="gameSOP">
                        <div className="gameSOP1">
                          {/* <FontAwesomeIcon
                            icon="fa-solid fa-users"
                            className="gameIcon"
                          /> */}
                          <i class="bi bi-people-fill gameIcon" />
                          <h6 className="gameSOPIconName">遊戲人數</h6>
                          <p className="gameSOPIconText">{v.player_count}</p>
                        </div>
                        <div className="gameSOP2">
                          {/* <FontAwesomeIcon
                            icon="fa-solid fa-hourglass-start"
                            className="gameIcon"
                            width={"55px"}
                          /> */}
                          <i class="bi bi-alarm-fill gameIcon" />
                          <h6 className="gameSOPIconName">遊戲時間</h6>
                          <p className="gameSOPIconText">{v.time}</p>
                        </div>
                        <div className="gameSOP3">
                          {/* <FontAwesomeIcon
                            icon="fa-solid fa-flag-checkered"
                            className="gameIcon"
                            width={"55px"}
                          /> */}
                          {/* <i className="bi bi-flag-fill gameIcon" /> */}
                          <i class="bi bi-skip-start-fill gameIcon" />
                          <h6 className="gameSOPIconName">遊玩前講解</h6>
                          <p className="gameSOPIconText">{v.explainST_time}</p>
                        </div>
                        <div className="gameSOP4">
                          {/* <FontAwesomeIcon
                            icon="fa-solid fa-person-through-window"
                            className="gameIcon"
                            width={"55px"}
                          /> */}
                          <i class="bi bi-skip-end-fill gameIcon" />
                          <h6 className="gameSOPIconName">遊玩後講解</h6>
                          <p className="gameSOPIconText">{v.explainEND_time}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 第二區 Type And Player*/}
                  <div className="typeAndPlayer d-flex">
                    <div className="gameType">
                      <img
                        className="gameTypeImg"
                        src="/images/booking/game4.jpg"
                      />
                      <h6 className="typeTitle">主題類型</h6>
                      <p className="typeContent">
                        {v.type_content.split("\n").map((item, index) => (
                          <p key={index} className="typeContent">
                            {item}
                          </p>
                        ))}
                      </p>
                    </div>
                    <div className="player">
                      <img
                        className="playerImg"
                        src="/images/booking/game5.jpg"
                      />
                      <h6 className="playerTitle">適合對象</h6>
                      <p className="playerContent">
                        {v.player_content.split("\n").map((item, index) => (
                          <p key={index} className="typeContent">
                            {item}
                          </p>
                        ))}
                      </p>
                    </div>
                  </div>
                  {/* <div className="gameReview">
                    <h6 className="reviewTitle">玩家評價</h6>
                    <div className="reviewDiv">
                      <img
                        className="profilePic"
                        src="/images/booking/storelogo.png"
                        alt="profilePic"
                      />
                      <div>玩家姓名</div>
                      <div>
                        <i className="bi bi-star-fill star" />
                        <i className="bi bi-star-half star" />
                        <span>評論時間要做嗎</span>
                      </div>
                      <div>評論內容</div>
                      <div>遊玩日期</div>
                      <div className="reviewEditIcon">
                        <FontAwesomeIcon
                          icon="fa-solid fa-ellipsis"
                          size="xl"
                        />
                      </div>
                    </div>
                  </div> */}

                  {/* 第三區 預約事項 */}
                  <div className="bookingDiv">
                    {/* 左邊 */}
                    <div className="priceNoticeDiv">
                      {storeEscapeData.success &&
                        storeEscapeData.rows.map((v) => (
                          <>
                            <div className="nameAndAddress">
                              <div className="bookingStoreName" key={v.sid}>
                                {v.store_name}
                              </div>
                              <div className="bookingStoreAddress">
                                {v.store_address}
                              </div>
                            </div>
                          </>
                        ))}
                      <div className="gamePrice">
                        <img
                          className="WeekdaysImg"
                          src="/images/booking/WeekdaysICON.png"
                          alt="WeekdaysImg"
                        />
                        <p className="WeekdaysP">${v.weekdays_price}/人</p>
                        <img
                          className="HolidayImg"
                          src="/images/booking/HolidayICON.png"
                          alt="HolidayImg"
                        />
                        <p className="HolidayP">${v.holiday_price}/人</p>
                      </div>
                      <div className="gameNoticeDiv">
                        <div className="gameNotice">
                          <FontAwesomeIcon
                            icon="fa-solid fa-triangle-exclamation"
                            className="noticeIcon"
                            width={"25px"}
                          />
                          預約注意事項
                        </div>
                        <p className="gameNoticeP">
                          {" "}
                          {v.notice.split("，").map((item, index) => (
                            <div key={index}>
                              <span className="gameNoticeP">{item}</span>
                              {index !== v.notice.split("，").length - 1 && (
                                <hr className="dashedLine" />
                              )}
                            </div>
                          ))}
                        </p>
                      </div>
                    </div>
                    {/* 右邊 */}
                    <div className="bookingCalendarDiv1">
                      <MyCalendar
                        onNextStep={() => setShowBookingForm(true)}
                        setFormData={setFormData}
                      />{" "}
                      {/* 在這傳遞一個 onNextStep 函數作為 props */}
                      {showBookingForm &&
                        storeEscapeData.success &&
                        storeEscapeData.rows.map((v) => (
                          <>
                            <div className="testBookingForm">
                              <div className="bookingForm">
                                <BookingForm
                                  bookingDate={formData.booking_date} // 將 booking_date 傳遞給 BookingForm
                                  bookingTime={formData.booking_time}
                                  storeName={v.store_name}
                                  gameName={gameData.rows[0].game_name}
                                  storeId={storeId}
                                  gameId={gameId}
                                />
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      )}
    </>
  );
}

BookingEs3.getLayout = function (page) {
  return <BookingLayout>{page}</BookingLayout>;
};
