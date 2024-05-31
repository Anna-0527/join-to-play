import React from "react";
import Head from "next/head";
import Link from "next/link";
import { BOOKING_ESCAPE_ITEM } from "@/components/config";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";

export default function BookingRecordC({ sid }) {
  const router = useRouter();
  const { auth } = useAuth();
  const [vSid, setVSid] = useState(null);
  const [data, setData] = useState({
    sid: "",
    member_id: "",
    member_name: "",
    mobile: "",
    store_id: "",
    store_name: "",
    booking_date: "",
    booking_time: "",
    booking_hours: "",
    game_id: "",
    game_name: "",
    player_count: "",
    remark: "",
    created_at: "",
    additionalData: [],
  });

  useEffect(() => {
    console.log(auth);
    console.log(sid);
    if (!sid) return; // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${BOOKING_ESCAPE_ITEM}/${sid}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setData({ rows: result.data }); // 將 result.data 設置為 data 的 rows 屬性
          console.log(result.data);
        } else {
          // router.push("/member/booking-record");
        }
      });
  }, [sid, router]);

  // 修改點擊事件處理函數，獲取被點擊的手風琴項目的數據
  const handleEditClick = (v) => {
    console.log("被點擊的手風琴：", v.sid);
    setVSid(v.sid);
  };
  console.log(auth);

  const isBookingExpired = (bookingDate) => {
    const currentDate = new Date();
    const bookingDateObj = new Date(bookingDate);
    return currentDate > bookingDateObj;
  };

  return (
    <>
      <Head>
        <title>預約紀錄</title>
      </Head>
      {data.rows ? (
        <>
          <div
            className="accordion"
            id="accordionExample"
            style={{ width: "650px" }}
          >
            <h3>{auth.username}</h3>
            {data.rows.map((v, index) => (
              <>
                <div
                  className={`accordion-item ${
                    isBookingExpired(v.booking_date) ? "bookingEnd1" : ""
                  }`}
                  key={v.member_id}
                >
                  <h2
                    className="accordion-header usernameTitle"
                    id={`heading${index}`}
                  >
                    <button
                      className={`accordion-button bookingRecordTitle ${
                        isBookingExpired(v.booking_date) ? "bookingEnd" : ""
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="true"
                      aria-controls={`collapse${index}`}
                      onClick={() => handleEditClick(v)}
                    >
                      {isBookingExpired(v.booking_date)
                        ? "歷史預約 - 密室逃脫"
                        : "目前預約 - 密室逃脫"}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <i className="bi bi-shop me-2" />
                      店家名稱
                      <span className="ms-3">{v.store_name}</span>
                    </div>
                  </div>

                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <i className="bi bi-dice-5-fill me-2" />
                      遊戲名稱
                      <span className="ms-3">{v.game_name}</span>
                    </div>
                  </div>

                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <i className="bi bi-calendar-check me-2" />
                      預約日期
                      <span className="ms-3">{v.booking_date}</span>
                    </div>
                  </div>

                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <i className="bi bi-alarm-fill me-2" />
                      預約時段
                      <span className="ms-3">{v.booking_time}</span>
                    </div>
                  </div>

                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <i className="bi bi-hourglass-split me-2" />
                      遊戲時長
                      <span className="ms-3">{v.booking_hours}小時</span>
                    </div>
                  </div>

                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <i className="bi bi-person-fill me-2" />
                      預約人數
                      <span className="ms-3">
                        {v.additionalData[0].player_count_booking}人 （上限：
                        {v.additionalData[0].player_count_game}）
                      </span>
                    </div>
                  </div>

                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <i className="bi bi-telephone-fill me-2" />
                      手機號碼
                      <span className="ms-3">{v.mobile}</span>
                    </div>
                  </div>

                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <i className="bi bi-journals me-2" />
                      備註
                      <span className="ms-3">{v.remark}</span>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="row my-3 d-flex justify-content-evenly">
            <div className="col-auto">
              <Link
                href={`/member/booking/edit/${vSid}`}
                className="btn btn-primary"
              >
                修改
              </Link>
            </div>
            <div className="col-auto">
              <Link
                className="btn btn-secondary"
                type="button"
                href={`/member`}
              >
                返回前頁
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="noBookingRecord">您還沒有預約紀錄，快去預約吧！</div>
      )}

      <style jsx>
        {`
          ul {
            border-radius: 10px;
            padding: 0 20px 30px 20px;
          }
          li {
            padding: 15px;
          }
          .bookingRecordTitle {
            background-color: #ffe682;
            letter-spacing: 1.5px;
          }
          .usernameTitle {
            font-weight: 600;
            font-size: 18px;
          }
          .noBookingRecord {
            position: absolute;
            top: 40%;
            left: 50%;
            letter-spacing: 1px;
          }
          .bookingEnd {
            background-color: rgb(118, 118, 118, 0.4);
            color: #7a7a7a;
          }
          .bookingEnd1 {
            background-color: #f2f2f2;
            border: 0px;
            color: #7a7a7a;
          }
        `}
      </style>
    </>
  );
}
