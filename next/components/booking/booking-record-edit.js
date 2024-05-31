import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  BOOKING_ESCAPE_ITEM_UPDATE_PUT,
  BOOKING_ESCAPE_EDIT_ITEM,
  BOOKING_ESCAPE,
} from "@/components/config";

const redBorder = {
  border: "1px solid red",
};
const redText = {
  color: "red",
};

export default function BookingRecordEditC({ sid }) {
  const router = useRouter();

  const [bookingTime, setBookingTime] = useState();

  const [formData, setFormData] = useState({
    sid: "",
    member_id: "",
    username: "",
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
    // additionalData: [],
  });

  // 欄位預設的錯誤訊息
  const [errorMsg, setErrorMsg] = useState({
    mobile: "",
  });

  const validateMobile = (mobile) => {
    return /^09\d{2}-?\d{3}-?\d{3}$/.test(mobile);
  };

  useEffect(() => {
    // 發送網路請求來獲取 booking_time 資料
    fetch(BOOKING_ESCAPE)
      .then((response) => response.json())
      .then((data) => {
        // 從資料中獲取 booking_time，並設置到狀態中
        setBookingTime(data.rows[0].booking_time);
        console.log(data.rows[0].booking_time);
      })
      .catch((error) => {
        console.error("Error fetching booking time:", error);
      });
  }, []); // 空的依賴陣列表示這個 effect 只會在組件渲染後執行一次

  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  const playerCountChanged = (e) => {
    const newFormData = { ...formData, player_count: e.target.value };
    setFormData(newFormData);
  };

  const validateFields = () => {
    let tmpIsPass = true;
    let tmpErrorMsg = { ...errorMsg };
    // 欄位資料驗證
    if (!validateMobile(formData.mobile)) {
      tmpErrorMsg = { ...tmpErrorMsg, mobile: "請輸入正確的手機號碼" };
      tmpIsPass = false;
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, mobile: "" };
    }
    setErrorMsg(tmpErrorMsg);
    return tmpIsPass;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("送出表單");
    if (!validateFields()) {
      alert("必填欄位請輸入正確資訊");
      return; // 沒通過檢查的話, 就返回
    }

    const dataModified = { ...formData };
    // 將沒有要更動的欄位去掉
    delete dataModified.sid;
    delete dataModified.member_id;
    delete dataModified.username;
    delete dataModified.member_name;
    delete dataModified.store_id;
    delete dataModified.store_name;
    delete dataModified.booking_date;
    delete dataModified.booking_time;
    delete dataModified.game_id;
    delete dataModified.game_name;
    delete dataModified.created_at;
    delete dataModified.additionalData;

    console.log(dataModified);

    const r = await fetch(`${BOOKING_ESCAPE_ITEM_UPDATE_PUT}/${sid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataModified),
    });
    const result = await r.json();

    console.log(result);
    if (result.success) {
      alert("預約更新成功！");
      console.log(document.referrer);
      router.back(); // 回前頁
    } else {
      alert("預約沒有更新");
    }
  };

  useEffect(() => {
    console.log(sid);
    if (!sid) return; // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${BOOKING_ESCAPE_EDIT_ITEM}/${sid}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setFormData({ ...result.data });
        } else {
          // router.push("/member/booking-record");
        }
      });
  }, [sid, router]);

  return (
    <>
      <Head>
        <title>更改預約資料</title>
      </Head>
      <div className="row" style={{ width: "1200px" }}>
        <div className="col-sm-12 col-md-10 col-lg-6 mb-5">
          <form name="form1" onSubmit={onSubmit} className="create-match">
            <div className="card">
              <div className="card-header pt-3 pb-2 text-center">
                {formData.username}預約紀錄-密室逃脫
              </div>
              <div className="card-body text-secondary p-5">
                <div className="row">
                  <div className="col-sm-12 col-md-2 mb-3 mt-2">
                    <label htmlFor="storeName">店家名稱</label>
                  </div>
                  <div className="col-sm-12 col-md-10 mb-3 ">
                    <input
                      className="form-control"
                      type="text"
                      id="disabledInput"
                      name="storeName"
                      onChange={fieldChanged}
                      value={formData.store_name}
                      readOnly={true}
                      disabled
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="gameName">遊戲名稱</label>
                  </div>
                  <div className="col-sm-12 col-md-10   py-3 ">
                    <input
                      className="form-control"
                      type="text"
                      id="disabledInput"
                      name="gameName"
                      onChange={fieldChanged}
                      value={formData.game_name}
                      readOnly={true}
                      disabled
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="bookingDate">預約日期</label>
                  </div>
                  <div className="col-sm-12 col-md-10   py-3 ">
                    <input
                      type="date"
                      id="bookingDate"
                      name="bookingDate"
                      value={formData.booking_date}
                      onChange={fieldChanged}
                      className="bookingDateInput"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto ">預約時段</div>
                  <div className="col-sm-6 col-md-5 py-3 ">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="booking_time"
                      value={formData.booking_time}
                      onChange={fieldChanged}
                      readOnly={true}
                      disabled
                    >
                      <option defaultValue>選擇時段</option>
                      <option value={"10:00"}>10:00 - 11:00</option>
                      <option value={"12:00"}>12:00 - 13:00</option>
                      <option value={"14:00"}>14:00 - 15:00</option>
                      <option value={"16:00"}>16:00 - 17:00</option>
                      <option value={"18:00"}>18:00 - 19:00</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="bookingHours">遊戲時長</label>
                  </div>
                  <div className="col-sm-12 col-md-10 py-3 gameTimeInputDiv">
                    <input
                      className="form-control gameTimeInput"
                      type="text"
                      id="bookingHours"
                      name="bookingHours"
                      onChange={fieldChanged}
                      value={formData.booking_hours + " 小時"}
                      readOnly={true}
                      disabled
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto ">預約人數</div>
                  <div className="col-sm-6 col-md-5 py-3 ">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="playerCount"
                      value={formData.player_count}
                      onChange={playerCountChanged}
                    >
                      <option defaultValue>選擇人數</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                    </select>
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="deskShop">選擇店家</label>
                  </div>
                  <div className="col-sm-12 col-md-10    py-3 ">
                    <select
                      name="store_id"
                      className="form-select"
                      aria-label="Default select example"
                      value={formData.store_id}
                      onChange={fieldChanged}
                    >
                      <option defaultValue={formData.store_id}>
                        {formData.store_name}
                      </option>
                      {storeData.deskRows.map((item) => (
                        <option key={item.store_id} value={item.store_id}>
                          {item.store_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> */}

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="mobile" className="form-label">
                      *手機號碼
                    </label>
                  </div>
                  <div className="col-sm-12 col-md-10 py-3 ">
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={fieldChanged}
                      onBlur={validateFields}
                      style={errorMsg.mobile ? redBorder : {}}
                    />
                    <div className="form-text" style={redText}>
                      {errorMsg.mobile}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-2 my-auto  ">
                    <label htmlFor="remark" className="form-label">
                      備註
                    </label>
                  </div>
                  <div className="col-sm-12 col-md-10  py-3 ">
                    <input
                      className="form-control"
                      type="text"
                      id="remark"
                      name="remark"
                      value={formData.remark}
                      onChange={fieldChanged}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center pt-4 my-auto">
                    <button type="submit" className="btn btn-dark">
                      更新預約
                    </button>
                  </div>
                  <div className="col text-center pt-4 my-auto">
                    <Link
                      href={"/member/booking-record"}
                      className="btn btn-secondary"
                      style={{ background: "#ffaf63", border: "none" }}
                    >
                      返回前頁
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .create-match .card {
          border: none;
          box-shadow: 0px 0px 3px #0001;
        }
        .create-match .card-header {
          background: #ffaf63;
          letter-spacing: 2px;
          font-weight: 600;
          font-size: 16px;
        }
        .gameTimeInput {
          width: 47.5%;
          margin-right: 5px;
        }
        .gameTimeInputDiv {
          display: flex;
          align-items: center;
        }
        .bookingDateInput {
          border: 1px solid #dddddd;
          padding: 5px 74px 5px 10px;
          border-radius: 2px;
        }
      `}</style>
    </>
  );
}
