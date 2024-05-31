import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import MyFooter from "@/components/layout/default-layout/my-footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GAME } from "@/components/config";
import { useRouter } from "next/router";

export default function BookingEs2() {
  const router = useRouter();

  const [data, setData] = useState({
    sid: 0,
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
  });

  // 接收從es1點進來，可以吃到game的store_id
  useEffect(() => {
    // Extract sid from router query
    if (router.isReady && router.query.sid) {
      const sid = router.query.sid;
      fetch(`${GAME}?store_id=${sid}`)
        .then((r) => r.json())
        .then((dataObj) => {
          setData(dataObj);
        })
        .catch((error) => {
          console.error("Error fetching game data:", error);
        });
    }
  }, [router.query.sid, router.isReady]);

  // useEffect(() => {
  //   fetch(GAME)
  //     .then((r) => r.json())
  //     .then((dataObj) => {
  //       setData(dataObj);
  //     });
  // }, []);

  return (
    <>
      <Head>
        <title>遊戲選擇</title>
      </Head>

      <div className="container">
        <h2 className="text-center fw-bold gameTitle mb-5">遊戲選擇</h2>
        <div>
          {data.rows.map((v, index) => (
            <div key={v.sid}>
              {/* game1 */}
              {(index + 1) % 2 !== 0 && (
                <div className="row gameSelect">
                  <div className="col-md-6 gameImgDiv">
                    <img
                      className="gameImg"
                      src={`/images/booking/${v.game_pic}.jpg`}
                    />
                  </div>
                  <div className="col-md-6 gameText text-center">
                    <h4 className="fw-bold mb-1">《{v.game_name}》</h4>
                    <p className="text-muted fw-bold gameName mb-3">
                      {v.game_nameEG}
                    </p>
                    <p>
                      遊戲難度：
                      {[...Array(v.difficulty)].map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={["fas", "star"]}
                          className="ms-1 mb-1"
                          style={{ maxHeight: "14px" }}
                        />
                      ))}
                      {[...Array(5 - v.difficulty)].map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={["far", "star"]}
                          className="ms-1 mb-1"
                          style={{ maxHeight: "14px" }}
                        />
                      ))}
                    </p>

                    <p className="game4Info">
                      <i className="bi bi-person-fill me-2" />
                      {v.player_count}
                      <span className="betweenIcon">｜</span>
                      <i className="bi bi-alarm-fill me-2" />
                      {v.time}
                      <span className="betweenIcon betweenIcon2">｜</span>
                      <FontAwesomeIcon
                        icon="fa-solid fa-sack-dollar"
                        className="me-2 dollarIcon"
                        style={{ maxHeight: "14px" }}
                      />
                      {v.weekdays_price}元<span className="priceAfter">起</span>
                      <span className="betweenIcon">｜</span>
                      <FontAwesomeIcon
                        icon="fa-solid fa-ban"
                        className="me-2"
                        style={{ maxHeight: "14px" }}
                      />
                      {v.age_limit}
                    </p>
                    <p>{v.game_info}</p>
                    <p>
                      <span className="gameTag text-muted">
                        #日本都市傳說謎團
                      </span>
                      <span className="gameTag text-muted">
                        #顛倒奇幻場景體驗
                      </span>
                      <span className="gameTag text-muted">
                        #扣人心弦推理情節
                      </span>
                    </p>
                    <Link href={`/booking/booking-es3?sid=${v.sid}`} passHref>
                      <div className="button gameBtn">
                        <span className="gameButton">立即預約</span>
                        <FontAwesomeIcon
                          icon="fa-solid fa-angle-right fa-xs"
                          className="ms-1 gameBtnArrow"
                          style={{ maxHeight: "13px" }}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {/* game2 */}
              {(index + 1) % 2 === 0 && (
                <div className="row gameSelect">
                  <div className="col-md-6 gameText text-center">
                    <h4 className="fw-bold mb-1">《{v.game_name}》</h4>
                    <p className="text-muted fw-bold gameName mb-3">
                      {v.game_nameEG}
                    </p>
                    <p>
                      遊戲難度：
                      {[...Array(v.difficulty)].map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={["fas", "star"]}
                          className="ms-1 mb-1"
                          style={{ maxHeight: "14px" }}
                        />
                      ))}
                      {[...Array(5 - v.difficulty)].map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={["far", "star"]}
                          className="ms-1 mb-1"
                          style={{ maxHeight: "14px" }}
                        />
                      ))}
                    </p>
                    <p className="game4Info">
                      <i className="bi bi-person-fill me-2" />
                      {v.player_count}
                      <span className="betweenIcon">｜</span>
                      <i className="bi bi-alarm-fill me-2" />
                      {v.time}
                      <span className="betweenIcon">｜</span>
                      <FontAwesomeIcon
                        icon="fa-solid fa-sack-dollar"
                        className="me-2"
                        style={{ maxHeight: "14px" }}
                      />
                      {v.weekdays_price}元<span className="priceAfter">起</span>
                      <span className="betweenIcon">｜</span>
                      <FontAwesomeIcon
                        icon="fa-solid fa-ban"
                        className="me-2"
                        style={{ maxHeight: "14px" }}
                      />
                      {v.age_limit}
                    </p>
                    <p>{v.game_info}</p>
                    <p>
                      <span className="gameTag text-muted">
                        #推理迷局心理戰
                      </span>
                      <span className="gameTag text-muted">
                        #創新挑戰，玩轉驚悚
                      </span>
                      <span className="gameTag text-muted">
                        #層層關卡腦力激盪
                      </span>
                    </p>
                    <Link href={`/booking/booking-es3?sid=${v.sid}`} passHref>
                      <div className="button gameBtn">
                        <span className="gameButton">立即預約</span>
                        <FontAwesomeIcon
                          icon="fa-solid fa-angle-right fa-xs"
                          className="ms-1 gameBtnArrow"
                          style={{ maxHeight: "13px" }}
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-6 gameImgDiv">
                    <img className="gameImg" src="/images/booking/game6.jpg" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
